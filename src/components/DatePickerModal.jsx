import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import CustomDatePicker from './CustomDatePicker';

function DatePickerModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Date Picker
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Pick a date to fetch covid-19 metrics until that date!</h6>
        <CustomDatePicker />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default DatePickerModal;