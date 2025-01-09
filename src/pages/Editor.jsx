import { Box, Grid2 } from "@mui/material"
import NavBar from "../components/NavBar";
import LuaConfigEditor from "../components/LuaConfigEditor";

const Editor = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
            <Grid2 size={4}>
                <NavBar/>
            </Grid2>
            <Grid2 size={8}>
                <Box sx={{m:4, backgroundColor:'#43545a'}}>
                    <LuaConfigEditor/>
                </Box>
            </Grid2>
        </Grid2>  
        </Box>
    )
}
export default Editor;