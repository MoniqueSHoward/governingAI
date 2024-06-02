import { ChakraProvider } from "@chakra-ui/react";

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from "./Router";
import { IdProvider } from './components/Idprovider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <IdProvider>

  <ChakraProvider>
    <AppRouter />
  </ChakraProvider>
  </IdProvider>
);

