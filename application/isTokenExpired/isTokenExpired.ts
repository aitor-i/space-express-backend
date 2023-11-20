import Token from '../../domain/token/token';

export function isTokenExpired(tokenToValidate: string) {
    try {
        const token = new Token();
        return token.isExpired(tokenToValidate);
    } catch {
        return true;
    }
}
