import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TimeSchedulerView from '../appointments/timeScheduler';

const mainStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const paperStyle = {
  height: 600,
  width: 500,
  margin: 20,
  overflowY: 'scroll'
};

const appBarStyle = {
  position: 'absolute',
  width: 500
};

class Layout extends React.Component {
  render(){
    return(
      <main style={mainStyle}>
        <Paper style={paperStyle} zDepth={1}>
          <AppBar title="Appointment Scheduler" showMenuIconButton={false} style={appBarStyle}/>
          <TimeSchedulerView />
          {this.props.children}
        </Paper>
      </main>
    );
  }
}

export default Layout;
