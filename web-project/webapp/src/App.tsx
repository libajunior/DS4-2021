import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Routes } from './routes';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8079f3',
      main: '#6158F0',
      dark: '#433da8',
    }
  }
});

export type ErrorType = {
  type: string;
  message: string;
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
