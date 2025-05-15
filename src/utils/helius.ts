import { Connection } from '@solana/web3.js';

// Replace with your API key
const HELIUS_API_KEY = 'e01339e6-ab1a-43e3-b49a-b39cd17efdb8';
const HELIUS_RPC_URL = `https://rpc-devnet.helius.xyz/?api-key=${HELIUS_API_KEY}`;

// Initialize Solana connection with Helius RPC
export const connection = new Connection(HELIUS_RPC_URL, 'confirmed');

// Function to get asset by address
export async function getAssetByAddress(address: string) {
  const url = `https://api.helius.xyz/v0/token-metadata?api-key=${HELIUS_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mintAccounts: [address],
      includeOffChain: true,
      disableCache: false,
    }),
  });
  
  const data = await response.json();
  return data[0];
}

// Function to get parsed transaction
export async function getParsedTransaction(signature: string) {
  const url = `https://api.helius.xyz/v0/transactions?api-key=${HELIUS_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transactions: [signature],
    }),
  });
  
  const data = await response.json();
  return data[0];
}

// Function to get wallet portfolio
export async function getWalletPortfolio(address: string) {
  const url = `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${HELIUS_API_KEY}`;
  const response = await fetch(url);
  return await response.json();
} 