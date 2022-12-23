// const USDToken = artifacts.require("./USDToken.sol");
const KeyGame = artifacts.require("./KeyGame.sol");

module.exports = function(deployer) {
  // deployer.deploy(USDToken);
  deployer.deploy(KeyGame);
};
