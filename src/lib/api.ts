import type { Lobby } from "#lib/types"

const API_URL = 'http://localhost:3006/'

export let lobby: Lobby;
export let authToken: string;

async function call(endpoint: string, params: Record<string, any> = {}) {
  console.log(`[${endpoint}]`, params)
  const res = await fetch(API_URL + endpoint + "?" + new URLSearchParams(params)).then(res => res.json())
  console.log(`[${endpoint}]`, res)

  return res
}

export function setLobby(lobbyId: string) {
  lobby = { id: lobbyId }
}

export function setAuthToken(token: string) {
  authToken = token
}

export async function createNewLobby() {
  const endpoint = 'create_new_lobby'
  const res = await call(endpoint)
  return res
}

export async function joinLobby(joinCode: string, player: number) {
  const endpoint = 'join_lobby'
  const params = {
    join_code: joinCode,
    player: player,
  }
  const res = await call(endpoint, params)
  return res
}

export async function deleteLobby(joinCode: string) {
  const endpoint = 'delete_lobby'
  const params = {
    join_code: joinCode
  }
  const res = await call(endpoint, params)
  return res
}

export async function getBoard() {
  const endpoint = 'get_board'
  const params = { join_code: lobby.id }
  const res = await call(endpoint, params)
  return res
}

export async function getAvailableMoves() {
  const endpoint = 'get_available_moves'
  const params = {
    join_code: lobby.id,
    player_id: authToken
  }
  const res = await call(endpoint, params)
  return res
}

export async function placePiece(col: number) {
  const endpoint = 'place_piece'
  const params = {
    join_code: lobby.id,
    player_id: authToken,
    col: col
  }
  const res = await call(endpoint, params)
  return res
}
