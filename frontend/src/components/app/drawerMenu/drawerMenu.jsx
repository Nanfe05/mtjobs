import React,{useState} from 'react';
import {SwipeableDrawer} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import {List} from '@material-ui/core';
import {Divider} from '@material-ui/core';
import {ListItem} from '@material-ui/core';
import {ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {useHistory} from 'react-router-dom';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';



export default function DrawerMenu() {

  const [drawerOpen,setDrawer] = useState(false);

  const history = useHistory();

  return (
    <div style={{
        position:'absolute',
        width:'100%',
        height:'100vh',
        pointerEvents:'none'
    }}>
        <Fab size='medium' className="menuBoton" style={{backgroundColor:'rgb(255, 230, 51)'}} onClick={()=>{setDrawer(true)}}>
           <MenuIcon/>
        </Fab>
        <SwipeableDrawer
            open={drawerOpen}
            onClose={()=>{setDrawer(false)}}
            className='drawerMenu'
            // onOpen={()=>{}}
          >
            <div
                // onClick={toggleDrawer(anchor, false)}
                // onKeyDown={toggleDrawer(anchor, false)}
                >
                <List>
                <ListItem onClick={()=>{
                    setDrawer(false);
                    history.push('/');
                }}>
                        <ListItemText>Home</ListItemText>
                </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem onClick={()=>{
                    setDrawer(false);
                    history.push('/aboutus');
                }}>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                    {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))} */}
                </List>
            </div>
          </SwipeableDrawer>
    </div>
  );
}