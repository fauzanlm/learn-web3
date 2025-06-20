const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamps, data, previousHash = ''){
        this.index = index;
        this.timestamps = timestamps;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamps + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) != Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
            // console.log(this.nonce);
        }

        console.log(this.hash);
        
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, "2025-01-01", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index - 1];
            
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let fauzanCoin = new Blockchain();

console.log("Mining block 1...");
fauzanCoin.addNewBlock(new Block(1, "2025-01-02", {amount : 10}));

console.log("Mining block 1...");
fauzanCoin.addNewBlock(new Block(2, "2025-01-03", {amount : 13}));

// console.log(JSON.stringify(fauzanCoin, "", 4));

// console.log(fauzanCoin.isChainValid());

// fauzanCoin.chain[1].data = {amount:5};

// console.log(fauzanCoin.isChainValid());