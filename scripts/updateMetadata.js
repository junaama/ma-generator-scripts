//const fetch = require('node-fetch');
import fetch from 'node-fetch'
// Update Contract Address Here
const OPENSEA_URI = 'https://api.opensea.io/asset/0x027DB5D422A898E342bC0Af63Fba8C5Eeb437A8E'; 

// Maximum Tokens Belonging to Contract
const MAX_TOKENS = 10000;

function refreshData(tokenId) {
    const URI = `${OPENSEA_URI}/${tokenId}/?force_update=true`;
    const OPTIONS = {method: 'GET'};

    fetch(URI, OPTIONS)
    .then(res => res.json())
    .then(json =>  {
        if(json.detail) {
            console.log(`failed: ${tokenId}`);
        } else if(json.token_id) {
            console.log(`success: ${tokenId}`);
        }
    })
    .catch(err => console.error(`failed: ${tokenId}`));
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
