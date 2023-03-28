import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

//generate the new jwt token
export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(
    config.get<string>('accessTokenPrivateKey'),
    'base64'
  ).toString('ascii');

  const token = jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });

  return token;
};
//check jwt token status.
//When is null or invalid the token is expired or invalid.
export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>('accessTokenPublicKey'),
      'base64'
    ).toString('ascii');
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as T;
  } catch (error) {
    return null;
  }
};


