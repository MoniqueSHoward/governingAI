import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import Markdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const ws = useRef(null);
  const location = useLocation(); // Get the current location object
  

  const getData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/v1/me?userid=${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        localStorage.setItem("isProfile", 0)
        const responseData = await response.json();
        responseData.userinfo.map((key, val)=>{
          if (val === null){
              localStorage.setItem("isProfile", 1)
  
          }
        })
        console.log(responseData)
        
  
      } else {
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const getMessages = async (userId, isProfile) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/chat/v1/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "userid":userId,"isProfile":isProfile }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        responseData.map((message)=>{
          
          setMessages((prevMessages) => [...prevMessages, { role: message.isuser?"user":'system',"message": message.message }]);
        })
      } else {
        console.error("Failed to send user information to the API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
   
    getData();


    const userId = localStorage.getItem("userid");



    const isProfile = localStorage.getItem("isProfile");
    ws.current = new WebSocket(`ws://127.0.0.1:8000/chat/v1/message?userid=${userId}&isProfile=${isProfile}`);
    getMessages(userId, isProfile);
    ws.current.onopen = () => {
      console.log('WebSocket Client Connected');

    };

    ws.current.onmessage = (event) => {

      setMessages((prevMessages) => [...prevMessages, { role: 'system',"message": event.data }]);
      setIsSending(false);
    };

    ws.current.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = { role: 'user', message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      ws.current.send(message);
      setMessage('');
      setIsSending(true); 
    }
  };

  return (
    <Box p={2} w="80vw" mx="auto">
      <VStack spacing={4} height={'90vh'} align="stretch">
        <Box border="1px solid"  borderColor="gray.200" borderRadius="md" p={4} minH="400px" overflowY="auto">
          {messages.map((msg, index) => (
            <HStack key={index} justify={msg.role === 'user' ? 'flex-start' : 'flex-end'}>
              <Box
                bg={msg.role === 'user' ? 'blue.100' : 'green.100'}
                borderRadius="md"
                pt={2}
                pb={2}
                pl={7}
                mb={5}
                maxW="80%"
                minW="10%"
              >
                <Text>
                  <Markdown>
                  {msg.message}
                  </Markdown>
                  </Text>
              </Box>
            </HStack>
          ))}
        </Box>
        <HStack>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button onClick={handleSendMessage} isDisabled={isSending || !message.trim()}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatWindow;
