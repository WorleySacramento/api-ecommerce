import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";


export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll(): Promise<User[]> {
   return this.userRepository.getAll();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    } 
      return user;
  }

  async createUser(user: User): Promise<void> {
     return this.userRepository.createUser(user);
  }

  async updateUser(id: string, user: User): Promise<void> {
    const _user = await this.userRepository.getById(id);
    if (!_user) {
      throw new NotFoundError("User not found");
    }
    _user.name = user.name;
    _user.idade = user.idade;
    _user.email = user.email;
   return this.userRepository.updateUser(_user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }


}