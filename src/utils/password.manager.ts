import { hash, verify } from 'argon2';

export default class PasswordManager {
  public static async hash(password: string) {
    const hashedPassword = await hash(password);
    return hashedPassword;
  }

  public static async verify(hashedPassword: string, password: string) {
    const verifyPassword = await verify(hashedPassword, password);
    return verifyPassword;
  }
}
