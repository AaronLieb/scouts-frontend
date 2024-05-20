export type Player = {
  side: number
  name: string,
  avatar?: string
}

export type Lobby = {
  id: string,
}

export type Turn = {
  player?: number
}

export type Piece = {
  player?: number, // same as Player.side
  type?: string
  selected: boolean
}

export enum GameState {
  Menu = 0,
  InGame = 1,
}

