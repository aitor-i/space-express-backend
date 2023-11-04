import Token from '../../domain/token/token';

export function getEmailFromToken(tokenToValidate: string) {
    const token = new Token();
    return token.getUser(tokenToValidate);
}
