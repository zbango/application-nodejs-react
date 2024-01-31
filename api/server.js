require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { writeFile } = require('node:fs/promises');
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const app = express();
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT

const { CognitoIdentityProviderClient, SignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });


app.post("/users", async (req, res) => {
    try {

        const { email, password, firstName, lastName } = req.body;
        if(!email || !password) {
            return res.status(400).send(`email and password are missing`);
        }
        const filePath = resolve('./users.json');
        const contents = await readFile(filePath, { encoding: 'utf8' });
        const parsedContent = JSON.parse(contents);
        if (parsedContent.find((user) => user.email === email)) {
            return res.status(400).send(`User ${email} already exists`);
        }
        parsedContent.push({ email, firstName, lastName })
        await writeFile("users.json", JSON.stringify(parsedContent, null, 2))

        const command = new SignUpCommand({
            ClientId: process.env.COGNITO_APP_CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [{ Name: "email", Value: email }],
          });
        
        await client.send(command);
        return res.status(200).send("OK")
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})