// src/routes/health.ts
import { Router, Request, Response } from "express";
import knex from "knex"; // ou sua instância de conexão

const router = Router();

router.get("/health", async (req: Request, res: Response) => {
  // 1) Verifica tempo de resposta do servidor
  const start = Date.now();

  // 2) Verifica conexão com o DB
  let dbStatus = "up";
  try {
    await knex.raw("SELECT 1"); // ou prisma.$queryRaw`SELECT 1`
  } catch {
    dbStatus = "down";
  }

  const latency = Date.now() - start;

  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),       // segundos desde o start do processo
    latency: `${latency}ms`,
    database: dbStatus
  });
});

export default router;
