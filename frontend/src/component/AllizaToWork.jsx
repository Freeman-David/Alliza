import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';

const stages = [
    {
      label: 'Friends to Help You',
      description: `You'll meet people who have lots of experience. They will be like friends and mentors. They'll help you figure out your career goal! They'll also teach you how to feel strong inside and talk in a good way at work. They'll even show you how to handle tough situations.`,
    },
    {
      label: 'Making Your Path',
      description:
        `We create a plan just for you. This plan helps you learn and grow in your career. You will join workshops, talk with coaches, and do activities to become even better at your job. You'll also learn important skills like talking with others, working in a team, managing time, and solving problems.`,
    },
    {
      label: 'Fun Workshops',
      description: `Alongside the main steps, there are more workshops you can choose from. You can pick the ones you like with your mentor's help. These workshops will teach you even more useful things, and your mentor will help you choose the best ones based on what you need.`,
    },
    {
        label: 'Finding Your Fit',
        description: `We analyze your progress and preferences, partnering with companies for the right match. We'll guide you throughout the process and ease your transition, ensuring comfort and providing necessary support. Our assistance continues, even after you start, for your ongoing success.`,
    },
];

function AllizaToWork({isDesktop, setLayout}) {
    const {user} = useSelector(state => state.auth);

    return (
        <Container maxWidth={'md'} sx={{
            height: '100vh', pt: 4, overflowY: 'scroll', '&::-webkit-scrollbar': {display: 'none'}
        }}>
                <Stack 
                    direction={'row'} 
                    alignItems={'center'} 
                    justifyContent={isDesktop ? 'center' : 'flex-start'} 
                    spacing={12} 
                    width={'100%'} 
                    mb={4}
                >
                    {!isDesktop && <ChevronLeftIcon color='secondary' fontSize='large' onClick={() => setLayout(10)} />}
                    <Typography variant={'h2'} fontWeight={'bold'}>
                        Alliza To Work
                    </Typography>
                </Stack>

                <Timeline align={'left'}>
                    {stages.map((stage, index) => (
                        <TimelineItem key={stage.label}>
                            <TimelineOppositeContent sx={{ display: 'none' }}></TimelineOppositeContent>
                            <TimelineSeparator>
                            <TimelineDot 
                                sx={{padding: '6px 12px', backgroundColor: index + 1 <= user.stage ?
                                 'secondary.main' : 'rgba(0,0,0,.3)'}}
                            >
                                {index + 1}
                            </TimelineDot>
                            <TimelineConnector sx={{backgroundColor: index + 1 <= user.stage ?
                                 'secondary.main' : 'rgba(0,0,0,.3)', display: index < stages.length - 1 ? 'block' : 'none'}} />
                            </TimelineSeparator>
                            <TimelineContent color={index + 1 <= user.stage ? 'secondary' : 'rgba(0,0,0,.5)'}>
                                <Typography variant='body1' fontWeight={'bold'} my={1}>
                                    {stage.label}
                                </Typography>
                                <Typography variant='body1' mb={4}>
                                    {stage.description}
                                </Typography>
                                {index < stages.length -1 && <Divider sx={{backgroundColor: index + 1 <= user.stage ?
                                 'secondary.main' : 'rgba(0,0,0,.3)', height: '1.2px', border: 'none', mb: 2}} />}
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Container>
    )
}

export default AllizaToWork