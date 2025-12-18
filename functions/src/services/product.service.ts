import { Product } from '../models/product.model';
import { NotFoundError } from "../errors/not-found.error";
import { ProductRepository } from '../repositories/product.repository';
import { CategoryRepository } from '../repositories/category.repository';


export class ProductService {
  private productRepository: ProductRepository;
  private categoryRepository: CategoryRepository

  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();

  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }

  async search(categoriaId: string): Promise<Product[]> {
    return this.productRepository.search(categoriaId);
  }

  async save(product: Product){
    const category = await this.getCategoryById(product.categoria.id);
    product.categoria = category;
    await this.productRepository.save(product);
  }

  async update(id: string, product: Product): Promise<void> {
    const _product = await this.getById(id);
    const category = await this.getCategoryById(product.categoria.id);

    _product.descricao = product.descricao;
    _product.ativa = product.ativa;
    _product.nome = product.nome;
    _product.preco = product.preco;
    _product.imagem = product.imagem;
    _product.categoria = category;

    await this.productRepository.update(_product);
  }
  
  private getCategoryById = async (id: string ) => {
    const category = await this.categoryRepository.getById(id);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return category;
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }


}