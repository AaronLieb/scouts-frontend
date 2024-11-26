import type { Game } from "#lib/types"
import type { MoveMadeEvent, PlayerJoinedEvent, TurnBeginEvent } from "./events";

const API_URL = 'http://localhost:8080/api/v1'

export let lobby: Game;
export let authToken: string;

export function setLobby(lobbyId: string) {
  lobby = { id: lobbyId }
}

export function setAuthToken(token: string) {
  authToken = token
}

export async function createNewGame() {
  return await fetch(`${API_URL}/game`, {
    method: 'POST',
    headers: {
      'Authorization': authToken
    },
    body: JSON.stringify({
      'time_limit': '60s',
      'increment': '10s'
    }),
    credentials: 'include'
  }).then(res => res.json())
}

export async function joinGame(joinCode: string) {
  await fetch(`${API_URL}/game/${joinCode}/join`, {
    method: 'POST',
    headers: {
      'Authorization': authToken
    },
    credentials: 'include'
  })
}

export async function makeMove(move: string) {
  return await fetch(`${API_URL}/game/${lobby.id}/move`, {
    method: 'POST',
    headers: {
      'Authorization': authToken
    },
    body: JSON.stringify({
      'move': move
    }),
    credentials: 'include'
  })
}

export async function subscribe(
  onPlayerJoin: ((_: PlayerJoinedEvent) => void),
  onTurnBegin: ((_: TurnBeginEvent) => void),
  onMoveMade: ((_: MoveMadeEvent) => void)
) {
  const eventSource = new EventSource(`http://localhost:8080/api/v1/game/${lobby.id}/subscribe`)

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
