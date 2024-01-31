import * as React from 'react';
import { Box, Button, Step, Stepper, StepLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, CircularProgress, FormLabel, Grid, Radio, RadioGroup, TextField, FormHelperText } from '@mui/material';
import { useWizardForm } from './Wizard/useWizardForm';

const steps = ['Personal Information', 'Work Experience', 'Set up your account'];

export default function Wizard() {
  const {
    activeStep,
    handleNext,
    handleBack,
    control,
    handleSubmit,
    onSubmit,
    register,
    errors,
    loading
  } = useWizardForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Stepper activeStep={activeStep} >
          {steps.map((label, index) => {
            return (
              <Step key={`${label}${index}`} >
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box sx={{ mt: 2 }}>
        {activeStep === 0 && (
          <Grid container spacing={2} paddingX={10}>
            <Grid item xs={12} paddingY={0}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={2} paddingX={10}>
            <Grid item xs={12} paddingY={0}>
              <FormControl component="fieldset" error={!!errors.workExperience}>
                <FormLabel component="legend">Do you have experience with ReactJS?</FormLabel>
                <Controller
                  name="workExperience"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  )}
                />
                {errors.workExperience && (
                  <FormHelperText>{errors.workExperience.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid container spacing={2} paddingX={10}>
            <Grid item xs={12} paddingY={0}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email"
                autoFocus
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                autoFocus
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
        )}
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
      
            {activeStep === steps.length - 1 ? (
              <Button type="submit" disabled={loading}>
                {loading ? <CircularProgress /> : 'Finish'}
              </Button>
            ) : (
              <Button onClick={handleNext} >
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Box>
    </form>
  );
}