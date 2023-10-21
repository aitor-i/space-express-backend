import Token from "../../domain/token/token";

export function generateToken(email: string) {
  const token = new Token();
  token.generateToken(email);
  return token.getToken();
}
