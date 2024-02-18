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
    gamesByNewest.items[0] && gamesByNewest.items[0]?.nonce
      ? gamesByNewest.items[0]?.nonce + BigInt(1)
      : 1n;

  await Game.create({
    // id: newGameCount.toString(),
    id: args.gameId.toString(),
    data: {
      status: true,
      cost: args.gameEntryFee,
      prizePool: args.prizePool,
      createTimestamp: block.timestamp,
      expireTimestamp: args.endTimestamp,
      nonce: newGameCount.toString(),
      winners: [],
      aiRating: BigInt(0),
    },
  });
});

ponder.on("R8R:PlayerJoinedGame", async ({ event, context }) => {
  const { Player, GamePlayer } = context.db;
  const { block, args } = event;

  // Create Player if they don't exist
  // (the Player object has been stripped back to just their id/address)
  // ...I think the 'link' between Games-Players/Players-Games is done by the 'join table', see next 'await' below
  await Player.upsert({
    id: args.player.toString(),
  });

  await GamePlayer.upsert({
    id: args.player.toString(),
    create: {
      gameId: args.gameId.toString(),
      playerRating: args.playerRating,
      token: args.token,
      playerId: args.player

    },
    update: {
        gameId: args.gameId.toString(),
        playerRating: args.playerRating,
        token: args.token,
        playerId: args.player
    }
  })
});

ponder.on("R8R:GameEnded", async ({ event, context }) => {
  const { Game } = context.db;
  const { block, args } = event;

  let winnersArray: Array<string> = [];
  // for(var i = 0; i < args.winners.length; i++) {
  //   let winner = args.winners[i];
  //   winnersArray.push(winner!);
  // }

  winnersArray.push(args.winners.toString());

  await Game.update({
    id: args.gameId.toString(),
    data: {
      status: false,
      winners: winnersArray,
      aiRating: BigInt(args.aiRating)
    },
  });
});