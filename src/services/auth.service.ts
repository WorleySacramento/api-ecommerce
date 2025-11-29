import { signInWithEmailAndPassword, getAuth as getAuthSignIn, UserCredential } from "firebase/auth";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";
import { User } from "../models/user.model";
import { getAuth, UserRecord } from "firebase-admin/auth";

export class AuthService {
 
  async create(user:User): Promise<UserRecord> {
  return  getAuth().createUser({
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

  login(email:string, password:string): Promise<UserCredential> {
   return signInWithEmailAndPassword(getAuthSignIn(), email, password);
  }
}