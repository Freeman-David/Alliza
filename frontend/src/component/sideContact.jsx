import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © Alliza '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function SideContact() {
    const navToSocial = link => {
        window.open(link,'_blank');
    }

    return(
        <Stack justifyContent={'space-between'} height={'100%'} p={2}>
            <Typography variant='h2' sx={{mb: 4}}>General Inquiries & Press Contact</Typography>
            <Stack direction='row' alignItems='center' spacing={1}>
                <EmailOutlinedIcon />
                <Link sx={{color: 'primary.dark'}} href='mailto:support@allizawork.com'>support@allizawork.com</Link>
            </Stack>
            <Typography variant='body1' sx={{mt: 2, mb: 4}}>We look forward to hearing from you!</Typography>

            <Stack spacing={2}>
                <Typography variant='body1'>
                    Follow us on social media:
                </Typography>

                <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                    <LinkedInIcon  
                        sx={{color: '#006097'}}
                        onClick={() => navToSocial('https://www.linkedin.com/company/allizawork/')}
                    />
                    <InstagramIcon  
                        sx={{color: '#e95950'}} 
                        onClick={() => navToSocial('https://www.instagram.com/alliza_work/?igshid=MzMyNGUyNmU2YQ%3D%3D')}
                    />
                </Stack>
            </Stack>

            <Copyright sx={{ mt: 5 }} />
        </Stack>
    )
}

export default SideContact;