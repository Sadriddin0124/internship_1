import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';
import SideBar from '../SideBar/SideBar';
import CloseIcon from '@mui/icons-material/Close';
export default function Navbar({title}: {title: string}) {
    const pathname = usePathname().slice(0,3)
    const router = useRouter()
    const Logout = () => {
        router.push(pathname)
        localStorage.removeItem("accessToken")
    }
    const [sideBarStatus, setSideBarStatus] = React.useState<boolean>(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <SideBar toggle={setSideBarStatus} open={sideBarStatus}/>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setSideBarStatus(!sideBarStatus)}
          >
            {sideBarStatus ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: "capitalize" }}>
            {title}
          </Typography>
          <Button color="inherit" onClick={Logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}