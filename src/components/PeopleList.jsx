// src/components/contacts/PeopleList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonCard from "./PeopleCard";

export default function PeopleList() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/comms/contacts/people`,
          { withCredentials: true }
        );
        setPeople(data);
      } catch (err) {
        console.error("Error fetching people:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const handleAddContact = async (personId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/comms/contacts/add`,
        { contactId: personId },
        { withCredentials: true }
      );
      alert("Contact added successfully!");
    } catch (err) {
      console.error("Error adding contact:", err);
      alert("Failed to add contact");
    }
  };

  if (loading) return <p>Loading people...</p>;

  return (
    <div className="flex flex-col space-y-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Available People</h2>
      {people.length === 0 ? (
        <p>No people found</p>
      ) : (
        people.map((person) => (
          <PersonCard
            key={person._id}
            person={person}
            onAddContact={handleAddContact}
          />
        ))
      )}
    </div>
  );
}
