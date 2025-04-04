import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box,TextField, Button, Typography, FormControl, FormControlLabel, Checkbox, Link } from '@mui/material';
import AuthLayout from '@/components/layout/AuthLayout';
import { validateEmail, validatePassword } from '@/utils/validations';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({
    name: { hasError: false, message: '' },
    email: { hasError: false, message: '' },
    password: { hasError: false, message: '' },
    terms: { hasError: false, message: '' }
  });
  const router = useRouter();
  
  const isButtonDisabled = !name.trim() || !email.trim() || !password.trim() || !acceptTerms;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameValid = name.trim().length >= 3;
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const termsValid = acceptTerms;
    
    setErrors({
      name: {
        hasError: !nameValid,
        message: !nameValid ? 'El nombre debe tener al menos 3 caracteres' : ''
      },
      email: {
        hasError: !emailValid,
        message: !emailValid ? 'Ingrese un email válido con @ y dominio' : ''
      },
      password: {
        hasError: !passwordValid,
        message: !passwordValid 
          ? 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número' 
          : ''
      },
      terms: {
        hasError: !termsValid,
        message: !termsValid ? 'Debes aceptar los términos y condiciones' : ''
      }
    });
    
    if (nameValid && emailValid && passwordValid && termsValid) {
      console.log('Datos del registro:', { name, email, password, acceptTerms });
      router.push('/dashboard');
    }
  };

  return (
    <AuthLayout 
      imageUrl="https://app.personax.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FloginImage.3906dd5b.png&w=3840&q=75"
      title="Walking the Customer Path, Together"
    >
      <Box sx={{ width: '100%', maxWidth: '400px', p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ mb: 4 }}>
          Register
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom align="left" sx={{ mb: 4 }}>
          Get Started for Free
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name.hasError}
              helperText={errors.name.message}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
          </FormControl>
          
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
              sx={{ mb: 2 }}
            />
          </FormControl>
          
          <FormControl fullWidth margin="normal" error={errors.terms.hasError}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant='body2'>
                  I agree to receive marketing emails and updates.
                </Typography>
              }
            />
            {errors.terms.hasError && (
              <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                {errors.terms.message}
              </Typography>
            )}
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isButtonDisabled}
            sx={{ 
              mt: 3, 
              py: 1.5, 
              fontSize: '1.1rem',
              background: "rgb(101, 85, 143)",
              '&:disabled': {
                backgroundColor: 'gray',
                color: 'rgba(255, 255, 255, 0.5)'
              }
            }}
          >
            Register
          </Button>
          
          <Typography align="center" sx={{ mt: 2 }}>
            By signing up to create an account I accept{' '}
            <Link 
              onClick={() => router.push('/terms')}
              sx={{ cursor: 'pointer', color: "rgb(101, 85, 143)" }}
            >
              Terms of use
            </Link>
          </Typography>
          
          <Typography align="center" sx={{ mt: 2 }}>
            Have an account?{' '}
            <Link 
              onClick={() => router.push('/login')}
              sx={{ cursor: 'pointer', color: "rgb(101, 85, 143)" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default RegisterForm;