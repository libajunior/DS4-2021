import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

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
        <AuthContextProvider >
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Home} />
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
