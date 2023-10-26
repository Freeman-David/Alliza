import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { UpdateUserProfile } from "../../app/slices/auth";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Introducer from '../../images/IntroducerSmall.png';
import therapist from '../../images/therapist.png';
import communityLeader from '../../images/communityLeader.png';
import StyledStepper from '../../component/Stepper';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function AllizaStep2({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/home-page');
        }
    
        if(user.stage > 2) {
            navigate('/')
        }
    
        if(user.stage < 2) {
            navigate('/step-1');
        }
    }, []);

    const [layout, setLayout] = useState(0);

    const updateStage = (layout) => {
        dispatch(UpdateUserProfile({stage: 3}, navigate, layout === 'scheduleSession' ? `/${layout}/?recipient=mentor` : `/${layout}`));
    }

    const layoutMap = {
        0: <Therapists user={user} setLayout={setLayout} />,
        1: <GoToHomePage updateStage={updateStage} />
    } 

    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'}>
            {layoutMap[layout]}
        </Box>
    )
}

export default AllizaStep2;

function NextButton({onClickEvent, eventParams, buttonText}) {
    return(
        <Button 
            variant="contained" 
            sx={{width: 150}} 
            color="secondary"
            onClick={() => onClickEvent(eventParams)}
        >
            {buttonText}
        </Button>
    )
}

function Therapists ({user, setLayout}) {
    return(
        <Container 
            sx={{
                height:{sm: '90vh', xs: '95vh'}, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2
            }}
            px={{xs: 2, lg: 0}} 
            maxWidth={'md'}
        >
            <Box>
                <StyledStepper activeStep={1} />

                <Typography variant="body1" px={{md: 14, xs: 0}}>
                    <strong>Great choice!</strong> Now, we will move to step 2. You have more friends here. Meet Jack, your therapist, and Mia, Alliza's Community Leader. 
                </Typography>
            </Box>
            
            <Box>
                <Typography variant="body1" textAlign={'center'} mb={2}>
                    They have messages for you!
                </Typography>

                <Container maxWidth={'sm'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Avatar src={therapist} alt="Therapist" sx={{height: 100, width: 100}} />
                        <Stack py={2}>
                            <Typography variant="body1" fontWeight={'bold'} mb={1}>
                                Jack - Your Therapist:
                            </Typography>

                            <Typography variant="body2" mb={2}>
                                {`Hi ${user?.name.split(' ')[0]}, I'm Jack, your therapist. I'm here to support your mental health journey. Let's build a safe, non-judgmental space for sharing thoughts, feelings, and goals!`}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Divider />

                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Avatar src={communityLeader} alt="Community Leader" sx={{height: 100, width: 100}} />
                        <Stack py={2}>
                            <Typography variant="body1" fontWeight={'bold'} mb={1}>
                                Mia - Community Leader: 
                            </Typography>

                            <Typography variant="body2" mb={2}>
                                {`Hi ${user.name.split(' ')[0]} ,  I'm Mia, your Alliza community leader. Welcome! We're here to support you. Share your thoughts and ideas with us. Let's make our community better together. Excited to connect, Mia`} 
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <NextButton onClickEvent={setLayout} eventParams={1} buttonText={'Continue'} />
            
        </Container>
    )
}

function GoToHomePage ({updateStage}) {
    return(
        <Container 
            sx={{
                height:{sm: '90vh', xs: '95vh'}, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pt: 2
            }}
            px={{xs: 2, lg: 0}} 
            maxWidth={'sm'}
        >
            <Avatar src={Introducer} alt="Career Advisor" sx={{height: 130, width: 130, mb: 2}} />

            <Typography variant="h2" fontWeight={'bold'} textAlign={'center'} mb={4} >
                That's it! You've selected your mentor and met the team. Now, you can talk to your mentor or explore the platform.
            </Typography>

            <Typography variant="body1" textAlign={'center'} mb={3} px={1}>
                Remember, you can chat with me, Lari, your career advisor, anytime. Our conversations will always be private, just between us. 
            </Typography>

            <Typography variant="body1" textAlign={'center'} fontWeight={'bold'} mb={5}>
                Best of luck on your new journey!
            </Typography>

            <Grid container gap={1} direction={'row-reverse'}>
                <Grid item sm={5.9} xs={12}>
                    <Button 
                        variant="contained"
                        fullWidth 
                        color="secondary"
                        onClick={() => updateStage('scheduleSession')} 
                    >
                        Schedule Meeting
                    </Button>
                </Grid>

                <Grid item sm={5.9} xs={12}>
                    <Button 
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => updateStage('portal')} 
                    >
                        Go To Deshboard
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}