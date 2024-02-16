import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { fantomTestnet } from 'viem/chains'
import { wagmiAbi } from './abi';
import { setTimeout } from "timers/promises";

// for testing only - PK should be imported from .env
const account = privateKeyToAccount('0x1234')

const client = createWalletClient({
  account,
  chain: fantomTestnet,
  transport: http()
})

let gameIdCount = 0;

async function createGame() {
  var createGame = await client.writeContract({
    address: '0xcF3f4bbFEf57f6fc2b347C9b62798d84ef93c1D2',
    abi: wagmiAbi,
    functionName: 'createGame',
    account,
  })
  gameIdCount++;
  console.log("========= GAME CREATED ==========")
  console.log("=== GameId: ", gameIdCount, " ===");
  console.log("=== TXN HASH: ", createGame, " ==");
  console.log("=================================");
};

createGame();

// this is a placeholder for fetching the AI rating
const aiRating = Math.floor(Math.random() * 100) + 1;

async function endGame() {
  await setTimeout(600000); // wait 10 minutes
  console.log("========== ENDING GAME ==========");
  console.log("=== GameId: ", gameIdCount, " ===");
  var endGame = await client.writeContract({
    address: '0xcF3f4bbFEf57f6fc2b347C9b62798d84ef93c1D2',
    abi: wagmiAbi,
    functionName: 'endGame',
    account,
    args: [gameIdCount, aiRating] // ends the game just created above
  })
  console.log("=== TXN HASH: ", endGame, " =====");
  console.log("=================================");
};

endGame();