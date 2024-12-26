import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);


  // State to store fetched conversations
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {

        // Fetch data from the API endpoint
        const res = await fetch("/api/users");
        const data = await res.json();

        // If an error occurs, throw an exception
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Update the conversations state with the fetched data
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);
  return { loading, conversations };
}

export default useGetConversations;