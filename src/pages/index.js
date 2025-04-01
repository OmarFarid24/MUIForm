import React, { useState } from 'react';
import { Container } from '@mui/material';
import LoginForm from '@/pages/login';
import RegisterForm from '@/pages//register';
import ForgotPasswordForm from '@/pages/forgotpassword';

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= 6 && hasUpperCase && hasNumber;
};

const AuthForm = () => {
  const [authMode, setAuthMode] = useState('login');
  
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {authMode === 'login' && <LoginForm setAuthMode={setAuthMode} />}
      {authMode === 'register' && <RegisterForm setAuthMode={setAuthMode} />}
      {authMode === 'forgot' && <ForgotPasswordForm setAuthMode={setAuthMode} />}
    </Container>
  );
};

export default AuthForm;