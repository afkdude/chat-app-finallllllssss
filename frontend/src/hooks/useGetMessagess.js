import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


//to fetch all the messages  
const useGetMessagess = () => {
  const [loading, setloading] = useState(); 

  const { messages, setMessages, selectedConversation, setSelectedConversation } = useConversation(); 
  
 
  useEffect(() => {
    const getMessages = async () => {

      setloading(true);
      try {

        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }



        setMessages(data);




      } catch (error) {

        toast.error(error.message);

      } finally {
        setloading(false);
      }
    }

    if (selectedConversation?._id) getMessages();

  }, [selectedConversation?._id, setMessages]); 

  return { messages, loading }; 
}

export default useGetMessagess