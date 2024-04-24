import { createThirdwebClient, defineChain, getContract } from "thirdweb";
 
const CLIENT_ID= process.env.NEXT_PUBLIC_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: CLIENT_ID as string,
});

export const deploymentChain = defineChain(84532);

const contractAddress="0x000913a098c702feF001Be4E186f80AA15CD1b3e"

const contractABI=[
  {
    "type": "fallback",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "balances",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "deposit",
    "inputs": [
      {
        "type": "address",
        "name": "_receiver",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getBalance",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_receiver",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  }
] as const

export const CONTRACT = getContract({
  client: client,
  chain: deploymentChain,
  address: contractAddress,
  abi: contractABI,
});

