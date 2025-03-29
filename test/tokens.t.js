const tokens = require("../helpers/tokens");
const fn = require("../helpers/functions");

const testNetwork = "geni";
const testToken = "0x7036124464A2d2447516309169322c8498ac51e3";
const testTokenList = [
  "0x7036124464A2d2447516309169322c8498ac51e3",
  "0xE7FF84Df24A9a252B6E8A5BB093aC52B1d8bEEdf"
];

async function run() {
  console.log(">>> getTokenInfo");
  const info = await tokens.getTokenInfo(testNetwork, testToken);
  console.log(info);

  console.log("\n>>> getTokensInfo");
  const infos = await tokens.getTokensInfo(testNetwork, testTokenList);
  console.log(infos);
}

run().catch(console.error);