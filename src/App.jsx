import { React, useState, useEffect } from 'react'
import './App.css'
import Actionbar from './components/Actionbar'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from './AppContext';
import Header from './components/Header';
import Editor from './pages/Editor';
import Home from './pages/Home';

function App() {
  
  const [headerHeight, setHeaderHeight] = useState('50vh');
  const { isLoading, setIsLoading, data } = useAppContext();

  useEffect(() => {
    console.log('Game data was changed:', data);
    
    if(data != null){
      setHeaderHeight('20vh');
      setIsLoading(false);
    }else{
      setHeaderHeight('50vh');
    }
  }, [data]);

  return (
    <>
      <div className='main'>
        <Header height={headerHeight}/>
        <Actionbar top={headerHeight}/>
        {data ? <Editor/> : <Home/>}
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  )
}

export default App;
