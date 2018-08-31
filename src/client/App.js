import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import SignUp from './components/SignUp/SignUp';
import Films from './components/Films/Films';
import Genres from './components/Genres/Genres';
import Film from './components/Film/Film';
import history from './services/history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './services/configureStore';
import './app.css';

const { persistor, store } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <div>
            <NavBar />
            <Switch>
              <Route exact path='/'component={Films}/>
              <Route exact path='/404'component={NotFound}/>
              <Route exact path='/login'component={Login}/>
              <Route exact path='/signup'component={SignUp}/>
              <Route exact path='/films/:id'component={Film}/>
              <Route exact path='/genres'component={Genres}/>
              <Redirect to='/404' />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
