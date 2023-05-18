import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: "#4CB963",
      main: "#157F1F",
      dark: "#1D263B",
      contrastText: "#5C67B4"
    }
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
  , document.getElementById('app'));