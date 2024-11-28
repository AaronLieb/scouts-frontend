import type { MoveMadeEvent, PlayerJoinedEvent, TurnBeginEvent } from "./events";
import type { Move } from "scouts-wasm";

const API_URL = 'http://localhost:8080/api/v1'

type CreateGameResponse = {
  game_id: string
}

export async function createNewGame(): Promise<CreateGameResponse> {
  return fetch(`${API_URL}/game`, {
    method: 'POST',
    body: JSON.stringify({
      'time_limit': '60s',
      'increment': '10s'
    }),
    credentials: 'include'
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res)
    }
    return res.json()
  })
}

type PlayerInfo = {
  user_id: string
}

type GameMetadata = {
  time_limit: string
  increment: string
}

type GameInfoResponse = {
  game_id: string
  began_at: string
  player_a: PlayerInfo
  player_b: PlayerInfo
  moves: Move[]
  metadata: GameMetadata
  created_at: string
  snapshot_at: string
}

export async function gameInfo(gameId: string): Promise<GameInfoResponse> {
  return fetch(`${API_URL}/game/${gameId}/`, {
    method: 'GET',
    credentials: 'include'
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res)
    }
    return res.json()
  })
}

export async function joinGame(joinCode: string) {
  await fetch(`${API_URL}/game/${joinCode}/join`, {
    method: 'POST',
    credentials: 'include'
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res)
    }
  })
}

export async function makeMove(gameId: string, move: string) {
  return await fetch(`${API_URL}/game/${gameId}/move`, {
    method: 'POST',
    body: JSON.stringify({
      'move': move
    }),
    credentials: 'include'
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res)
    }
  })
}

export async function subscribe(
  gameId: string,
  onPlayerJoin: (ev: PlayerJoinedEvent) => void,
  onTurnBegin: (ev: TurnBeginEvent) => void,
  onMoveMade: (ev: MoveMadeEvent) => void
) {
  const eventSource = new EventSource(`http://localhost:8080/api/v1/game/${gameId}/subscribe`)

  eventSource.addEventListener('player_joined', (ev: MessageEvent) => {
    const data = JSON.parse(ev.data) as PlayerJoinedEvent
    onPlayerJoin(data)
  })

  eventSource.addEventListener('turn_begin', (ev: MessageEvent) => {
    const data = JSON.parse(ev.data) as TurnBeginEvent
    onTurnBegin(data)
  })

  eventSource.addEventListener('move_made', (ev: MessageEvent) => {
    const data = JSON.parse(ev.data) as MoveMadeEvent
    onMoveMade(data)
  })

  eventSource.onerror = (ev: Event) => {
    console.log("ERROR", ev)
  }
}
