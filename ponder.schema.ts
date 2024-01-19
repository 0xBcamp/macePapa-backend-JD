import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Game: p.createTable({
    id: p.string(),
    status: p.boolean(),
    cost: p.bigint(),
    prizePool: p.bigint(),
    // players: p.many("Player.address"),
    createTimestamp: p.bigint(),
    expireTimestamp: p.bigint(),
    nonce: p.bigint().references("Player.id"),
  }),
  Player: p.createTable({
    id: p.string(),
    address: p.string().references("Game.id"),
    // gamesHistory: p.many("Game.nonce"),
    gamesWon: p.bigint(),
    gamesLost: p.bigint(),
    winnings: p.bigint(),
  }),
}));
