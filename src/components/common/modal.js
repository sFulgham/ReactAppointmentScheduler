import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppointmentsModalForm from '../appointments/modalForm';
/* eslint-disable no-console */

const selectTime = {
  margin: 12,
  marginTop: -20,
  position: 'relative',
  right: -370
};

class Modal extends React.Component {
  constructor(props, context){
    super(props, context);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      open: false,
      submit: false
    };
  }

  onOpen(){
    this.setState({open: true});
  }

  onClose() {
    var newState = Object.assign({}, this.state);
    newState.submit = false;
    newState.open = false;
    this.setState({open: newState.open, submit: newState.submit});
  }

  onSubmit(evt){
    evt.preventDefault();
    this.setState({submit: true});
  }

  render() {
    const events = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.onClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.onSubmit}
      />
    ];

    let content = '', title = '';
    switch(this.props.formName){
      case 'appointments':
        title = 'Schedule an appointment';
        content = <AppointmentsModalForm
          appointmentId={this.props.modalId}
          onSubmit={this.state.submit}
          onClose={this.onClose}
          key={this.props.modalId} />;
        break;
      default:
        title = 'Unexpected error';
        content = 'Not able to render form. Please provide a form name to this modal';
    }

    return (
      <div>
        <RaisedButton label="Select" primary={true} style={selectTime} onClick={this.onOpen} />
        <Dialog
          title={title}
          actions={events}
          modal={false}
          open={this.state.open}
          onRequestClose={this.onClose}
        >
          {content}

        </Dialog>
      </div>
    );
  }
}

export default Modal;
