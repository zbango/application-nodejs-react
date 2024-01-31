import { Container, Box, Typography } from '@mui/material';
import Wizard from '../components/Wizard';

function LeadGenerator() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome!
                </Typography>
                <Box mb={4}>
                    <Typography variant="subtitle1" gutterBottom>
                        Please enter your information below.
                    </Typography>
                </Box>
                <Wizard />
            </Container>
        </Box>
    );
}

export default LeadGenerator;