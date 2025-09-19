import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id; // safe access

  useEffect(() => {
    if (!userId) {
      console.log("User not authenticated or ID not available.");
      return;
    }

    const fetchContacts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/comms/contacts/${userId}`
        );
        setContacts(data.contacts || []);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };

    fetchContacts();
  }, [userId]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Your Contacts</h2>
      {contacts.map((c) => (
        <ContactCard key={c._id} contact={c} />
      ))}
    </div>
  );
}
