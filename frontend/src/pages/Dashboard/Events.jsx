import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { FetchEvents, RegisterEvent } from "../../app/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import event1Img from '../../images/event1Image.png';
import event2Img from '../../images/event2Image.png';
import event3Img from '../../images/event3Image.png';

const images = [event1Img, event2Img, event3Img];

function getFormattedDate(date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear().toString().substr(-2);
  
    let month = (1 + newDate.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    let day = newDate.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '.' + day + '.' + year;
}

function Events({setLayout, isDesktop}) {
    const {events} = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {    
        dispatch(FetchEvents());
    }, []);

    return (
        <Container maxWidth={'md'} sx={{height: '100vh', pt: 4}}>
            <Stack 
                direction={'row'} 
                alignItems={'center'} 
                justifyContent={isDesktop ? 'center' : 'flex-start'} 
                spacing={1.3} 
                width={'100%'} 
                mb={2}
            >
                {!isDesktop && <ChevronLeftIcon 
                    color='secondary' 
                    fontSize='large' 
                    onClick={() => setLayout(prev => {
                            prev.set('layout', 'nav');
                            return prev;
                        })}     
                />}
                <Typography textAlign={'center'} variant={'h2'} fontWeight={'bold'}>
                    Explore the exciting events ahead at Alliza!
                </Typography>
            </Stack>

            <Typography variant="body1" textAlign={'center'} mb={4}>
                Interested in joining our community activities? Take a look at the the calendar &  join us for a great time.
            </Typography>

            <Grid container spacing={2}>
                {events.map((event, index) => (
                        <Grid key={index} item xs={12} >
                            <Grid container spacing={2}>
                                <Grid item xs={5.5} pr={5} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                    <Typography mb={1} variant="body1" fontWeight={'bold'} color="text.primary">
                                        {event.header}
                                    </Typography>

                                    <Breadcrumbs separator={"|"} aria-label="event data">
                                        <Typography variant="body2" >
                                            {getFormattedDate(event.date)}
                                        </Typography>
                                        <Typography variant="body2" >
                                            {`${event.eventTime} hours`}
                                        </Typography>
                                        <Typography variant="body2" >
                                            {event.type}
                                        </Typography>
                                        <Typography color='secondary' onClick={() => dispatch(RegisterEvent(event._id))}>
                                            Register
                                        </Typography>
                                    </Breadcrumbs>
                                </Grid>

                                <Grid item xs={6.5}>
                                    <Box
                                        component='img'
                                        src={images[index]}
                                        srcSet={images[index]}
                                        alt={event.header}
                                        sx={{width: '100%', height: {sm: 180, xs: 150}}}
                                    />
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    ))}
            </Grid>
            
        </Container>  
    )
}

export default Events;