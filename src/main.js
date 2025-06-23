const { Blockchain, Transaction } = require("./blockchain");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('1864537bbf6a807f0ab4ce2c30309dfa6a95d9afc9609a1fcfecb2297e762be3');
const myWalletAddress = myKey.getPublic('hex');

let fauzanCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key other wallet", 50)
tx1.signTransaction(myKey);
fauzanCoin.addTransaction(tx1);

console.log("\nStart Mining...");
fauzanCoin.minePendingTransactions("dummyRewardAddress");

console.log("Balance Address DummyRewardAddress : ", fauzanCoin.getBalanceOfAddress("dummyRewardAddress"));
