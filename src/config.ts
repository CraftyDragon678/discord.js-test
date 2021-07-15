import dotenv from "dotenv";

dotenv.config();

const config = {
  token: process.env.TOKEN!!,
};

const fatal = (message: string, code = -1) => {
  console.error(message);
  process.exit(code);
};

if (!config.token) fatal("TOKEN is not provided");

export default config;
