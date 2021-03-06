import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdUpdate } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCovidStats } from '../store/covidStats';
import { customDateFormat } from '../utils/currentDate';

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleChange = (date) => {
    setStartDate(date);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCovidStats({ date: customDateFormat(startDate) }));
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="d-flex form-group">
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          name="startDate"
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
        />
        <Button variant="outline-primary" type="submit">
          <MdUpdate />
        </Button>
      </div>
    </form>
  );
};

export default CustomDatePicker;
