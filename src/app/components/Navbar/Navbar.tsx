import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname().slice(0,3)
    const router = useRouter()
    const Logout = () => {
        router.push(pathname)
        localStorage.removeItem("accessToken")
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className=' bg-purple-500'>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Categories
          </Typography>
          <Button color="inherit" onClick={Logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}