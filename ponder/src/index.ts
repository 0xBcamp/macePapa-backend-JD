import { ponder } from "@/generated";

ponder.on("R8R:GameCreated", async ({ event, context }) => {
  const { Game } = context.db;
  const { block, args } = event;

  const gamesByNewest = await Game.findMany({
    orderBy: {
      id: "desc",
    },
  });
  const newGameCount =
    gamesByNewest[0] && gamesByNewest[0].nonce
      ? gamesByNewest[0].nonce + BigInt(1)
      : 1n;

  await Game.create({
    id: newGameCount.toString(),
    data: {
      status: true,
      cost: args.cost,
      prizePool: 0n,
      createTimestamp: block.timestamp,
      expireTimestamp: args.expireTimestamp,
      nonce: newGameCount,
    },
  });
  // Player on join game()
});
