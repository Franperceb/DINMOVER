import React, { useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import homeImage from '../../images/admin_home.jpeg';
import Login from './Login';
import SignUp from './SignUp';

function LoginScreen() {
  const [isLogin, setLogin] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {isLogin ? (
          <Login changeToSignUp={() => setLogin(false)} />
        ) : (
          <SignUp changeToLogin={() => setLogin(true)} />
        )}

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${homeImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

export default LoginScreen;
