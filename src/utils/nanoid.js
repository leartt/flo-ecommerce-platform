const { customAlphabet } = require("nanoid");

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const nanoid = customAlphabet(alphabet, 12);

module.exports = nanoid;
