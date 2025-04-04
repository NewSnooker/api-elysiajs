import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { UserController } from "./controllers/UserController";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post("/api/user/signin", UserController.signIn)
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
