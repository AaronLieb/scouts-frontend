import type { Player, Move } from "scouts-wasm";

export type PlayerJoinedEvent = {
  player_side: Player,
  user_id: number
}

export type PlayerLeftEvent = {
  player_side: Player
  user_id: number
}

export type PlayerConnectedEvent = {
  player_side: Player
}

export type PlayerDisconnectedEvent = {
  player_side: Player
}

export type TurnBeginEvent = {
  player_side: Player
  plays_remaining: number
  time_remaining: string[2]
}

export type MoveMadeEvent = {
  move: Move,
  player_side: Player,
  plays_remaining: number,
  time_remaining: string[2]
}

export type GameEndEvent = {
  winner: Player,
  time_remaining: string[2]
}

export type GoingAwayEvent = {}
