import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, FormControlLabel, Checkbox, Link } from '@mui/material';
import { validateEmail, validatePassword } from '@/pages/index';

const RegisterForm = ({ setAuthMode }) => {
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
      alert('Registro exitoso!');
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.paper',
          position: { xs: 'static', md: 'fixed' },
          left: 0,
          top: 0,
          zIndex: 1,
          overflowY: 'auto',
          py: 4
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            p: { xs: 2, md: 4 },
            boxSizing: 'border-box'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ mb: 4 }}>
            Register
          </Typography>
          <Typography variant="h6" component="h1" gutterBottom align="left" sx={{ mb: 4 }}>
            global.getStartedForFree
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
            <Typography align="center" sx={{ mt: 2}}>
              By signing up to create an accout I accept{' '}
              <Link 
                component="button" 
                variant="body2" 
                onClick={() => setAuthMode('login')}
                underline="hover"
                sx={{ cursor: 'pointer',color: "rgb(101, 85, 143)" }}
              >
                Terms of use
              </Link>
            </Typography>
            
            <Typography align="center" sx={{ mt: 2}}>
              Have an account?{' '}
              <Link 
                component="button" 
                variant="body2" 
                onClick={() => setAuthMode('login')}
                underline="hover"
                sx={{ cursor: 'pointer',color: "rgb(101, 85, 143)" }}
              >
                login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '50%',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          backgroundImage: 'url(https://app.personax.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FloginImage.3906dd5b.png&w=3840&q=75)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          width: '80%',
          maxWidth: '500px'
        }}>
          <Typography variant="h3" component="div" sx={{ 
            fontWeight: 700,
            mb: 3,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Walking the Customer Path, Together
          </Typography>
          <Typography variant="h5" component="div" sx={{
            fontWeight: 400,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1.6
          }}>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;