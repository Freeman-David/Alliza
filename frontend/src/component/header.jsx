import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Divider from '@mui/material/Divider';
import LoginIcon from '@mui/icons-material/Login';

function HideOnScroll(props) {
    const { children, window } = props;
    
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
      });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
  };

const navItems = [ 
    {name: 'Home', link: '/home-page'}, 
    {name: 'About', link: '/about-us'}, 
    {name: 'Connect with us', link: '/business-register'}
];

function Header (props) {
    const { window, user } = props;
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selected, setSelected] = useState('Home');

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const navTo = (link) => {
        navigate(link);
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: 'primary.main' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton onClick={() => navTo(item.link)}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider variant='middle' sx={{my: 2}} />

            <ListItem disablePadding sx={{mb: 2}}>
                <ListItemButton onClick={() => navigate('/login')}>
                    <ListItemIcon>
                        <LoginIcon color='secondary' />
                    </ListItemIcon>
                    <ListItemText primary={'Candidates sign in'} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
    );

    return(
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{zIndex: 1400}}>
                    <Toolbar sx={{height: {sm: '10vh', xs: '5vh'}, justifyContent: 'center'}}>
                        <Grid container maxWidth={'lg'} direction="row">
                            <Grid item xs={6} md={3} xl={6} display='flex' alignItems='center'>
                                <Typography
                                    variant="h1"
                                    noWrap
                                    component="a"
                                    href="/"
                                    color="secondary"
                                    sx={{
                                        fontWeight: 500,
                                        textDecoration: 'none',
                                        fontFamily: 'Exo, sanse-serif',
                                        typography:{xs: {fontSize: '18px'}, sm: {fontSize: '38px'}}
                                    }}
                                >
                                    {'Alliza'}  
                                </Typography>
                            </Grid>
        
                            <Grid item xs={6} md={9} xl={6} display={user ? 'none' : 'flex'} alignItems='center' justifyContent="flex-end">
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: 'fit-content' }}>
                                    {navItems.map((item) => (
                                    <Button 
                                        onClick={() => {
                                            navTo(item.link)
                                            setSelected(item.name)
                                        }} 
                                        key={item.name} 
                                        sx={{ 
                                            color: selected === item.name ? 'secondary.main' : '#000', 
                                            '&:hover': {color: 'secondary.main'}
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                    ))}

                                    <Button variant='contained' color='secondary' onClick={() => navigate('/login')} sx={{ color: '#fff', height: '40px', ml: 3}}>
                                        {'Candidates sign in'}
                                    </Button>
                                </Box>

                                <Box sx={{ display: user ? 'none' : {xs: 'flex', md: 'none'} }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleDrawerToggle}
                                        sx={{color: 'secondary.main'}}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor='top'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', 
                        paddingTop: 6, backgroundColor: 'primary.light' },
                    }}
                    >
                    {drawer}
                </Drawer>
            </Box>

            
            <Toolbar />
        </>
    )
}

export default Header;