import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Calendly from '../../component/Calendly';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { useSearchParams } from 'react-router-dom';

function ScheduleSession({setLayout, isDesktop}) {
  const {user} = useSelector(state => state.auth);
  const [urlParams, setUrlParams] = useSearchParams({recipient: ''});
  const selected = urlParams.get('recipient');
  const link = selected ? user[selected].link : '';
  const avatarURL = 'https://alliza.s3.us-east-1.amazonaws.com/';

  const menu = [
    {
        text: "Connect with my  Mentor",
        name: 'mentor',
        onClick: () => {
          setUrlParams(prev => {
            prev.set('recipient', 'mentor');
            return prev;
          });
        },
        icon: <Avatar src={avatarURL + user.mentor?.id} sx={{height: 64, width: 64}} />,
    },
    {
        text: "Connect with Alliza's Therapist",
        name: 'therapist',
        onClick: () => {
          setUrlParams(prev => {
            prev.set('recipient', 'therapist');
            return prev;
          });
        },
        icon: <Avatar src={avatarURL + user.therapist?.id} sx={{height: 64, width: 64}} />,
    },
    {
        text: "Connect with Alliza's Career Advisor",
        name: 'careerAdvisor',
        onClick: () => {
          setUrlParams(prev => {
            prev.set('recipient', 'careerAdvisor');
            return prev;
          });
        },
        icon: <Avatar src={avatarURL + user.careerAdvisor?.id} sx={{height: 64, width: 64}} />,
    },
    {
        text: "Connect with Alliza's Community Leader",
        name: 'communityLeader',
        onClick: () => {
          setUrlParams(prev => {
            prev.set('recipient', 'communityLeader');
            return prev;
          });
        },
        icon: <Avatar src={avatarURL + user.communityLeader?.id} sx={{height: 64, width: 64}} />,
    },
];
  
  if (isDesktop) {
    return (
      <Grid container direction={'row'} height={'100vh'}>
        <Grid item md={4} pt={2} sx={{backgroundColor: 'secondary.light'}}>
          <Typography variant={'body1'} fontWeight={'bold'} mt={4} mb={2} textAlign={'center'}>
            We are here for you!
          </Typography>

          <Typography variant='body1' fontWeight={'bold'} textAlign={'center'} mb={2}>
            Let's Connect
          </Typography>

          {menu.map((item) =>
          <Box key={item.name} sx={{cursor: 'pointer'}}>
              <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  height={130}
                  px={2}
                  onClick={(item.onClick)}
                  sx={{
                    backgroundColor: selected === item.name ? '#cecae8' : 'secondary.light',
                            '&:hover': {
                                backgroundColor: selected === item.name ? '#cecae8' : 'primary.light'
                            }
                  }}
              >
                  <Stack direction={'row'} alignItems={'center'} spacing={2} >
                      {item.icon}
                      <Typography variant='body1'>
                          {item.text}
                      </Typography>
                  </Stack>

                  <ChevronRightIcon color='secondary' />
              </Stack>
              <Divider />
          </Box>
      )}
        </Grid>
        <Grid item md={8} sx={{backgroundColor: 'primary.light'}}>
          {selected && <Calendly url={link} height={'100%'} />}
        </Grid>
      </Grid>
    )
  }

  if (selected) {
    return(
      <>
        <CloseIcon color='secondary' onClick={() => {
          setUrlParams(prev => {
            prev.set('recipient', '');
            return prev;
          });
        }} />
        <Calendly url={link} height={'93vh'} />
      </>
    )
  }

  return (
    <Box px={2} pt={4} >
      <Stack m={'0 auto'} direction={'row'} alignItems={'center'} spacing={10} width={'100%'} mb={2}>
        <ChevronLeftIcon 
            color='secondary' 
            fontSize='large' 
            onClick={() => setLayout(prev => {
                    prev.set('layout', 'nav');
                    return prev;
                })}     
        />

        <Typography variant={'body1'} fontWeight={'bold'}>
          We are here for you!
        </Typography>
      </Stack>

      <Typography variant='body1' fontWeight={'bold'} textAlign={'center'} mb={2}>
        Let's Connect
      </Typography>

      {menu.map((item, index) =>
          <Box key={index} px={1} sx={{cursor: 'pointer'}}>
              <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  height={100}
                  onClick={item.onClick}
              >
                  <Stack direction={'row'} alignItems={'center'} spacing={2} >
                      {item.icon}
                      <Typography variant='body1'>
                          {item.text}
                      </Typography>
                  </Stack>

                  <ChevronRightIcon color='secondary' />
              </Stack>
              {index !== menu.length - 1 && <Divider />}
          </Box>
      )}
      
    </Box>
  )
}

export default ScheduleSession;