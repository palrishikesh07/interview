import { useState } from 'react'
import Buttons from './components/Buttons'
import UploadFile from './components/UploadFile'
import ComboBox from './components/ComboBox'
import RangeSlider from './components/RangeSlider'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <>
        <h1>MUI</h1>
        <Buttons />
        <UploadFile />
        <ComboBox />
        <RangeSlider />
      </>
    </ThemeProvider>
  )
}

export default App
