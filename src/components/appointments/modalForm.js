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
      phoneNumber: ''
    };
  }

  componentDidMount(){
    //console.log('Mounting Form');
    let self = this;
    self.props.actions.getAppointmentsById(self.props.appointmentId, self.props.appointments);
    setTimeout(function(){
      self.init();
    }, 650);
  }

  init(){
    try {
      this.setState({
        id: this.props.appointment.id,
        name: this.props.appointment.name,
        phoneNumber: this.props.appointment.phoneNumber
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
        self.setState({name: newValue}, function(){
          self.props.actions.updateAppointments(self.state);
        });
        break;
      case 'tf_PhoneNumber':
        self.setState({phoneNumber: newValue}, function(){
          self.props.actions.updateAppointments(self.state);
        });
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
    appointment: state.appointments[0]
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(appointmentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsModalForm);
