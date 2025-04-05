import { Box, Typography } from '@mui/material';

const AuthLayout = ({ children, imageUrl, title, subtitle }) => {
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
        {children}
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '50%',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          backgroundImage: `url(${imageUrl})`,
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
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h5" component="div" sx={{
              fontWeight: 400,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.6
            }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;