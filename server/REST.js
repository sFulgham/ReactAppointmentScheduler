import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import colors from 'colors';

/* eslint-disable no-console */

const port = 3001;
const app = express();
const compiler = webpack(config);
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

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/getAppointments', function(req,res){
  //console.log('Get intial state data');
  res.send(intialState);
});

app.get('/api/getAppointmentsById/:appointmentId', function(req,res){
  //console.log('Get state data by appointment id: ', req.params['appointmentId']);
  let filteredAppointments = intialState.appointmentTimes.filter((appointment) => {
    return appointment.id == req.params['appointmentId'];
  });
  res.send(filteredAppointments);
});

app.get('/', function(req, res) {
  //res.send('Server initialized');
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Start listening on port: ${port}`.green);
    open(`http://localhost:${port}`);
  }
});
