import { Resolver, Query } from "type-graphql";

@Resolver()
export class MyResolver {
  @Query(() => String)
  hello() {
    return "Hello, Food Truck!";
  }
}
