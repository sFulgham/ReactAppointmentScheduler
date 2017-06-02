import Action from './actionTypes';
/* eslint-disable no-console */

export function loadAllAppointmentsSuccess(appointments) {
  return { type: Action.loadAppointmentsSuccess, appointments: appointments };
}

export function loadAllAppointments() {
  return function(dispatch) {
    return dispatch(loadAllAppointmentsSuccess());
  };
}

export function getAppointmentsById(appointmentId) {
  return function(dispatch) {
    console.log('hit action getAppointmentsById: ' + appointmentId);
    return dispatch({ type: Action.getAppointmentsByIdSuccess, appointmentId: appointmentId });
  };
}

export function updateAppointments(appointment) {
    return function(dispatch) {
      console.log('hit action updateAppointments: ', appointment);
      return dispatch({ type: Action.updateAppointmentsSuccess, appointments: appointment });
    };
 }
