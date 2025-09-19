import React from "react";

export default function PersonCard({ person, onAddContact }) {
  return (
    <div
      onClick={() => onAddContact(person._id)}
      className="cursor-pointer p-4 bg-white rounded-lg shadow transition-shadow duration-150 ease-in-out flex items-center justify-between hover:shadow-md"
    >
      <div>
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <p className="text-sm text-gray-600">{person.email}</p>
        <span className="text-xs text-blue-500">{person.role}</span>
      </div>
      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
        Add
      </button>
    </div>
  );
}
