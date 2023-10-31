/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
dotenv.config();

const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
    },
};

module.exports = nextConfig;
