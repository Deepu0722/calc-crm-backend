import express from "express";
import { pool } from "./db";
import { config } from "./config";
import { compute } from "./services/calculator.service";
import { validateCalculateInput } from "./validation";


const app = express();
const PORT = config.port;
app.use(express.json());

// function compute(a: number, b: number, operation: string): number {
//   switch (operation) {
//     case "add":
//       return a + b;
//     case "subtract":
//       return a - b;
//     case "multiply":
//       return a * b;
//     default:
//       throw new Error(`Unsupported operation: ${operation}`);
//   }
// }

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// app.post("/calculate", async (req, res) => {
//   const { a, b, operation } = req.body;

//   let result: number;
//   try {
//     result = compute(a, b, operation);
//   } catch (err: any) {
//     return res.status(400).json({ error: err.message });
//   }

//   const insertResult = await pool.query(
//     `INSERT INTO calculations (a, b, operation, result)
//      VALUES ($1, $2, $3, $4)
//      RETURNING *`,
//     [a, b, operation, result]
//   );

//   res.json(insertResult.rows[0]);
// });

app.post("/calculate", async (req, res) => {
  const validation = validateCalculateInput(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { a, b, operation } = validation.data;
  const result = compute(a, b, operation);

  const insertResult = await pool.query(
    `INSERT INTO calculations (a, b, operation, result)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [a, b, operation, result]
  );

  res.json(insertResult.rows[0]);
});
app.get("/history", async (_req, res) => {
  const result = await pool.query(
    `SELECT * FROM calculations ORDER BY created_at DESC LIMIT 20`
  );
  res.json(result.rows);
});

async function start() {
  const result = await pool.query("SELECT NOW()");
  console.log("Connected to database. DB server time:", result.rows[0].now);

  app.listen(PORT, () => {
    console.log(`calc-crm-backend listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});