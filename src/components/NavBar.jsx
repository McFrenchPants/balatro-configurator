import { Button, Grid2, Typography } from "@mui/material";
import { useAppContext } from "../AppContext";

export const NavBar = () => {
    const { dataTypes } = useAppContext();
    
    return (
      <Grid2 container spacing={1} sx={{p: 4, borderRight: 'solid 1px red', borderLeft: 'solid 1px red', justifyContent: 'center'}}>
        <Typography sx={{fontSize: 28, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>Game Data</Typography>
        {dataTypes.map((item) => (
          <NavButton
            key={item.value}
            name={item.label}
            value={item.value}
          />
        ))}
      </Grid2>
    )
  }
  
  const NavButton = ({name, value, color}) => {
    const { setIsLoading, setCurrentDataType } = useAppContext();
    const buttonColor = color ? color : '#ee4e3f';
  
    const handleNavButton = (value) => {
      console.log("Setting current type to " + value);
      setIsLoading(true);
      setCurrentDataType({label: name, value: value});
    }
    return (
      <Button
        key={value}
        onClick={()=>handleNavButton(value)}
        sx={{ m: 0.5, p: 1, color: 'white', display: 'block', backgroundColor: buttonColor, borderRadius: 2, width: '100%', minWidth: '160px', boxShadow: 4 }}
        className='menu-button nav-button'
      >
        <Typography sx={{fontSize: 28, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>{name}</Typography>
      </Button>
    )
  }
  export default NavBar;