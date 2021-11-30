import React from 'react'
import { createTheme ,ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffe54c',
      main: '#ffb300',
      dark: '#c68400',
      contrastText: '#000',
    },
    secondary: {
      light: '#484848',
      main: '#212121',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
  },
});



const ColorProvider = ({children}) => {
    return (
        <>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
        </>
    )
}

export default ColorProvider
