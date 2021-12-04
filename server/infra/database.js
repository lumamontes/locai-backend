import { refreshTokensStore, UserStore } from "./types";
import {v4 as uuid} from 'uuid';


export function createRefreshToken(email){
  const currentUserTokens = token.get(email)??[]
  const refreshToken = uuid();

  tokens.set(emai, [...currentUserTokens, refreshToken])

  return refreshToken;
}
export function checkRefreshTokenIsValid(email,refreshToken){
  const storedRefreshTokens = tokens.get(email)??[]

  return storedRefreshTokens.some(token => token == refreshToken)
}

export function invalidateRefreshToken(email, refreshToken) {
  const storedRefreshTokens = tokens.get(email) ?? []

  tokens.set(email, storedRefreshTokens.filter(token => token !== refreshToken));
}