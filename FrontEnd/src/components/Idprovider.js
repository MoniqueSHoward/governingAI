// UniversalContext.js
import React, { createContext, useState } from 'react';

const UniversalContext = createContext();

const IdProvider = ({ children }) => {
  const [universalVariable, setUniversalVariable] = useState([0,0]);

  return (
    <UniversalContext.Provider value={{ universalVariable, setUniversalVariable }}>
      {children}
    </UniversalContext.Provider>
  );
};

export { UniversalContext, IdProvider };
