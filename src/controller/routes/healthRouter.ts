import { Router, Request, Response } from "express";
import { BaseDatabase } from "../../data/mySQL/BaseDatabase";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const start = Date.now();
  let dbStatus = "up";

  try {
    await BaseDatabase.connection.raw("SELECT 1");
  } catch {
    dbStatus = "down";
  }

  const latency = Date.now() - start;

  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    latency: `${latency}ms`,
    database: dbStatus
  });
});

export default router;
