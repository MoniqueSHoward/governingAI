// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
// import Markdown from 'react-markdown';

// const ChatWindow = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isSending, setIsSending] = useState(false);
//   const ws = useRef(null);
  

//   const getData = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/auth/v1/me?userid=${localStorage.getItem("userid")}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (response.ok) {
//         localStorage.setItem("isProfile", 0)
//         const responseData = await response.json();
//         responseData.userinfo.map((key, val) => {
//           if (val === null){
//               localStorage.setItem("isProfile", 1)
  
//           }
//         })
//         console.log(responseData)
        
  
//       } else {
        
//         // navigate(`/chat`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };


//   const getMessages = async (userId, isProfile) => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/chat/v1/message", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ "userid":userId,"isProfile":isProfile }),
//       });
  
//       if (response.ok) {
//         // console.error("sent successfully",name,website);
//         const responseData = await response.json();
//         responseData.map((message)=>{
          
//           setMessages((prevMessages) => [...prevMessages, { role: message.isuser?"user":'system',"message": message.message }]);
//         })
//       } else {
//         console.error("Failed to send user information to the API");
//         // navigate(`/chat`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     // const queryParams = new URLSearchParams(location.search);
//     // const userId = queryParams.get('userid');
//     // const isProfile = queryParams.get('isProfile');

//     getData();


//     const userId = localStorage.getItem("userid");



//     const isProfile = localStorage.getItem("isProfile");
//     ws.current = new WebSocket(`ws://127.0.0.1:8000/chat/v1/message?userid=${userId}&isProfile=${isProfile}`);
//     getMessages(userId, isProfile);
//     ws.current.onopen = () => {
//       console.log('WebSocket Client Connected');

//     };

//     ws.current.onmessage = (event) => {

//       // const data = JSON.parse(event.data);t
//       setMessages((prevMessages) => [...prevMessages, { role: 'system',"message": event.data }]);
//       setIsSending(false); // Enable the send button after receiving a response
//     };

//     ws.current.onclose = () => {
//       console.log('WebSocket Client Disconnected');
//     };

//     return () => {
//       ws.current.close();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       const userMessage = { role: 'user', message };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       ws.current.send(message);
//       setMessage('');
//       setIsSending(true); // Disable the send button while waiting for a response
//     }
//   };

//   return (
//     <Box p={2} w="80vw" mx="auto">
//       <VStack spacing={4} height={'95vh'} align="stretch">
//         <Box border="1px solid"  borderColor="gray.200" borderRadius="md" p={4} minH="400px" overflowY="auto">
//           {messages.map((msg, index) => (
//             <HStack key={index} justify={msg.role === 'user' ? 'flex-start' : 'flex-end'}>
//               <Box
//                 bg={msg.role === 'user' ? 'blue.100' : 'green.100'}
//                 borderRadius="md"
//                 pt={2}
//                 pb={2}
//                 pl={7}
//                 pr={7}
//                 mb={5}
//                 maxW="80%"
//                 minW="10%"
//               >
//                 <Text>
//                   <Markdown>
//                   {msg.message}
//                   </Markdown>
//                   </Text>
//               </Box>
//             </HStack>
//           ))}
//         </Box>
//         <HStack>
//           <Input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <Button onClick={handleSendMessage} isDisabled={isSending || !message.trim()}>
//             Send
//           </Button>
//         </HStack>
//       </VStack>
//     </Box>
//   );
// };

// export default ChatWindow;

import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Spinner } from '@chakra-ui/react';
import Markdown from 'react-markdown';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isResponding, setIsResponding] = useState(false); // State for showing loading icon
  const ws = useRef(null);
  const messagesEndRef = useRef(null); // Ref for the end of the message list

  const getData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/v1/me?userid=${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        localStorage.setItem("isProfile", 0);
        const responseData = await response.json();
        responseData.userinfo.map((key, val) => {
          if (val === null) {
            localStorage.setItem("isProfile", 1);
          }
        });
        console.log(responseData);
      } else {
        // Handle error
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
        body: JSON.stringify({ "userid": userId, "isProfile": isProfile }),
      });
      if (response.ok) {
        const responseData = await response.json();
        responseData.forEach((message) => {
          setMessages((prevMessages) => [...prevMessages, { role: message.isuser ? "user" : 'system', "message": message.message }]);
        });
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
      setMessages((prevMessages) => [...prevMessages, { role: 'system', "message": event.data }]);
      setIsSending(false); // Enable the send button after receiving a response
      setIsResponding(false); // Hide loading icon after receiving the response
    };
    ws.current.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };
    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
  }, [messages]); // Triggered whenever messages state changes

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = { role: 'user', message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      ws.current.send(message);
      setMessage('');
      setIsSending(true); // Disable the send button while waiting for a response
      setIsResponding(true); // Show loading icon while waiting for the response
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box p={2} w="80vw" mx="auto">
      <VStack spacing={4} height={'95vh'} align="stretch">
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4} minH="400px" overflowY="auto">
          {messages.map((msg, index) => (
            <HStack key={index} justify={msg.role === 'user' ? 'flex-start' : 'flex-end'}>
              <Box
                bg={msg.role === 'user' ? 'blue.100' : 'green.100'}
                borderRadius="md"
                pt={2}
                pb={2}
                pl={7}
                pr={7}
                mb={5}
                maxW="80%"
                minW="10%"
              >
                <Text>
                  <Markdown>{msg.message}</Markdown>
                </Text>
              </Box>
            </HStack>
          ))}
          {isResponding && (
            <HStack justify='flex-end'>
              <Box bg='green.100' borderRadius="md" pt={2} pb={2} pl={7} pr={7} mb={5} maxW="80%" minW="10%" display="flex" alignItems="center">
                <Text>GoverningAI is responding...</Text>
                <Spinner size="sm" ml={2} />
              </Box>
            </HStack>
          )}
          <div ref={messagesEndRef} />
        </Box>
        <HStack>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={handleKeyDown} // Trigger send on Enter
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