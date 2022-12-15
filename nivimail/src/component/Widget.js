import React from "react";
import './css/Widget.css'

function Widget() {
  return (
    <div className="widget">
      <div className="widgetOptions">
        <img src={process.env.PUBLIC_URL + '/images/calendar.png'} alt="calendar" />
      </div>
      <div className="widgetOptions">
        <img src={process.env.PUBLIC_URL + '/images/keep.png'} alt="keep" />
      </div>
      <div className="widgetOptions">
        <img src={process.env.PUBLIC_URL + '/images/tasks.png'} alt="tasks" />
      </div>
      <div className="widgetOptions">
        <img src={process.env.PUBLIC_URL + '/images/contacts.png'} alt="contacts" />
      </div>
      <div className="widgetOptions">
        <img src={process.env.PUBLIC_URL + '/images/extra.png'} alt="extra" />
      </div>
    </div>
  );
}

export default Widget;
