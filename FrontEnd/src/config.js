require('dotenv').config();

const config = {
  backendHost: process.env.REACT_BACKEND_HOST || "http://localhost:5000",
};

export default config;