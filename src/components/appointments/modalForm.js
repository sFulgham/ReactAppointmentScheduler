import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as appointmentActions from '../../actions/appointmentActions';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
/* eslint-disable no-console */

const styles = {
  floatingLabelStyle: {
    color: 'rgb(0, 188, 212)'
  },
  floatingLabelFocusStyle: {
    color: 'rgb(0, 188, 212)'
  }
};

class AppointmentsModalForm extends React.Component {
  constructor(props, context){
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: 'Property Value'
    };
  }

  componentDidMount(){
    console.log('Mounting Form');
    this.props.actions.getAppointmentsById(this.props.appointmentId, this.props.appointments);
  }

  onChange(evt){
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Full Name"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          value={this.props.appointment.name || ''}
          onChange={this.onChange}
        />
        <br />
        <TextField
          floatingLabelText="Phone Number"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          value={this.props.appointment.phoneNumber || ''}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    appointment: state.appointments[0]
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(appointmentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsModalForm);
