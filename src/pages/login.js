import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, FormControl, Link } from '@mui/material';
import { validateEmail, validatePassword } from '@/pages/index';

const LoginForm = ({ setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: { hasError: false, message: '' },
    password: { hasError: false, message: '' }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    
    setErrors({
      email: {
        hasError: !emailValid,
        message: !emailValid ? 'Ingrese un email válido con @ y dominio' : ''
      },
      password: {
        hasError: !passwordValid,
        message: !passwordValid 
          ? 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número' 
          : ''
      }
    });
    
    if (emailValid && passwordValid) {
      console.log('Datos del login:', { email, password });
      alert('Inicio de sesión exitoso!');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <img 
        src= "https://app.personax.ai/_next/image?url=%2Flogo.png&w=256&q=75" 
        alt="Logo"
        style={{
          height: '24px',
          width: '120px',
          display: 'block',
          margin: '0 auto 16px auto'
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ mb: 4 }}>
        Welcome Back
      </Typography>
      <Typography variant="h6" component="h1" gutterBottom align="left" sx={{ mb: 4 }}>
        Sign in to Persona X
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
            sx={{ mb: 2 }}
          />
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password.hasError}
            helperText={errors.password.message}
            required
            fullWidth
            sx={{ mb: 3 }}
          />
        </FormControl>
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ py: 1.5, fontSize: '1.1rem', mb: 2, 
            background: "rgb(101, 85, 143)",
            '&:hover': {
              backgroundColor: 'rgb(81, 65, 123)'
            }
          }}
        >
          Login
        </Button>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => setAuthMode('register')}
              underline="hover"
              sx={{ cursor: 'pointer',color: "rgb(101, 85, 143)" }}
            >
              Create Account
            </Link>
          </Box>
          <Link 
            component="button" 
            variant="body2" 
            onClick={() => setAuthMode('forgot')}
            underline="hover"
            sx={{ cursor: 'pointer', color: "rgb(101, 85, 143)"}}
          >
            Forgot password?
          </Link>
        </Box>
      </Box>

    </Paper>
  );
};

export default LoginForm;