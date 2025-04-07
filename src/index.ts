import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { UserController } from "./controllers/UserController";
import jwt from "@elysiajs/jwt";
import { DeviceController } from "./controllers/DeviceController";

const app = new Elysia()
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(
    jwt({
      name: "jwt",
      secret: "your_secret_key",
    })
  )
  .get("/", () => "Hello Elysia")

  // User routes
  .group(
    "/user",
    (app) =>
      app
        .post("/sign-in", UserController.signIn)
        .post("/sign-up", () => "Sign up") // Example placeholder
        .post("/profile", () => "Profile") // Example placeholder
  )

  // Device routes
  .group("/device", (app) =>
    app
      .post("/create", DeviceController.create)
      .put("/update/:id", DeviceController.update)
      .get("/list", DeviceController.list)
      .delete("/remove/:id", DeviceController.remove)
  )

  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
