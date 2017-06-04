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
      id: 0,
      name: '',
      phoneNumber: '',
      formSubmitted: false
    };
  }

  componentDidMount(){
    //console.log('Mounting Form');
    let self = this;
    let appointments = [];
    self.props.appointment.length > 0 ?
      appointments = self.props.appointment:
      appointments = self.props.appointment.appointmentTimes;
    self.props.actions.getAppointmentsById(self.props.appointmentId, appointments);
    setTimeout(function(){
      self.init();
    }, 650);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.onSubmit !== this.props.onSubmit){
      nextProps.onClose();
      nextProps.actions.updateAppointments(this.state);
    }
  }

  init(){
    try {
      this.setState({
        id: this.props.appointment.appointment[0].id,
        name: this.props.appointment.appointment[0].name,
        phoneNumber: this.props.appointment.appointment[0].phoneNumber
      });
    } catch(ex){
      //console.log(ex);
    }
  }

  onChange(evt, newValue){
    //console.log(newValue);
    let self = this;
    switch(evt.target.name){
      case 'tf_Name':
        self.setState({name: newValue});
        break;
      case 'tf_PhoneNumber':
        self.setState({phoneNumber: newValue});
        break;
    }
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Full Name"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          value={this.state.name}
          onChange={this.onChange}
          name="tf_Name"
        />
        <br />
        <TextField
          floatingLabelText="Phone Number"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          value={this.state.phoneNumber}
          onChange={this.onChange}
          name="tf_PhoneNumber"
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    appointment: state.appointments || state.appointments.appointment[0]
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(appointmentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsModalForm);
