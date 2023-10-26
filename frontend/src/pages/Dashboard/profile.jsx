import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useRef, useState } from 'react';
import { UpdateUserProfile, UpdateAvatar, logout } from '../../app/slices/auth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InsightsIcon from '@mui/icons-material/Insights';
import Link from '@mui/material/Link';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#51459e',
    height: 35,
    width: 35,
    borderRadius: '50%',
  },
  marginBottom: 10,
}));

const ImageInputButton = (props) => {
  return <Button {...props} component="label" />;
};

const ImageButton = styled(ImageInputButton)(({ theme }) => ({
  position: 'relative',
  height: 100,
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.4,
    },
    '& .MuiImageMarked-root': {
      opacity: 0.8,
    },
  },
}));

const links = [
  {
      name: 'Privacy',
      href: '#'
  },
  {
      name: 'Terms & Conditions',
      href: '#'
  },
  {
      name: 'Accessibility Tools',
      href: '#'
  }
];

function Profile({isDesktop, setLayout}) {
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null);

  const {user} = useSelector(state => state.auth);
  const [avatar, setAvatar] = useState(`https://alliza.s3.us-east-1.amazonaws.com/${user?._id}`);
  const [role, setRole] = useState(user.role);
  const [county, setCounty] = useState(user.county);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();

  const updateAvatar = (file) => {
    
    // setting the avatar again in order to change the view
    setAvatar(URL.createObjectURL(file));

    dispatch(UpdateAvatar(file));
  }

  const updateUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      id: user._id,
      description: data.get('about'),
      role: data.get('role'),
      county: data.get('county'),
    }

    dispatch(UpdateUserProfile(userData));
    setEditMode(false);
  };

  return (
      <Container maxWidth={'xs'} sx={{pt: {xs: 2, sm: 4}}}>
          {!isDesktop && <ChevronLeftIcon 
                    color='secondary' 
                    fontSize='large' 
                    onClick={() => setLayout(prev => {
                            prev.set('layout', 'nav');
                            return prev;
                        })}     
                />}
          <Box component="form" ref={formRef} onSubmit={updateUser} sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StyledBadge 
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <ImageButton
                  focusRipple
                  key={'random'}
                  style={{
                    width: '100%',
                  }}
                >
                  <CameraAltIcon color='primary' />
                  <input type='file' accept='image/*' hidden onChange={(e) => updateAvatar(e.target.files[0])}/>
                </ImageButton>
              }>
              <Avatar src={avatar} alt={user.name} sx={{
                height: 100, width: 100,
              }}/>
            </StyledBadge>
            
            <TextField
              margin="normal"
              fullWidth
              color='secondary'
              id="name"
              variant='standard'
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'secondary.main',
                },
              }} 
              name="name"
              value={user.name}
              InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'> 
                              <PersonOutlineIcon sx={{mr: 2}} color='secondary' />
                          </InputAdornment>
                        )
                      }}
            />
            <TextField
              margin="normal"
              fullWidth
              color='secondary'
              id="role"
              variant='standard'
              name="role"
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'secondary.main',
                },
              }} 
              value={role}
              onChange={(e) => {
                if (editMode) {
                  setRole(e.target.value);
                }
              }}
              InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'> 
                              <EngineeringOutlinedIcon sx={{mr: 2}} color='secondary' />
                          </InputAdornment>
                        )
                      }}
            />
            <TextField
              margin="normal"
              fullWidth
              color='secondary'
              id="county"
              variant='standard'
              name="county"
              value={county}
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'secondary.main',
                },
              }} 
              onChange={(e) => {
                if (editMode) {
                  setCounty(e.target.value)
                }
              }}
              InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'> 
                              <RoomOutlinedIcon sx={{mr: 2}} color='secondary' />
                          </InputAdornment>
                        )
                      }}
            />

            {user.permission === 'user' && <>
              <Stack direction={'row'} spacing={2} width={'100%'} my={2} >
                <InsightsIcon color='secondary' />
                <Typography variant="body1">{`Alliza to work: stage${user.stage}`}</Typography>
              </Stack>

              <Divider color={'secondary'} flexItem />
            </>}

            <TextField
              margin="normal"
              fullWidth
              color='secondary'
              label='About'
              id="about" 
              name="about"
              value={about}
              onChange={(e) => {
                if (editMode) {
                  setAbout(e.target.value);
                }
              }}
              multiline
              rows={3} 
            />

            <Stack direction={'column'} mt={3} justifyContent={'center'} spacing={2} width={'100%'}>
              <Button
                color='secondary'
                variant='contained'
                onClick={() => {
                  editMode ? formRef.current.requestSubmit() : setEditMode(true);
                }}
              >
                {editMode ? 'Save' : 'Update Profile'}
              </Button>

              <Button variant="outlined" color="secondary" onClick={() => dispatch(logout())}>Log Out</Button>
            </Stack>
          </Box>

          <Stack direction='row' justifyContent={'space-between'} mt={4}>
            {links.map((link) => (
                <Link underline="hover" key={link.name} sx={{color: 'primary.dark'}} href={link.href}>
                    {link.name}
                </Link>
            ))}
          </Stack>
      </Container>
  )
}

export default Profile