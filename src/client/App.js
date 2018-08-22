import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Search from './components/Search/Search';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Registration from './components/Registration/Registration';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/'component={Search}/>
          <Route exact path='/login'component={Login}/>
          <Route exact path='/404'component={NotFound}/>
          <Route exact path='/registration'component={Registration}/>
          <Redirect to='/404' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
