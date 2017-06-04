import Action from './actionTypes';
import axios from 'axios';
/* eslint-disable no-console */

export function loadAllAppointmentsSuccess(appointments) {
  return { type: Action.loadAppointmentsSuccess, appointments: appointments };
}

export function loadAllAppointments() {
  return function(dispatch) {
    axios.get('/api/getAppointments').then((res) => {
      dispatch({type: Action.loadAppointmentsSuccess, appointmentTimes: res.data.appointmentTimes});
    }).catch((err) => {
      //console.log(err);
      dispatch(loadAllAppointmentsSuccess());
    });
    //return dispatch(loadAllAppointmentsSuccess());
  };
}

export function getAppointmentsById(appointmentId) {
  return function(dispatch) {
    axios.get('/api/getAppointmentsById/' + appointmentId).then((res) => {
      dispatch({type: Action.getAppointmentsByIdSuccess, appointment: res.data});
    }).catch((err) => {
      //console.log(err);
      dispatch(loadAllAppointmentsSuccess());
    });
    //return dispatch({ type: Action.getAppointmentsByIdSuccess, appointmentId: appointmentId });
  };
}

export function updateAppointments(appointment) {
    return function(dispatch) {
      return dispatch({ type: Action.updateAppointmentsSuccess, appointments: appointment });
    };
 }
