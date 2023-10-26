import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    const links = [
        {
            name: 'Privacy',
            href: '#'
        },
        {
            name: 'Cookie Policy',
            href: '#'
        },
        {
            name: 'Terms',
            href: '#'
        },
        {
            name: 'Sitemap',
            href: '#'
        }
    ];

    const navToSocial = link => {
        window.open(link,'_blank');
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Container maxWidth='xs'>
                <Grid container alignItems="center" justifyContent='center'>
                    <Grid item xs={12} sx={{mb: 2, mt: 4}}>
                        <Stack spacing={2}>
                            <Typography textAlign={'center'} variant='body1'>
                                Follow us on social media:
                            </Typography>

                            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                                <LinkedInIcon 
                                    fontSize='large' 
                                    sx={{color: '#006097'}}
                                    onClick={() => navToSocial('https://www.linkedin.com/company/allizawork/')}
                                />
                                <InstagramIcon 
                                    fontSize='large' 
                                    sx={{color: '#e95950'}} 
                                    onClick={() => navToSocial('https://www.instagram.com/alliza_work/?igshid=MzMyNGUyNmU2YQ%3D%3D')}
                                />
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction='row' justifyContent={'space-between'}>
                                {links.map((link) => (
                                    <Link underline="hover" key={link.name} sx={{color: 'primary.dark'}} href={link.href}>
                                        {link.name}
                                    </Link>
                                ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{mt: 1, mb: 4}}>
                        <Typography textAlign='center' variant='body2' color='#898f9c'>
                            {'© Alliza'} {new Date().getFullYear()}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;