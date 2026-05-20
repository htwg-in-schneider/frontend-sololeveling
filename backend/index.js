const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());

// DB
const db = mysql.createPool({
  host: "58ea917d-11a0-4864-979f-34a7070d9edc.ma.bw-cloud-instance.org",
  port: 3307,
  user: "sololeveling2",
  password: "OWzb2hMefMnYN1sa",
  database: "sololeveling-prod"
});

// TEST
app.get("/health", async (req, res) => {
  const [rows] = await db.query("SELECT 1 AS ok");
  res.json(rows[0]);
});

// GET TASKS
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE id = ?",
    [id]
  );

  res.json(rows[0]);
});

// CREATE TASK
app.post("/tasks", async (req, res) => {
  const { name, description, type, deadline, interval } = req.body;

  const [result] = await db.query(
    `INSERT INTO tasks (name, description, type, deadline, interval_field)
     VALUES (?, ?, ?, ?, ?)`,
    [name, description, type, deadline, interval]
  );

  res.json({ id: result.insertId, ...req.body });
});

// START
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, type, deadline, interval } = req.body;

  await db.query(
    `UPDATE tasks
     SET name=?, description=?, type=?, deadline=?, interval_field=?
     WHERE id=?`,
    [name, description, type, deadline, interval, id]
  );

  res.json({ message: "Task updated" });
});