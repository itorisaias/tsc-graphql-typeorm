import { Resolver, Query, Mutation, Arg, ID, Int } from 'type-graphql';
import { Product, ProductInput, ProductUpdateInput } from '@src/models/Product';

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  public async createProduct(
    @Arg('variables', () => ProductInput) variables: ProductInput
  ): Promise<Product> {
    const newProduct = Product.create(variables);
    console.log(newProduct);
    return await newProduct.save();
  }

  @Mutation(() => Boolean)
  public async deleteProduct(
    @Arg('id', () => ID) id: string
  ): Promise<boolean> {
    await Product.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  public async updateProduct(
    @Arg('id', () => Int) id: number,
    @Arg('fields', () => ProductUpdateInput) fields: ProductUpdateInput
  ): Promise<boolean> {
    await Product.update({ id }, fields);
    console.log({ id, fields });
    return true;
  }

  @Query(() => [Product])
  public products(): Promise<Product[]> {
    return Product.find();
  }
}
