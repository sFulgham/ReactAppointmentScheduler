import Action from '../actions/actionTypes';
/* eslint-disable no-console */
const intialState = {
  appointmentTimes: [
    {id: 1, slot: '9am to 10am', isActive: false, name: '', phoneNumber: ''},
    {id: 2, slot: '10am to 11am', isActive: false, name: '', phoneNumber: ''},
    {id: 3, slot: '11am to 12pm', isActive: true, name: 'Steven Fulgham', phoneNumber: '678.333.3908'},
    {id: 4, slot: '12pm to 1pm', isActive: false, name: '', phoneNumber: ''},
    {id: 5, slot: '1pm to 2pm', isActive: false, name: '', phoneNumber: ''},
    {id: 6, slot: '2pm to 3pm', isActive: false, name: '', phoneNumber: ''},
    {id: 7, slot: '3pm to 4pm', isActive: false, name: '', phoneNumber: ''},
    {id: 8, slot: '4pm to 5pm', isActive: false, name: '', phoneNumber: ''}
  ]
};

export default function appointmentsReducer(state, action) {
  //console.log('hit reducer');
  let filteredAppointments = [];

  if(typeof state === 'undefined'){ //Guard clause
    return intialState;
  }

  if(action.type === Action.getAppointmentsByIdSuccess){
    filteredAppointments = state.appointmentTimes.filter((appointment) => {
      return appointment.id == action.appointmentId;
    });
  }

  switch(action.type) {
    case Action.loadAppointmentsSuccess:
      return Object.assign({}, state, action.appointments);
    case Action.getAppointmentsByIdSuccess:
      return Object.assign({}, state, filteredAppointments);
    case Action.updateAppointmentsSuccess:
      const newState = Object.assign({}, state);
      newState.appointmentTimes = newState.appointmentTimes.map((appointment) => {
        if(appointment.id === action.appointments.id){
          (action.appointments.name !== '' || action.appointments.phoneNumber !== '') ?
            appointment.isActive = true :
            appointment.isActive = false;
          return Object.assign({}, appointment, action.appointments);
        }
        //console.log('Mapped: ', state.appointmentTimes);
        return appointment;
      });
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}
