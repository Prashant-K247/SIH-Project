import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContactCard({ contact }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${contact._id}`, { state: { contact } });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md p-4 mb-4 cursor-pointer flex flex-col items-start transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
    >
      <h4 className="text-lg font-semibold text-gray-800 m-0">{contact.name}</h4>
      <p className="text-sm text-gray-500 mt-1">{contact.role}</p>
    </div>
  );
}
