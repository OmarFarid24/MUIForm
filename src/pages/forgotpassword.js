import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, FormControl, Link, Stack } from '@mui/material';
import { validateEmail, validatePassword } from '@/pages/index';

const ForgotPasswordForm = ({ setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: { hasError: false, message: '' },
    match: { hasError: false, message: '' }
  });

  const isButtonDisabled = !email.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);
    
    setErrors({
      email: {
        hasError: !emailValid,
        message: !emailValid ? 'Ingrese un email válido con @ y dominio' : ''
      },
      match: {
        hasError: false,
        message: ''
      }
    });
    
    if (emailValid) {
      console.log('Contraseña restablecida para:', email);
      alert('Contraseña restablecida con éxito!');
      setAuthMode('login');
    }
  };

  const handleCancel = () => {
    setAuthMode('login');
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Recuperar Contraseña
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
            Cancelar
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
            Confirmar
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ForgotPasswordForm;