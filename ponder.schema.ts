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
    nonce: p.string().references("Player.id"),
    gamePlayer: p.many("GamePlayer.gameId"),
    winners: p.string().list(), // winners is an array of addresses, store in list of strings?
    aiRating: p.bigint(),
  }),
  Player: p.createTable({
    id: p.string(),
    // address: p.string().references("Game.id"),
    // gamesHistory: p.many("Game.nonce"),
    // playerRating: p.bigint(),
    // token: p.string(),
    // gameId: p.bigint(),
    gamePlayer: p.many("GamePlayer.playerId"),
  }),
  GamePlayer: p.createTable({
    id: p.string(),
    gameId: p.string().references("Game.id"),
    playerId: p.string().references("Player.id"),
    game: p.one("gameId"),
    person: p.one("playerId"),
    playerRating: p.bigint(),
    token: p.string(),
  })
}));