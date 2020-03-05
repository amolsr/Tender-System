var Tender = artifacts.require("Tender");
var HashGenerator = artifacts.require("HashGenerator");
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');


module.exports = function(deployer) {
  let accounts = web3.eth.getAccounts();
  let owner = accounts[0];

  deployer.deploy(HashGenerator);
  deployer.deploy(Tender, 'Food', 5, 1, 50);
};
