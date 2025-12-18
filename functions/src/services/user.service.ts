import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";


export class UserService {

  private userRepository: UserRepository;
  private authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
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
  const userAuth = await this.authService.create(user);
  console.log(userAuth);
  user.id = userAuth.uid;
     await this.userRepository.updateUser(user);
  }

  async updateUser(id: string, user: User): Promise<void> {
    const _user = await this.userRepository.getById(id);
    if (!_user) {
      throw new NotFoundError("User not found");
    }
    _user.name = user.name;
    // _user.idade = user.idade;
    _user.email = user.email;

    await this.authService.update(id, user);
    await this.userRepository.updateUser(_user);
  }

  async deleteUser(id: string): Promise<void> {

     this.authService.delete(id);
    return this.userRepository.deleteUser(id);
  }


}