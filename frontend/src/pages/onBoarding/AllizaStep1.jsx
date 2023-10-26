import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { FetchMentors } from "../../app/slices/app";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { UpdateUserProfile } from "../../app/slices/auth";
import { connectSocket, socket } from '../../socket';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import introducerSmall from '../../images/IntroducerSmall.png';
import StyledStepper from '../../component/Stepper';
import Container from "@mui/material/Container";
import Radio from '@mui/material/Radio';

function NextButton({onClickEvent, eventParams, buttonText}) {
    return(
        <Button 
            variant="contained" 
            sx={{fontSize: '1rem', px: 4}} 
            color="secondary"  
            onClick={() => onClickEvent(eventParams)}
        >
            {buttonText}
        </Button>
    )
}

function AllizaStep1({user}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user) {
            navigate('/home-page');
        }
    
        if(user.stage > 1) {
            navigate('/step-2');
        }

        if(user) {
            if(!socket) {
                connectSocket(user._id);
            }

            dispatch(FetchMentors());
        }
    }, []);

    const [layout, setLayout] = useState(0);

    const updateMentor = mentor => {
        dispatch(UpdateUserProfile({mentor: {id: mentor._id, link: mentor.scheduleLink}, stage: 2}, navigate, '/step-2'));
        socket.emit('start_conversation', {from: user._id, to: mentor._id});
    }

    const layoutMap = {
        0: <Hello setLayout={setLayout} user={user} />,
        1: <ChooseMentor updateMentor={updateMentor} />
    }

    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'}>
            {layoutMap[layout]}
        </Box>
    )
}

export default AllizaStep1;

function Hello ({setLayout, user}) {
    return(
        <Container 
            sx={{
                height: {sm: '90vh', xs: '95vh'}, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 4
            }} 
            maxWidth={'sm'}
        >
            <Box>
                <StyledStepper activeStep={0} />

                <Stack direction={'row'} justifyContent={'center'}  mb={2}>
                    <Avatar src={introducerSmall} alt="Career Advisor" sx={{height: 120, width: 120}} />
                </Stack>

                <Typography variant="h2" fontWeight={'bold'} textAlign={'center'}>
                    {`Hi ${user.name.split(' ')[0]}`}
                </Typography>
            </Box>

            <Typography variant="body1" fontWeight={'bold'} textAlign={'center'}>
                I'm happy you're here!
            </Typography>

            <Typography variant="body1" textAlign={'center'}>
                We have three steps to go through together. Don't worry; we'll keep helping even after your new job starts. We want you to feel good and comfortable. 
            </Typography>

            <Typography variant="h2" fontWeight={'bold'} textAlign={'center'}>
                Let's take the first step on your journey with Alliza.
            </Typography>

            <NextButton onClickEvent={setLayout} eventParams={1} buttonText={"Begin With Step 1"} />
                
        </Container>
    )
}

function ChooseMentor ({updateMentor}) {
    const {mentors} = useSelector(state => state.app);

    const [selectedMentor, setSelectedMentor] = useState(0);

    const selectMentor = (mentor) => {
        setSelectedMentor(mentor);
    };

    return (
        <Container 
            sx={{
                height:{sm: '90vh', xs: '95vh'}, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 4
            }}
            px={{xs: 2, lg: 0}} 
            maxWidth={'lg'}
        >
            <Box>
                <StyledStepper activeStep={0} mb={4} />

                <Typography variant="body1" textAlign={'center'}>
                    Our first step is to choose a mentor who will guide you throughout your journey with us. <br /> We also want to let you know that you can change your mentor at any time.
                </Typography>
            </Box>

            <Grid container px={4} mb={5} maxWidth={'sm'}>
                {mentors.map((mentor, index) => (
                    <Grid key={index} item xs={6} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Avatar 
                            sx={{height: 100, width: 100, margin: '0 auto', mb: 2}} 
                            src={`https://alliza.s3.us-east-1.amazonaws.com/${mentor._id}`}
                            alt={mentor.name}
                        />
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} >
                            <Radio 
                                checked={selectedMentor === index}
                                onChange={() => selectMentor(index)}
                                value={mentor}
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'Choose Mentor' }}
                                color="secondary"
                            />
                            <Typography variant="body1">
                                {mentor.name}
                            </Typography>
                        </Stack>
                        
                        <Typography variant="body2" px={4} textAlign={'center'} my={2}>
                            {mentor.description}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <NextButton onClickEvent={updateMentor} eventParams={mentors[selectedMentor]} buttonText={"Continue"} />
        </Container>
    )
}