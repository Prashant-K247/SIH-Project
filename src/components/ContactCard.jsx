import React from "react";
import { useNavigate } from 'react-router-dom';
import './ContactCard.css'; // ✅ Import the CSS file

export default function ContactCard({ contact }) {

  const navigate = useNavigate();

  const handleClick = () => {
    // route to the page containing chatInterface while sending the contact info
    navigate(`/chat/${contact._id}`, { state: { contact } });
  }

  return (
    <div
      className="contact-card"
      onClick={handleClick}
    >
      <h4>{contact.name}</h4>
      <p>{contact.role}</p>
    </div>
  );
}