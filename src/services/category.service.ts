import { NotFoundError } from "../errors/not-found.error";
import { Category } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";


export class CategoryService {

  private categoryRepository: CategoryRepository;


  constructor() {
    this.categoryRepository = new CategoryRepository();

  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.getById(id);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return category;
  }

  async save(category: Category): Promise<void> {
    await this.categoryRepository.save(category);
  }

  async update(id: string, category: Category): Promise<void> {
    const _category = await this.getById(id);

    _category.descricao = category.descricao;
    _category.ativa = category.ativa;

    await this.categoryRepository.update(_category);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }


}