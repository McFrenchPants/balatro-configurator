import { Box, Grid2, Paper, Typography } from "@mui/material"

const Home = () => {
    return (
      <Box sx={{ flexGrow: 1, m:10 }}>
        <Grid2 container spacing={2} direction="column">
        <Typography sx={{fontSize: 32, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>Hello there!</Typography>
        <Typography sx={{fontSize: 20, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>
          Click the Load button to get started.<br/>
          You will need to find and select your "Game.lua" file, which can be extracted from the game using the instructions below.
        </Typography>
        <Paper sx={{maxWidth: '50%', textAlign: 'left', p: '6px', m: '0 auto'}}>
          <ol>
            <li>Locate your Balatro game folder.</li>
            <li>Right-click on Balatro.exe and open it with 7-Zip.</li>
            <li>Extract the contents of the file to a new folder (ex. "src").</li>
            <li>Use the Load button to select the "Game.lua" file from the extracted folder.</li>
          </ol>
        </Paper>
        </Grid2>  
      </Box>
    )
  }
  export default Home;