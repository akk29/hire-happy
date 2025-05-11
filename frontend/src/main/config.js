require("dotenv").config();

var config = {
  base_url: process.env.REACT_APP_backend_url,
  offset_size: "10",
};

export default config;
