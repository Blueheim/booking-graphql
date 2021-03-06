import React from 'react';
import './EventItem.css';

const EventItem = props => {
  return (
    <li key={props.eventId} className="events__list-item">
      <div>
        <h1>{props.title}</h1>
        <h2>$19.66</h2>
      </div>
      <div>
        {props.userId === props.creatorId ? (
          <p>You're the owner of this event</p>
        ) : (
          <button className="btn">View details</button>
        )}
      </div>
    </li>
  );
};

export default EventItem;
