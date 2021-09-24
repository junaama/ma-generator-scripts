import fetch from 'node-fetch'
import feat from './features.js';

const MAX_TOKENS = 10000;

function refreshData(num) {
    let ipfsHash = feat[parseInt(num)].imageIPFS
    const URI = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    // const URI = `https://infura-ipfs.io/ipfs/${ipfsHash}`
    const OPTIONS = {method: 'GET'};

    fetch(URI, OPTIONS)
    .then(res => {
        res.json() 
        console.log('RES: ', res)
    })
    .then(json =>  {
        if(json.detail) {
            console.log(`failed: ${ipfsHash}`, URI);
        } else if(json.token_id) {
            console.log(`success: ${ipfsHash}`);
        }
    })
    .catch(err => console.error(`failed: ${ipfsHash}`, URI));
};


const refreshTokens = (start, end) => {
    Array.from({length: end - start + 1}, (x, i) => start + i).forEach((tokenId) => {    
        refreshData(tokenId);
    });   
}

let start = 0;
let end = 1;

const id = setInterval(() => { 
    refreshTokens(start, end);
    if(end > MAX_TOKENS) clearInterval(id);
    start = end + 1;
    end = start + 1;
},2000);
