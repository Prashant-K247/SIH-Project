import React from "react";
import "./PeopleCard.css";

export default function PersonCard({ person, onAddContact }) {
  return (
    <div
      onClick={() => onAddContact(person._id)}
      className="person-card"
    >
      <div className="person-info">
        <h3 className="person-info h3">{person.name}</h3>
        <p className="person-info p">{person.email}</p>
        <span className="person-info span">{person.role}</span>
      </div>
      <button
        className="add-button"
      >
        Add
      </button>
    </div>
  );
}