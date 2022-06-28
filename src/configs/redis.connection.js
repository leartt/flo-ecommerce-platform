const { createClient } = require("redis");

/* eslint-disable */
const client = createClient({});

const connectRedis = () =>
  new Promise((resolve, reject) => {
    try {
      client.connect().then(() => {
        resolve(true);
        console.log("Connection with redis established");
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  connectRedis,
  client,
};
