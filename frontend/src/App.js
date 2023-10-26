import { useState, forwardRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/login';
import UserRegister from './pages/userRegister';
import CompanyRegister from './pages/companyRegister';
import Nav from './pages/Dashboard/dashboardNav';
import Portal from './pages/Dashboard/Portal';
import ScheduleSession from './pages/Dashboard/scheduleSession';
import Questionair from './pages/questionair';
import Header from './component/header';
import Footer from './component/footer';
import About from './pages/about';
import { useDispatch, useSelector } from 'react-redux';
import ResetPassword from './pages/resetPassword';
import NewPassword from './pages/newPassword';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { closeSnackbar } from './app/slices/app';
import AllizaStep1 from './pages/onBoarding/AllizaStep1';
import AllizaStep2 from './pages/onBoarding/AllizaStep2';
import ChatPage from './pages/Dashboard/chatPage';
import Events from './pages/Dashboard/Events';
import AllizaWorkshop from './pages/Dashboard/AllizaWorkshop';
import Profile from './pages/Dashboard/profile';
import useResponsive from './hooks/useResponsive';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#f2f2f2',
      main: '#FFF',
      dark: '#898f9c'
    },
    secondary: {
      light: '#efedf7',
      main: '#51459e',
    },
    
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 4.5,
  },
  shadows: Array(25).fill('none'),
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {cursor: 'default'}
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {borderRadius: '36px'}
      },
    }
  },
  typography: {
    h1: {
      fontSize: '38px',
      lineHeight: '1.35',
    },
    h2: {
      fontSize: '20px',
      lineHeight: '1.2',
    },
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
      height: '50px', 
      fontSize: '1rem',
      borderRadius: '50%'
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 4.5,
  },
});

const themes = {
  regular: lightTheme,
  dark: darkTheme,
}

function App() {
  const [theme, setTheme] = useState('regular');
  const isDesktop = useResponsive('up', 'md');

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);
  const {open, message, severity} = useSelector(state => state.app.snackbar);

  return (
    <>
      <ThemeProvider theme={themes[theme]}>
        {(!user || user.stage < 3) && <Header user={user} />}
        <Routes>
          <Route path='/' element={<Nav user={user} />}> 
            <Route path='portal' element={<Portal user={user} isDesktop={isDesktop} />} />
            <Route path='scheduleSession' element={<ScheduleSession user={user} isDesktop={isDesktop} />} />
            <Route path='chat' element={<ChatPage user={user} isDesktop={isDesktop} />} />
            <Route path='events' element={<Events isDesktop={isDesktop} />} />
            <Route path='workshops' element={<AllizaWorkshop isDesktop={isDesktop} />} />
            <Route path='profile' element={<Profile isDesktop={isDesktop} />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/user-register' element={<UserRegister/>} />
          <Route path='/business-register' element={<CompanyRegister/>} />
          <Route path='/home-page' element={<HomePage/>} />
          <Route path='/about-us' element={<About/>} />
          <Route path='/questionair' element={<Questionair/>} />
          <Route path='/forgot-password' element={<ResetPassword/>} />
          <Route path='/reset-password' element={<NewPassword />} />
          <Route path='/step-1' element={<AllizaStep1 user={user} />} />
          <Route path='/step-2' element={<AllizaStep2 user={user} />} />
        </Routes>
        {!user && <Footer />}
      </ThemeProvider>

      {message && open && <Snackbar open={open} autoHideDuration={3000} onClose={() => {
        dispatch(closeSnackbar())
      }}>
        <Alert onClose={() => {
          dispatch(closeSnackbar())
        }} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
      </Snackbar>}
    </>
  );
}

export default App;
