import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {registerCompany} from '../app/slices/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useStyles from '../styles/muiClasses';
import SideContact from '../component/sideContact';
import { showSnackbar } from '../app/slices/app';
import Calendly from '../component/Calendly';
import CloseIcon from '@mui/icons-material/Close';

function CompanyRegister() {
    const [emailError, setEmailError] = useState(false);
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

    const validateForm = userData => (
        !!userData.get('email') &&
        !emailError 
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        event.currentTarget = {};

        if(!validateForm(data)) {
            dispatch(showSnackbar({
                severity: 'error',
                message: 'Please Add Email Address'
            }));
            return;
        }

        const companyData = {
            contactName: data.get('contactName'),
            email: data.get('email'),
            companyName: data.get('companyName'),
            message: data.get('message'),
        }

        dispatch(registerCompany(companyData, setOpenCalendly));
    };

    if (openCalendly) {
        return (
            <>
                <CloseIcon color='secondary' sx={{mt: 2}} onClick={() => {
                        setOpenCalendly(false);
                    }} />
                <Calendly url={'https://calendly.com/shoval-mhg/introductory-call'} height={'100vh'} />
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
                    Thank you for your interest in collaborating with Alliza
                </Typography>
                <Typography component="h1" textAlign='center' variant="body1">
                    Let's explore partnerships that unlock the untapped potential of autistic talent and create an inclusive, innovative future for your organization. Start the conversation today and pave the way for a brighter tomorrow.
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container>
                        <Grid item container sm={8} spacing={2} sx={{pr: {sm: '24px'}}}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={validateEmail}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    color='secondary'
                                    error={emailError}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="contactName"
                                    label="Contact Name"
                                    color='secondary'
                                    name="contactName"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="companyName"
                                    fullWidth
                                    id="companyName"
                                    color='secondary'
                                    label="Company Name"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="message"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    id="message"
                                    color='secondary'
                                    label="Your Message"
                                />
                            </Grid>
                    
                            <Grid item xs={12} mt={2} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: {xs: 3, sm: 0}}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color='secondary'
                                    sx={{ color: '#fff'}}
                                >
                                    Book a Meeting Via Calendly
                                </Button>
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

export default CompanyRegister;