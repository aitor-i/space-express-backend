import crypto from 'crypto';

export async function passwordHasher(text: string): Promise<string> {
  // create a new SHA-256 hashing object
  const hash = crypto.createHash('sha256');
  hash.update(text, 'utf8');

  // calculate the hexadecimal hash
  const hashHex = hash.digest('hex');

  return hashHex;
}

