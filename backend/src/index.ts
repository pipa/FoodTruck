import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Request, Response, json } from "express";
import { buildSchema } from "type-graphql";
import { MyResolver } from "./resolvers/MyResolver";

const port = Bun.env.BE_SERVER_PORT || 4000;
const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [MyResolver],
  });
  const server = new ApolloServer({ schema });
  const app = express();

  await server.start();

  app.get("/health", (_: Request, res: Response) => {
    res.status(200).send("Ok");
  });
  app.get("/graphql", cors(), json(), expressMiddleware(server));

  app.listen(port, () => {
    console.log(`BE Server started on http://localhost:${port}/graphql`);
  });
};

startServer().catch((error) => {
  console.error("Server failed to start due to error:", error);
});
