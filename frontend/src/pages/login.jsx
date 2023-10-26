import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {login} from '../app/slices/auth';
import coverImg from '../images/3.jpeg';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Alliza '} 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/');
          }
    }, [user, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
          email: data.get('email'),
          password: data.get('password'),
        }
        
        dispatch(login(userData));
      };
    
      return (
        <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container component="main" direction='row-reverse'>
              <Grid 
                item
                xs={false}
                sm={false}
                md={7}
                sx={{
                  backgroundImage: `url(${coverImg})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: '100%',
                }}
              />
              <Grid item xs={12} sm={12} md={5} display='flex' flexDirection='column' 
                alignItems='center' justifyContent='center' sx={{backgroundColor: 'primary.light'}}>
                <Box
                  sx={{
                    margin: {lg: 2, xs: 3},
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 2
                  }}
                >
                  
                  <Typography component="h1" variant="h5">
                    Candidates Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      color='secondary'
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      color='secondary'
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'> 
                              <IconButton onClick={() => {setShowPassword(!showPassword)}}>
                                  {showPassword ? <VisibilityOffOutlinedIcon sx={{color: '#000'}}/> : <RemoveRedEyeOutlinedIcon sx={{color: '#000'}} />}
                              </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color='secondary' />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      color='secondary'
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container display={'flex'} flexDirection={'column'} alignItems={'center'}>

                    <Grid item xs={12} mb={2}>
                        <Link color='text.secondary' onClick={() => navigate('/user-register')} variant="body2" sx={{cursor: 'pointer'}}>
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Link sx={{cursor: 'pointer'}} color='text.secondary' onClick={() => {navigate('/forgot-password')}} variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
      );
}

export default Login;