import { useState } from "react";
import { v4 } from "uuid";

const Edit = ({ add, submittingStatus }) => {
  const [note, setNote] = useState("");
  function noteChange(e) {
    setNote(e.target.value);
  }

  const [date, setDate] = useState("");
  function dateChange(e) {
    setDate(e.target.value);
  }

  const [time, setTime] = useState("");
  function timeChange(e) {
    setTime(e.target.value);
  }

  const [fieldError, setFieldError] = useState('');

  function addItem() {
    const fieldsToCheck = [
      { field: "note", value: note, checkFunction: checkNote },
      { field: "date", value: date, checkFunction: checkDate },
      { field: "time", value: time, checkFunction: checkTime }
    ];
  
    for (const field of fieldsToCheck) {
      const result = field.checkFunction(field.value);
      if (result !== true) {
        setFieldError(field.field);
        showAlert(result);
        return;
      }
    }

    submittingStatus.current = true;
    add(function (prevData) {
      return [
        {
          id: v4(),
          note,
          date,
          time,
          isDone: false
        },
        ...prevData,
      ];
    });

    clearInput();
  }

  function showAlert(message) {
    alert(message);
    return false;
  }

  function checkNote(note) {
    return note.length > 0 || "Please enter note";
  }

  function checkDate(date) {
    const dateReg = /^(\d{4})-(\d{2})-(\d{2})$/;
    return dateReg.test(date) || "Please enter valid date";
  }

  function checkTime(time) {
    const timeReg = /^(\d{2}):(\d{2})$/;
    return timeReg.test(time) || "Please enter valid time";
  }

  function clearInput() {
    setNote("");
    setDate("");
    setTime("");
    setFieldError("");
  }

  return (
    <div>
      <p>Note:</p>
      <input
        type="text"
        value={note}
        onChange={noteChange}
        style={{ borderColor: fieldError === "note" ? "red" : "" }} 
      />
      <p>Date:</p>
      <input
        type="date"
        value={date}
        onChange={dateChange}
        style={{ borderColor: fieldError === "date" ? "red" : "" }} 
      />
      <p>Time:</p>
      <input
        type="time"
        value={time}
        onChange={timeChange}
        style={{ borderColor: fieldError === "time" ? "red" : "" }} 
      />
      <button className="add" onClick={addItem}>
        Add
      </button>
    </div>
  );
};

export default Edit;
