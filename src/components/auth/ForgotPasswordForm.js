import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {Box, TextField, Button, Typography, Paper, FormControl, Link, Stack } from '@mui/material';
import AuthLayout from '@/components/layout/AuthLayout'; 
import { validateEmail } from '@/utils/validations';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: { hasError: false, message: '' }
  });
  const router = useRouter();

  const isButtonDisabled = !email.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);
    
    setErrors({
      email: {
        hasError: !emailValid,
        message: !emailValid ? 'Ingrese un email válido con @ y dominio' : ''
      }
    });
    
    if (emailValid) {
      console.log('Contraseña restablecida para:', email);
      alert('Se ha enviado un correo para restablecer tu contraseña');
      router.push('/login');
    }
  };

  const handleCancel = () => {
    router.push('/login');
  };

  return (
    <AuthLayout 
      imageUrl="https://app.personax.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FloginImage.3906dd5b.png&w=3840&q=75"
      title="Recover Your Account"
      subtitle="Enter your email to reset your password"
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Send Recovery Email
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email.hasError}
              helperText={errors.email.message}
              required
              fullWidth
              sx={{ mb: 3 }}
            />
          </FormControl>
          
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
              sx={{ 
                py: 1.5,
                color: "rgb(101, 85, 143)",
                borderColor: "rgb(101, 85, 143)",
                '&:hover': {
                  borderColor: 'rgb(81, 65, 123)'
                }
              }}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isButtonDisabled}
              sx={{ 
                py: 1.5, 
                background: "rgb(101, 85, 143)",
                '&:hover': {
                  backgroundColor: 'rgb(81, 65, 123)'
                },
                '&:disabled': {
                  backgroundColor: 'gray'
                }
              }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Paper>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;