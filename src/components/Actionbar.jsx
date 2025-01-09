import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useAppContext } from '../AppContext';
import { Paper } from '@mui/material';
import CloseButton from './CloseButton';
import { handleFileUpload } from './Utility';

const pages = ['Load', 'Save', 'Revert', 'Play'];

function Actionbar({top}) {
  const [showChanges, setShowChanges] = React.useState(false);
  const { data, setData } = useAppContext();

  const handleLoad = (event) => {
    //setData({test: "test"});
    handleFileUpload(event, setData);
  };
  const handleSave = (event) => {
    setShowChanges(true);
  };

  const handleRevert = () => {
    setData(null);
  };

  const handlePlay = () => {
    
  };

  return (
    <>
    <AppBar position="absolute" sx={{borderRadius: 3, backgroundColor: '#39444b', maxWidth: '640px', m: '0 auto', top: top, left: '50%', transform: 'translate(-50%, -50%)', transition: 'top 0.3s ease'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <MenuButton
              name="Load"
              color='#008fff'
            >
              <input type="file" hidden accept=".lua" onChange={(event)=>handleLoad(event)} />
            </MenuButton>
            <MenuButton
              name="Save"
              clickHandler={handleSave}
              color='#f69400'
            />
            <MenuButton
              name="Revert"
              clickHandler={handleRevert}
              color='#ee4a3a'
            />
            <MenuButton
              name="Play"
              clickHandler={handlePlay}
              color='#3e987b'
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    { showChanges &&
      <Paper elevation={3} sx={{position: 'absolute', top: '50%', left: '20%', height: '50vh', width: '80%', transform: 'translate(-15%, -50%)',  overflow:'scroll', backgroundColor:'white', zIndex: 99}}>
        <Box sx={{textAlign: 'left', position: 'relative'}}>
          <Box sx={{position: 'fixed', top: 10, right: 10}}>
            <CloseButton onClick={()=>setShowChanges(false)}/>
          </Box>
          {JSON.stringify(data)};
        </Box>
      </Paper>
    }
    </>
  );
}
const MenuButton = ({name, clickHandler = () => {}, color, children}) => {

  return (
    <Button component="label"
      key={name}
      onClick={(event)=>clickHandler(event)}
      sx={{ m: 0.5, p: 0.5, color: 'white', display: 'block', backgroundColor: color, borderRadius: 2, minWidth: '120px', boxShadow: 4 }}
      className='menu-button'
    >
      <Typography sx={{fontSize: 26, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>{name}</Typography>
      {children}
    </Button>
  )
}
export default Actionbar;