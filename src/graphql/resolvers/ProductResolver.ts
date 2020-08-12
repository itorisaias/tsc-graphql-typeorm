import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ID,
  Int,
  Subscription,
} from 'type-graphql';
import { Product, ProductInput, ProductUpdateInput } from '@src/models/Product';

import logger from '@src/logger';

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  public async createProduct(
    @Arg('variables', () => ProductInput) variables: ProductInput
  ): Promise<Product> {
    const newProduct = Product.create(variables);
    logger.info(newProduct);
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
    logger.info({ id, fields });
    return true;
  }

  @Query(() => [Product])
  public products(): Promise<Product[]> {
    return Product.find();
  }
}
