// import React, { useState, useEffect } from 'react';
// import { Box, Flex} from '@chakra-ui/react';
// import ScoreCard from './ScoreCard'; // Adjust the import path if necessary
// import EvaluationTable from './EvaluationTable'; // Adjust the import path if necessary

// const DashboardWindow = () => {
//   const [privacy, setPrivacy] = useState(70);
//   const [transparency, setTransparency] = useState(84);
//   const [fairness, setFairness] = useState(30);
//   const [evaluationData, setEvaluationData] = useState([
//   ]);

//   const getData = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/vendor-intake/v1/vendor?userid=${localStorage.getItem("userid")}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (response.ok) {
        
//         const responseData = await response.json();
//         console.log(responseData)
//         setPrivacy(responseData.Privacy)
//         setTransparency(responseData.Transparency)
//         setFairness(responseData.Fairness)
//         responseData.data.map((value) => {
//           console.log(evaluationData)
//             setEvaluationData([...evaluationData, {
//               vendorName: value.vandor_name,
//               privacy: value.privacy_score,
//               transparency: value.transparency_score,
//               fairness: value.fairness_score,
//               publicTrust: value.public_trust,
//               website: value.website,
//             }])
//         })
  
//       } else {
        
//         // navigate(`/chat`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);


//   return (
//     <Flex p={5} justify={'center'} alignItems={'center'} flexDirection={'column'}>
//       <Box width={'50vw'}>
//         <ScoreCard privacy={privacy} transparency={transparency} fairness={fairness} />
//       </Box>
//       <Box w={'80vw'}>
//       <EvaluationTable data={evaluationData} />
//       </Box>
//     </Flex>
//   );
// };

// export default DashboardWindow;

import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ScoreCard from './ScoreCard'; // Adjust the import path if necessary
import EvaluationTable from './EvaluationTable'; // Adjust the import path if necessary

const DashboardWindow = () => {
  const [privacy, setPrivacy] = useState(70);
  const [transparency, setTransparency] = useState(84);
  const [fairness, setFairness] = useState(30);
  const [evaluationData, setEvaluationData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/vendor-intake/v1/vendor?userid=${localStorage.getItem('userid')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setPrivacy(Math.round(responseData.Privacy));
        setTransparency(Math.round(responseData.Transparency));
        setFairness(Math.round(responseData.Fairness));

        const formattedData = responseData.data.map((value) => ({
          vendorName: value.vendor_name,
          privacy: value.privacy_score,
          privacy_summary: value.privacy_summary,
          transparency: value.transparency_score,
          transparency_summary: value.transparency_summary,
          fairness_summary: value.fairness_summary,
          fairness: value.fairness_score,
          publicTrust: value.public_trust,
          publicTrust_summary: value.public_trust_summary,
          website: value.website,
          toolUsecase: value.tool_usecase,

        }));
        setEvaluationData(formattedData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Flex p={5} justify={'center'} alignItems={'center'} flexDirection={'column'}>
      <Box width={'50vw'}>
        <ScoreCard privacy={privacy} transparency={transparency} fairness={fairness} />
      </Box>
      <Box w={'80vw'} mt={5}>
        <EvaluationTable data={evaluationData} />
      </Box>
    </Flex>
  );
};

export default DashboardWindow;