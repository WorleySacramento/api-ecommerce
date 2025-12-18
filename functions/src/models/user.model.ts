import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";


export class User {
  id: string;
  name: string;
  idade: number;
  email: string;
  password: string;

  constructor(data: User | any) {
    this.id = data.id;
    this.name = data.name;
    this.idade = data.idade;
    this.email = data.email;
    this.password = data.password;
  }
};


export const newUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  idade: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const updateUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  // idade: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional()
})



export const authLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const authRecoverySchema = Joi.object().keys({
  email: Joi.string().email().required(),
})

export const userConverter:FirestoreDataConverter<User> = {
  toFirestore(user: User):DocumentData {
    return {
      name: user.name,
      email: user.email,
};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    return new User({
      id: snapshot.id,
      ...snapshot.data()
    });
  }
}