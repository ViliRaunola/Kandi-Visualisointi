import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


//SOURCE FOR APP BAR: https://mui.com/components/app-bar/#basic-app-bar


const ResponsiveAppBar = () => {

    let navigate = useNavigate(); 

    //Based on this boolean some pages are hidden from the user. For example when user is not logged in there is no reason to show logout button.
    var isLoggedIn = false;

    // These useStates and functions are used to handle the closing and opening of the drop down menus
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    //When user log outs they are redirected to the login page
    const logOut = () => {
        sessionStorage.setItem('token', ''); //Clearing out the token from session storage
        navigate(`/login`, { replace: true })
    };

    //Checking if the user is logged in. 
    if(sessionStorage.getItem('token')){
        isLoggedIn = true
    }


    return (
        <AppBar position="static">
        <Container maxWidth="xl" >  {/* Container now grows to the full size of the screen */}
            <Toolbar disableGutters> {/* Gutters are set to false, so there wont be spaces between content's tracks*/}

                {/* Defining the area/ box in which the links to pages are located. 'xs: flex' meaning that on xs screens the menu is shown and in others 'md: none' it is hidden*/}
            <Box display='flex' flexGrow='1' sx={{ display: { xs: 'flex', md: 'none' } }}>
                {/* The haburger menu that is displayed on mobile */}
                <IconButton size="small" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                    <MenuIcon />
                </IconButton>
                
                <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left'}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }}}>
                    {/* Listing menu items that are same as the normal desktop navigation*/}
                    <MenuItem component={RouterLink} to='/' color="inherit" style={{padding: '10px'}}>
                            Home
                    </MenuItem>
                    <MenuItem component={RouterLink} to='/wifi' color="inherit" style={{padding: '10px'}}>
                            Wifi
                    </MenuItem>
                    {<MenuItem component={RouterLink} to='/bluetooth' color="inherit" style={{padding: '10px'}}>
                            Bluetooth
                    </MenuItem>}
                </Menu>
            </Box>
            {/* Creating links to pages. Are shown in the desktop mode due to md beign flex and xs none meaning on extra small screens this is hidden*/}
            <Box display='flex' flexGrow='1' sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MenuItem component={RouterLink} to='/' color="inherit" style={{padding: '10px'}}>
                            Home
                    </MenuItem>
                    <MenuItem component={RouterLink} to='/wifi' color="inherit" style={{padding: '10px'}}>
                            Wifi
                    </MenuItem>
                    {<MenuItem component={RouterLink} to='/bluetooth' color="inherit" style={{padding: '10px'}}>
                            Bluetooth
                    </MenuItem>}
            </Box>
            {/* Name of the site and setting the first box to have flexgrow 1 so all the other components that come after it are on the right side*/}
            <Box display='flex' flexGrow='0'>
                <Typography variant="h6" noWrap component="div" sx={{ mr: 4}}>
                    LUT
                </Typography>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
    };
export default ResponsiveAppBar;