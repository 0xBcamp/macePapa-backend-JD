import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { fantomTestnet } from 'viem/chains'
import { wagmiAbi } from './abi';

// for testing only - PK should be imported from .env
const account = privateKeyToAccount('0x1234')

const client = createWalletClient({
  account,
  chain: fantomTestnet,
  transport: http()
})

// const aiRating = Math.floor(Math.random() * 100) + 1;

async function main() {
  console.log("=== ENDING GAME ===");
  var endGame = await client.writeContract({
    address: '0xcF3f4bbFEf57f6fc2b347C9b62798d84ef93c1D2',
    abi: wagmiAbi,
    functionName: 'endGame',
    account,
    args: [1, 42]
  })
  console.log("TXN HASH: ", endGame);
};

main();