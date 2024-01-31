import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

interface FormValues {
    firstName: string;
    lastName: string;
    workExperience: string;
    email: string;
    password: string;
}

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    workExperience: yup.string().required('Work experience is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
}).required();

const stepValidationFields = [
    ['firstName', 'lastName'],
    ['workExperience'],
    ['email', 'password'],
] as const;

export function useWizardForm() {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const { register, control, handleSubmit, formState: { errors }, trigger } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const handleNext = async () => {
        const fieldsToValidate = stepValidationFields[activeStep];
        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            const isLastStep = activeStep === stepValidationFields.length - 1;
            if (isLastStep) {
                handleSubmit(onSubmit)();
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:3000/users', data);
            setLoading(false);
            alert("Thank you for registering")
            window.location.reload();
        }
        catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return {
        activeStep,
        handleNext,
        handleBack,
        control,
        handleSubmit,
        onSubmit,
        register,
        errors,
        loading
    };
}