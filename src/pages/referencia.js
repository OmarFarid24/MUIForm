//aqui empieza index.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, FormControl,
  FormControlLabel, Checkbox, Link, Stack } from '@mui/material';

const AuthForm = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'forgot'
  
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {authMode === 'login' && <LoginForm setAuthMode={setAuthMode} />}
      {authMode === 'register' && <RegisterForm setAuthMode={setAuthMode} />}
      {authMode === 'forgot' && <ForgotPasswordForm setAuthMode={setAuthMode} />}
    </Container>
  );
};

// Validaciones mejoradas
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= 6 && hasUpperCase && hasNumber;
};

// Componente de Login
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
      <Typography variant="h4"
       component="h1" 
       gutterBottom align="center" sx={{ mb: 4 }}>
        Iniciar Sesión
      </Typography>
      <img 
      src="./src/styles/unnamed.png" 
      alt="Logo de la empresa" 
      style={{ 
        height: '80px', 
        width: 'auto',
        marginBottom: '16px'
      }}
    />
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
            label="Contraseña"
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
          Ingresar
        </Button>

        {/* Enlaces uno al lado del otro */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2}}>
          <Link 
            component="button" 
            variant="body2" 
            onClick={() => setAuthMode('forgot')}
            underline="hover"
            sx={{ cursor: 'pointer', color: "rgb(101, 85, 143)"}}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" component="span" sx={{ mr: 1 }}>
              ¿No tienes una cuenta?
            </Typography>
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => setAuthMode('register')}
              underline="hover"
              sx={{ cursor: 'pointer',color: "rgb(101, 85, 143)" }}
            >
              Regístrate
            </Link>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

// aqui empieza register.js------------------------------------------------------
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
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Crear Cuenta
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre completo"
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
            label="Contraseña"
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
              <Typography>
                Acepto los {' '}
                <Link href="#" underline="hover">
                  términos y condiciones
                </Link>
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
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3, py: 1.5, fontSize: '1.1rem',background: "rgb(101, 85, 143)" }}
        >
          Registrarse
        </Button>

        <Typography align="center" sx={{ mt: 2}}>
          ¿Ya tienes una cuenta?{' '}
          <Link 
            component="button" 
            variant="body2" 
            onClick={() => setAuthMode('login')}
            underline="hover"
            sx={{ cursor: 'pointer',color: "rgb(101, 85, 143)" }}
          >
            Inicia sesión aquí
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

//aqui comienza forgotpassword.js---------------------------------------------

const ForgotPasswordForm = ({ setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: { hasError: false, message: '' },
    password: { hasError: false, message: '' },
    match: { hasError: false, message: '' }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(newPassword);
    const passwordsMatch = newPassword === confirmPassword;
    
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
      },
      match: {
        hasError: !passwordsMatch,
        message: !passwordsMatch ? 'Las contraseñas no coinciden' : ''
      }
    });
    
    if (emailValid && passwordValid && passwordsMatch) {
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
      <Typography variant="h4"
       component="h1" 
       gutterBottom align="center" 
       sx={{ mb: 4 }}>
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
        
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nueva Contraseña"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.password.hasError}
            helperText={errors.password.message}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <TextField
            label="Confirmar Contraseña"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.match.hasError}
            helperText={errors.match.message}
            required
            fullWidth
            sx={{ mb: 3 }}
          />
        </FormControl>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={handleCancel}
            sx={{ py: 1.5,color: "rgb(101, 85, 143)",borderColor: "rgb(101, 85, 143)" }}
          >
            Cancelar
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Confirmar
          </Button>
        </Stack>

        <Typography align="center" sx={{ mt: 2 }}>
          <Link 
            component="button" 
            variant="body2" 
            onClick={() => setAuthMode('login')}
            underline="hover"
            sx={{ cursor: 'pointer',color: "rgb(101, 85, 143)" }}
          >
            Volver al inicio de sesión
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default AuthForm;