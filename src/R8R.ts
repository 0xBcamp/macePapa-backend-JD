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
    // create: {
      
    // },
    // update: {

    // }
  });

  // Update or Create/Insert GamePlayer 'join table'
  // as per https://ponder.sh/docs/guides/design-your-schema#many-to-many
  //
  // *** GOOD NEWS: This is working... when a player joins a game their address, token, and playerRating are being indexed and added to the DB
  //
  // *** BAD NEWS: When a player then joins A DIFFERENT game it adds them into the game they've joined and REMOVES their DB entry from their current game
  // *** ...so it's as if a player can only join one game at any time, whereas it should add them into BOTH game 1 and game 2
  // *** ...solution? I'm guessing this is something to do with the many-to-many relationship? Have I inadvertently set it as one-to-many??

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

// ponder.on("R8R:PlayerJoinedGame", async ({ event, context }) => {
//   const { Player } = context.db;
//   const { block, args } = event;

//   await Player.create({
//     id: BigInt(args.player),
//     data: {
//       address: args.player,
//       playerRating: args.playerRating,
//       token: args.token,
//       gameId: args.gameId
//     },
//   });
// });