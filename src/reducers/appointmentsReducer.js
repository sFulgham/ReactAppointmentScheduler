import Action from '../actions/actionTypes';
/* eslint-disable no-console */
let intialState = {
  appointmentTimes: [ //mock data used for development
  ]
};

export default function appointmentsReducer(state, action) {

  if(typeof state === 'undefined'){ //Guard clause
    return intialState;
  }

  let data = action.appointmentTimes || state.appointmentTimes;
  var newState = {};

  switch(action.type) {
    case Action.loadAppointmentsSuccess:
      return data;
    case Action.getAppointmentsByIdSuccess:
      if(state.hasOwnProperty('appointment')){
        newState = Object.assign({}, state);
        newState.appointment = newState.appointmentTimes.filter(function(appointment){
          return newState.appointment[0].id == appointment.id;
        });
        return Object.assign({}, state, newState);
      }
      newState = Object.assign({}, state);
      var appendSelectedAppointment = {appointment: action.appointment, appointmentTimes: []};
      Object.keys(newState).forEach(function(key) {
        appendSelectedAppointment.appointmentTimes.push(newState[key]);
      });
      return appendSelectedAppointment;
    case Action.updateAppointmentsSuccess:
      newState = Object.assign({}, state);
      newState.appointmentTimes = newState.appointmentTimes.map((appointment) => {
        if(appointment.id === action.appointments.id){
          (action.appointments.name !== '' || action.appointments.phoneNumber !== '') ?
            action.appointments.isActive = true :
            action.appointments.isActive = false;
          return Object.assign({}, appointment, action.appointments);
        }
        return appointment;
      });
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}
