import 'babel-polyfill';
import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import ConfigureStore from './store/store.config';
import {loadAllAppointments} from './actions/appointmentActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


//views
import LayoutView from './components/common/layout';

const store = ConfigureStore();
const app = document.getElementById('app');

store.dispatch(loadAllAppointments()); /* Intial state from server*/

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={LayoutView} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  app
);
