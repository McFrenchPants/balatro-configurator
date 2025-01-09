import { Box, Grid2, Typography } from "@mui/material"

const Home = () => {
    return (
      <Box sx={{ flexGrow: 1, m:10 }}>
        <Grid2 container spacing={2} direction="column">
        <Typography sx={{fontSize: 28, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>Hello there!</Typography>
        <Typography sx={{fontSize: 20, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>
          Click the Load button to get started.  You will need to find and select your "Game.lua" file, which can be extracted from the game file using the instructions below.
        </Typography>
        </Grid2>  
      </Box>
    )
  }
  export default Home;