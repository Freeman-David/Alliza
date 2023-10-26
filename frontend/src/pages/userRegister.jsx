import { useState, forwardRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import {registerUser} from '../app/slices/auth';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useStyles from '../styles/muiClasses';
import SideContact from '../component/sideContact';
import Stack from '@mui/material/Stack';
import { showSnackbar } from '../app/slices/app';
import Calendly from '../component/Calendly';
import CloseIcon from '@mui/icons-material/Close';

const phoneMask = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
});
  
phoneMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function UserRegister() {
    const [isDiagnose, setIsDiagnose] = useState(false);
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [openCalendly, setOpenCalendly] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const validateEmail = (event) => {
        setEmailError(!event.target.value.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"));
    };

    const validatePhone = ({target}) => {
        setPhone(target.value);
        setPhoneError(target.value.length !== 14);
    };

    const validateForm = userData => (
        !!userData.get('firstName') &&
        !!userData.get('lastName') &&
        !!userData.get('email') &&
        !emailError &&
        isDiagnose
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        event.currentTarget = {};

        if(!validateForm(data)) {
            dispatch(showSnackbar({
                severity: 'error',
                message: 'Please fill all the fields'
            }));

            return;
        }

        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            phone,
        }

        dispatch(registerUser(userData, setOpenCalendly));
    };

    if (openCalendly) {
        return (
            <>
                <CloseIcon color='secondary' sx={{mt: 2}} onClick={() => {
                        setOpenCalendly(false);
                    }} />
                <Calendly url={'https://calendly.com/shovalliel/welcome-call'} height={'100vh'} />
            </>
        )
    }
    
    return (
        <Container component="main" maxWidth='md' sx={{mb: 2}}>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h2" textAlign='center' sx={{fontWeight: 'bold', mb: 2}}>
                    Welcome to Alliza, where we believe in your unique abilities and are dedicated to empowering your employment journey
                </Typography>
                <Typography component="h1" textAlign='center' variant="body1">
                    Together, let's unlock your potential and build a future full of possibilities.
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container>
                        <Grid item container sm={8} spacing={2} sx={{pr: {sm: '24px'}}}>
                            <Grid item  xs={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    color='secondary'
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    color='secondary'
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    color='secondary'
                                    onChange={validateEmail}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    error={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel color='secondary' htmlFor="phone">Phone Number</InputLabel>
                                    <OutlinedInput
                                        value={phone}
                                        onChange={validatePhone}
                                        name="phone"
                                        color='secondary'
                                        id="phone"
                                        inputComponent={phoneMask}
                                        variant='outline'
                                        label="Phone"
                                        error={phoneError}
                                    />
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="isDiagnose" onChange={() => (setIsDiagnose(!isDiagnose))} color='secondary' />}
                                    required
                                    label='By clicking this checkbox, you confirm that you are diagnosed with autism.'
                                />
                            </Grid>
                    
                            <Grid item xs={12} mt={2} mb={{xs: 3, sm: 0}}>
                                <Stack alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
                                    <Link onClick={() => navigate('/login')} variant="body2" sx={{cursor: 'pointer', color: 'primary.dark'}}>
                                        Already have an account? Sign in
                                    </Link>

                                    <Button
                                        disabled={!isDiagnose}
                                        type="submit"
                                        variant="contained"
                                        color='secondary'
                                        sx={{ color: '#fff'}}
                                    >
                                        Book a Meeting Via Calendly
                                    </Button>
                                </Stack>
                            </Grid>
                            
                        </Grid>

                        <Grid item xs={12} sm={4} sx={{backgroundColor: 'primary.light'}}>
                            <SideContact />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default UserRegister;