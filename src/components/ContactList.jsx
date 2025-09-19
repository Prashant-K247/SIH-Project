import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";
import "./ContactList.css"; // Import the CSS file

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  // Use optional chaining to safely get the user ID
  const userId = user?.id; 

  useEffect(() => {
    // Check if userId exists before making the API call
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
    <div className="contact-list-container">
      <h2 className="contact-list-title">Your Contacts</h2>
      {contacts.map((c) => {
        console.log(c);
        
        return <ContactCard key={c._id} contact={c} />
      })}
    </div>
  );
}