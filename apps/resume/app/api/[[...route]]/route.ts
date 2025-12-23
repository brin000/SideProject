import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import z from "zod";
import documentRoute from "./document";

export const runtime = "edge";

const app = new Hono().basePath("/api");
app.use("*", logger());
app.onError((err, c) => {
  if (err instanceof z.ZodError) {
    const firstError = err.errors[0];

    return c.json(
      { code: 422, message: `\`${firstError?.path}\`: ${firstError?.message}` },
      422,
    );
  }

  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json(
    { error: "Something went wrong, please try again later." },
    500,
  );
});

// eslint-disable-next-line
const routes = app.route("/document", documentRoute);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
