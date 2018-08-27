import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Search from './components/Search/Search';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import SignUp from './components/SignUp/SignUp';
import history from './history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './configureStore'

const { persistor, store } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <div>
            <NavBar />
            <Switch>
              <Route exact path='/'component={Search}/>
              <Route exact path='/login'component={Login}/>
              <Route exact path='/404'component={NotFound}/>
              <Route exact path='/signup'component={SignUp}/>
              <Redirect to='/404' />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
