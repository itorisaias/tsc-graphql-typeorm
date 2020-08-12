import { ProductResolver } from './ProductResolver';
import { PingResolver } from './ping';

export const resolvers = [ProductResolver, PingResolver] as const;
