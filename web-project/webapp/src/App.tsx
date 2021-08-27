import { BrowserRouter, Route } from 'react-router-dom';
import { Signin } from './pages/Signin';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Signin} />
    </BrowserRouter>
  );
}

export default App;
