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
    return this.userRepository.getById(id);
  }

  async createUser(user: User): Promise<void> {
     return this.userRepository.createUser(user);
  }

  async updateUser(id: string, user: User): Promise<void> {
   return this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }


}