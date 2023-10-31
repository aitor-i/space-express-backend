import Token from '../../domain/token/token';

export function isTokenExpired(tokenToValidate: string) {
    const token = new Token();
    return token.isExpired(tokenToValidate);
}
