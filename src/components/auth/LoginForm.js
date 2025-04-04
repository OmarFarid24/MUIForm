import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  Link
} from '@mui/material';
import AuthLayout from '@/components/layout/AuthLayout';
import { validateEmail, validatePassword } from '@/utils/validations';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: { hasError: false, message: '' },
    password: { hasError: false, message: '' }
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    
    setErrors({
      email: { 
        hasError: !emailValid, 
        message: !emailValid ? 'Ingrese un email válido' : '' 
      },
      password: { 
        hasError: !passwordValid, 
        message: !passwordValid ? 'Mínimo 6 caracteres, 1 mayúscula y 1 número' : '' 
      }
    });
    
    if (emailValid && passwordValid) {
      router.push('/dashboard');
    }
  };

  return (
    <AuthLayout 
      imageUrl="https://app.personax.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FloginImage.3906dd5b.png&w=3840&q=75"
      title="Persona(fied) Customer Data"
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ width: '100%', maxWidth: '400px', p: { xs: 2, md: 4 } }}
      >
        <img 
          src="https://app.personax.ai/_next/image?url=%2Flogo.png&w=256&q=75" 
          alt="Logo" 
          style={{ height: '24px', width: '120px', display: 'block', margin: '0 auto 16px auto' }} 
        />
        
        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ mb: 4 }}>
          Welcome Back
        </Typography>
        
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
          sx={{ 
            py: 1.5, 
            fontSize: '1.1rem', 
            mb: 2, 
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
              onClick={() => router.push('/register')}
              underline="hover"
              sx={{ cursor: 'pointer', color: "rgb(101, 85, 143)" }}
            >
              Create Account
            </Link>
          </Box>
          <Link 
            component="button" 
            variant="body2" 
            onClick={() => router.push('/forgotpassword')}
            underline="hover"
            sx={{ cursor: 'pointer', color: "rgb(101, 85, 143)" }}
          >
            Forgot password?
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginForm;