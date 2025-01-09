import { Box, Typography } from "@mui/material";
import DraggableImage from "./DraggableImage";

const Header = ({height}) => {

    return (
        <>
            <Box sx={{alignContent: 'center', height: height}} className="header">
                <img src="/header_bg.jpg" />
                <div className='ace-logo'>
                <DraggableImage 
                    src="/ace_config.png" 
                    alt="Draggable"
                    width={200}
                    height={250}
                />
                </div>
                <Box>
                <Typography sx={{fontSize: 60, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>Balatro Configurator</Typography>
                </Box>
            </Box>
        </>
    )
}
  export default Header;