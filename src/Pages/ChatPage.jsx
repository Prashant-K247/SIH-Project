import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatInterface from "../components/ChatInterface";

const ChatPage = () => {
  const { contactId } = useParams();
  const location = useLocation();
  const [contact, setContact] = useState(location.state?.contact || null);

  useEffect(() => {
    // Fallback: fetch contact if we don't already have it from state
    if (!contact) {
      const fetchContact = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/comms/contacts/getOne/${contactId}`
          );

          console.log(data);
          const contact = data.contact.fin
          setContact(data.contact);
        } catch (err) {
          console.error("Failed to fetch contact:", err);
        }
      };

      fetchContact();
    }
  }, [contact, contactId]);

  if (!contact) {
    return <p>Loading chat...</p>;
  }

  return <ChatInterface contact={contact} />;
}

export default ChatPage
