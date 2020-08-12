import { Query, Resolver } from 'type-graphql';

@Resolver()
export class PingResolver {
  @Query(() => String)
  public ping(): string {
    return 'Pong!';
  }
}
