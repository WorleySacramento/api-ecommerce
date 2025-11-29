import { signInWithEmailAndPassword, getAuth as getAuthSignIn, UserCredential } from "firebase/auth";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";
import { User } from "../models/user.model";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { FirebaseError } from "firebase/app";

export class AuthService {

  async create(user: User): Promise<UserRecord> {
    return getAuth().createUser({
      email: user.email,
      password: user.password,
      displayName: user.name,
    }).catch((error) => {
      if (error.code === 'auth/email-already-exists') {
        throw new EmailAlreadyExistsError();
      }
      throw error;
    });
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(getAuthSignIn(), email, password)
      .catch((error) => {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/invalid-credential') {
            throw new UnauthorizedError();
          }
        }
        throw error;
      });
  }
}