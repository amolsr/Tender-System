//import web3
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545', null, {});   //set ethereum node RPC

//setup contract object
const HashGeneratorJson = require("./contracts/HashGenerator.json");
// const hgChainId = Object.keys(HashGeneratorJson.networks)[0];
const TenderJson = require("./contracts/Tender.json");  //set ABI output from truffle
// const tChainId = Object.keys(TenderJson.networks)[0]; //picks the first deployed network
                                                            //make sure this is the right deployed network
const HashGenerator = new web3.eth.Contract(HashGeneratorJson.abi, "0x784f72AA2775a7CEEBF1Fb37BAaa75Db8269321b"); // Copy address of contract deployed on remix and replace this address
// const Tender = new web3.eth.Contract(TenderJson.abi, TenderJson.networks[tChainId].address);
const Tender = new web3.eth.Contract(TenderJson.abi, "0xC656CAd7fa22cAa4C3B09066a99fcBa62aa308bd"); // Copy address of contract deployed on remix and replace this address


export async function getAllAccounts() {
  return web3.eth.getAccounts();
};

export async function hasBeenChecked() {
  try {
    return Tender.methods.hasBeenChecked().call();
  } catch(err) {
    throw err;
  }
};

export async function isOwner(address) {
  try {
    return Tender.methods.isOwner(address).call();
  } catch(err) {
    throw err;
  }
};

export async function hasWinner() {
  try {
    return Tender.methods.hasWinner().call();
  } catch(err) {
    throw err;
  }
};

export async function getHash(nonce, amount) {
  try {
    return HashGenerator.methods.generateHash(nonce, amount).call();
  } catch(err) {
    throw err;
  }
};

export async function getPhase() {
  try {
    return Tender.methods.getPhase().call();
  } catch(err) {
    throw err;
  }
};

export async function submitHashedBid(account, hash, depositInEth) {
  try {
    let bidBefore = await Tender.methods.hasBidBefore(account).call();
    if (bidBefore) {
      let action = Tender.methods.makeBid(hash).send({from: account});
      return true;
    } else {
      let action = Tender.methods.makeBid(hash).send({from: account, value: (depositInEth * Math.pow(10, 18))});
      return true;
    }
  } catch(err) {
    return false;
  }
};

export async function revealBid(account, nonce, amount) {
  try {
    let action = await Tender.methods.revealBid(nonce, amount).send({from: account, gas: "200000"});
    return true;
  } catch(err) {
    return false;
  }
};

export async function endRevelation(account) {
  try {
    let action = await Tender.methods.endRevelation().send({from: account});
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
};

export async function closeContract(account) {
  try {
    let action = await Tender.methods.close().send({from: account});
    return true;
  } catch(err) {
    return false;
  }
};

export async function reopenTender(account, desc, biddingDuration, revelationDuration, depositAmount) {
  try {
    let action = await Tender.methods.reopenTender(desc, biddingDuration, revelationDuration,depositAmount).send({from: account});
    return true;
  } catch(err) {
    return false;
  }
};

export async function getProjectDetails() {
  try {
    return Tender.methods.getProjectDetails().call();
  } catch(err) {
    throw err;
  }
};

export async function getResult() {
  try {
    return Tender.methods.getResults().call();
  } catch(err) {
    throw err;
  }
};
