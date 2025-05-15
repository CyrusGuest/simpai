import { getWalletPortfolio, getAssetByAddress, getParsedTransaction } from './helius';

// Common token addresses on Solana
export const TOKEN_ADDRESSES = {
  'BONK': 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK token address
  'SOL': 'So11111111111111111111111111111111111111112',    // Native SOL
  'USDC': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC token
  'RAY': '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',  // Raydium token
  'SRM': 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',   // Serum token
} as const;

export type HeliusCommandType = 'wallet' | 'token' | 'tx' | null;

interface ParsedCommand {
  type: HeliusCommandType;
  address: string;
}

export function parseHeliusCommand(message: string): ParsedCommand {
  // Convert to lowercase for easier matching
  const lowercaseMsg = message.toLowerCase();
  
  // Check for wallet commands
  if (lowercaseMsg.startsWith('/wallet ')) {
    const address = message.split(' ')[1];
    return { type: 'wallet', address };
  }
  
  // Check for token commands
  if (lowercaseMsg.startsWith('/token ')) {
    let address = message.split(' ')[1];
    // Check if the input is a known token name
    const upperAddress = address.toUpperCase();
    if (upperAddress in TOKEN_ADDRESSES) {
      address = TOKEN_ADDRESSES[upperAddress as keyof typeof TOKEN_ADDRESSES];
    }
    return { type: 'token', address };
  }
  
  // Check for transaction commands
  if (lowercaseMsg.startsWith('/tx ')) {
    const address = message.split(' ')[1];
    return { type: 'tx', address };
  }
  
  return { type: null, address: '' };
}

export async function executeHeliusCommand(command: ParsedCommand) {
  try {
    switch (command.type) {
      case 'wallet':
        const portfolio = await getWalletPortfolio(command.address);
        return {
          success: true,
          data: portfolio,
          type: 'wallet',
          message: `Wallet information for ${command.address}:`
        };
        
      case 'token':
        const token = await getAssetByAddress(command.address);
        return {
          success: true,
          data: token,
          type: 'token',
          message: `Token information for ${command.address}:`
        };
        
      case 'tx':
        const transaction = await getParsedTransaction(command.address);
        return {
          success: true,
          data: transaction,
          type: 'tx',
          message: `Transaction details for ${command.address}:`
        };
        
      default:
        return {
          success: false,
          data: null,
          type: null,
          message: 'Invalid command'
        };
    }
  } catch (error: any) {
    return {
      success: false,
      data: null,
      type: command.type,
      message: `Error executing command: ${error?.message || 'Unknown error'}`
    };
  }
}

export const HELIUS_COMMAND_HELP = `
Available Helius commands:
/wallet [address] - Get wallet portfolio and token balances
/token [address] - Get token metadata and information
/tx [signature] - Get parsed transaction details
`; 