import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { UserController } from "./controllers/UserController";
import jwt from "@elysiajs/jwt";

const app = new Elysia()
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(
    jwt({
      name: "jwt",
      secret: "your_secret_key",
    })
  )
  .get("/", () => "Hello Elysia")
  .post("/api/user/signin", UserController.signIn)
  .put("/api/user/update", UserController.update)
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
