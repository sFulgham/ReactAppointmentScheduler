import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as appointmentActions from '../../actions/appointmentActions';
import Modal from '../common/modal';
/* eslint-disable no-console */

const timeSlots = {
  marginTop: 55,
  display: 'inline-flex',
  flexDirection: 'column',
  height: 340,
  minHeight: 340
};

const availableTimes = {
  display: 'flex',
  flexDirection: 'row',
  width: 470
};

class TimeScheduler extends React.Component {
  constructor(props, context){
    super(props, context);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount(){
    console.log('Mounting');
    this.props.actions.loadAllAppointments();
  }

  openModal(evt){
    evt.preventDefault();
    console.log('Open modal');
  }

  render() {
    const {appointments} = this.props;
    const mappedElements = this.props.appointments.map(appointment => {
      let activeTime = {
        backgroundColor: 'none'
      };
      if(appointment.isActive){
        activeTime['backgroundColor'] = '#E91E63';
      }
      return(
        <div key={appointment.id}>
          <ListItem
            primaryText={appointment.name}
            secondaryText={appointment.phoneNumber}
            style={activeTime}>
            <div style={availableTimes}>
              {appointment.slot}
            </div>
            <Modal modalId={appointment.id} formName="appointments"/>
          </ListItem>
          <Divider />
        </div>
      );
    });

    return (
      <List style={timeSlots}>
        {mappedElements}
      </List>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    appointments: state.appointments.appointmentTimes
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(appointmentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeScheduler);
