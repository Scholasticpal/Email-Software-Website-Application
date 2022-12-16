import React from "react";
import './css/Widget.css'

function Widget() {
  return (
    <div className="widget">
      <div className="widgetOptions">
      <a href="https://calendar.google.com/calendar/u/0/r">
        <img src={process.env.PUBLIC_URL + '/images/calendar.png'} alt="calendar" /></a>
      </div>
      <div className="widgetOptions">
      <a href="https://keep.google.com/u/0/">
        <img src={process.env.PUBLIC_URL + '/images/keep.png'} alt="keep" /></a>
      </div>
      <div className="widgetOptions">
      <a href="https://tasksboard.com/">
        <img src={process.env.PUBLIC_URL + '/images/tasks.png'} alt="tasks" /></a>
      </div>
      <div className="widgetOptions">
      <a href="https://contacts.google.com/">
        <img src={process.env.PUBLIC_URL + '/images/contacts.png'} alt="contacts" /></a>
      </div>
      <div className="widgetOptions">
      <a href="https://about.google/products/">
        <img src={process.env.PUBLIC_URL + '/images/extra.png'} alt="extra" /></a>
      </div>
    </div>
  );
}

export default Widget;
