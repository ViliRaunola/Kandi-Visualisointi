import React from 'react'
import { Container, Typography, Box } from "@mui/material"

const Home = () => {
  return (
    <Container  sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Box sx={{maxWidth: '75%'}}>
        <Typography variant='h4' color='headerPrimary' component='h1' padding={2}>
                Tervetuloa langattomien laitteiden monitorointi työkaluun!
        </Typography>
        <Typography variant='body1' color='primaryText' padding={2} sx={{wordWrap: 'break-word'}}>
                Tällä sivustolla voit seurata livenä Raspberry Pi:n havaitsemia Wifi ja Bluetooth laitteita.
        </Typography>
    </Box>
   
</Container>
  )
}

export default Home