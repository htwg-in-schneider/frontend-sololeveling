const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

const app = express();

const JWT_SECRET = "super-secret-key";

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

// Demo-User
let users = [
  {
    id: 1,
    username: "Admin",
    email: "admin@test.de",
    password: "admin123",
    role: "admin"
  },
  {
    id: 2,
    username: "User",
    email: "user@test.de",
    password: "user123",
    role: "user"
  },
  {
    id: 3,
    username: "Charlotte",
    email: "charlotte@test.de",
    password: "charlotte123",
    role: "user"
  },
  {
    id: 4,
    username: "Marlene",
    email: "marlene@test.de",
    password: "marlene123",
    role: "user"
  },
  {
    id: 5,
    username: "Nicki",
    email: "nicki@test.de",
    password: "nicki123",
    role: "user"
  },
  {
    id: 6,
    username: "Nelly",
    email: "nelly@test.de",
    password: "nelly123",
    role: "user"
  }
];

// AUTH MIDDLEWARE
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Kein Token vorhanden" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Ungültiger Token" });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Nur Admin erlaubt" });
  }

  next();
}

// ROOT
app.get("/", (req, res) => {
  res.json({
    message: "Solo Leveling Backend läuft",
    endpoints: ["/health", "/login", "/tasks", "/admin/tasks"]
  });
});

// TEST
app.get("/health", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB nicht erreichbar" });
  }
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email und Passwort sind erforderlich"
    });
  }

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: "Falsche Login-Daten"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    role: user.role,
    email: user.email,
    username: user.username
  });
});

// PROFILE USER
app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "User ist eingeloggt",
    user: req.user
  });
});

// GET TASKS
app.get("/tasks", authenticate, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tasks ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// CREATE TASK
app.post("/tasks", authenticate, async (req, res) => {
  try {
    const { name, description, type, deadline, interval } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        error: "Name und Typ sind Pflichtfelder"
      });
    }

    if (type !== "once" && type !== "repeat") {
      return res.status(400).json({
        error: "Ungültiger Task-Typ"
      });
    }

    const [result] = await db.query(
      `INSERT INTO tasks (name, description, type, deadline, interval_field)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        description || "",
        type,
        type === "once" ? deadline : null,
        type === "repeat" ? interval : null
      ]
    );

    res.json({
      id: result.insertId,
      name,
      description,
      type,
      deadline,
      interval
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// UPDATE TASK
app.put("/tasks/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, deadline, interval } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        error: "Name und Typ sind Pflichtfelder"
      });
    }

    if (type !== "once" && type !== "repeat") {
      return res.status(400).json({
        error: "Ungültiger Task-Typ"
      });
    }

    await db.query(
      `UPDATE tasks
       SET name=?, description=?, type=?, deadline=?, interval_field=?
       WHERE id=?`,
      [
        name,
        description || "",
        type,
        type === "once" ? deadline : null,
        type === "repeat" ? interval : null,
        id
      ]
    );

    res.json({ message: "Task updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// TASK DONE
app.patch("/tasks/:id/done", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;

    if (typeof done !== "boolean") {
      return res.status(400).json({
        error: "done muss true oder false sein"
      });
    }

    await db.query(
      "UPDATE tasks SET done = ? WHERE id = ?",
      [done, id]
    );

    res.json({ message: "Task done updated", done });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// DELETE TASK
app.delete("/tasks/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// ADMIN: ALLE TASKS NACHVOLLZIEHEN
app.get("/admin/tasks", authenticate, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tasks ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// ADMIN: USER ANZEIGEN
app.get("/admin/users", authenticate, requireAdmin, (req, res) => {
  const safeUsers = users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  }));

  res.json(safeUsers);
});

app.delete("/admin/tasks/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params

    await db.query("DELETE FROM tasks WHERE id = ?", [id])

    res.json({ message: "Task wurde gelöscht" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "DB error" })
  }
})

app.delete("/admin/users/:id", authenticate, requireAdmin, (req, res) => {
  const { id } = req.params

  users = users.filter(user => user.id !== Number(id))
  friendTasks = friendTasks.filter(task => task.owner !== deletedUser.username);

  res.json({ message: "User wurde gelöscht" })
})

app.put("/admin/tasks/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, type, deadline, interval } = req.body

    if (!name || !type) {
      return res.status(400).json({ error: "Name und Typ sind Pflichtfelder" })
    }

    await db.query(
      `UPDATE tasks
       SET name=?, description=?, type=?, deadline=?, interval_field=?
       WHERE id=?`,
      [
        name,
        description || "",
        type,
        type === "once" ? deadline : null,
        type === "repeat" ? interval : null,
        id
      ]
    )

    res.json({ message: "Task wurde aktualisiert" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "DB error" })
  }
})

app.put("/admin/users/:id", authenticate, requireAdmin, (req, res) => {
  const { id } = req.params
  const { username, email, password, role } = req.body

  if (!username || !email || !password || !role) {
    return res.status(400).json({
      error: "Username, Email, Passwort und Rolle sind Pflichtfelder"
    })
  }

  users = users.map(user => {
    if (user.id !== Number(id)) return user

    return {
      ...user,
      username,
      email,
      password,
      role
    }
  })

  res.json({ message: "User wurde aktualisiert" })
})

let friendTasks = [
  { id: 1, owner: "Charlotte", name: "Abgabe", description: "Webzeug Abgabe machen", type: "once" },
  { id: 2, owner: "Charlotte", name: "Blumen Gießen", description: "Pflanzen pflegen", type: "repeat" },
  { id: 3, owner: "Charlotte", name: "Gym", description: "Training im Gym", type: "repeat" },
  { id: 4, owner: "Charlotte", name: "Ein Buch lesen", description: "30 Minuten lesen", type: "once" },
  { id: 5, owner: "Charlotte", name: "Spazieren", description: "Spaziergang machen", type: "repeat" },

  { id: 6, owner: "Marlene", name: "Tägliches Training", description: "Sport machen", type: "repeat" },
  { id: 7, owner: "Marlene", name: "Blumen Gießen", description: "Pflanzen pflegen", type: "repeat" },
  { id: 8, owner: "Marlene", name: "Lernen", description: "Für die Uni lernen", type: "once" },
  { id: 9, owner: "Marlene", name: "Ein Buch lesen", description: "Lesen", type: "once" },
  { id: 10, owner: "Marlene", name: "Spazieren", description: "Spazieren gehen", type: "repeat" },

  { id: 11, owner: "Nicki", name: "Tägliches Training", description: "Training erledigen", type: "repeat" },
  { id: 12, owner: "Nicki", name: "Blumen Gießen", description: "Pflanzen pflegen", type: "repeat" },
  { id: 13, owner: "Nicki", name: "Lernen", description: "Lernsession", type: "once" },
  { id: 14, owner: "Nicki", name: "Ein Buch lesen", description: "Lesen", type: "once" },
  { id: 15, owner: "Nicki", name: "Spazieren", description: "Rausgehen", type: "repeat" },

  { id: 16, owner: "Nelly", name: "Tägliches Training", description: "Workout", type: "repeat" },
  { id: 17, owner: "Nelly", name: "Blumen Gießen", description: "Pflanzen pflegen", type: "repeat" },
  { id: 18, owner: "Nelly", name: "Lernen", description: "Uni lernen", type: "once" },
  { id: 19, owner: "Nelly", name: "Ein Buch lesen", description: "Lesen", type: "once" },
  { id: 20, owner: "Nelly", name: "Spazieren", description: "Spaziergang", type: "repeat" }
];

app.get("/admin/friend-tasks", authenticate, requireAdmin, (req, res) => {
  res.json(friendTasks);
});

app.put("/admin/friend-tasks/:id", authenticate, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { owner, name, description, type } = req.body;

  if (!owner || !name || !type) {
    return res.status(400).json({ error: "Owner, Name und Typ sind Pflichtfelder" });
  }

  friendTasks = friendTasks.map(task =>
    task.id === Number(id)
      ? { ...task, owner, name, description: description || "", type }
      : task
  );

  res.json({ message: "FriendTask aktualisiert" });
});

app.delete("/admin/friend-tasks/:id", authenticate, requireAdmin, (req, res) => {
  const { id } = req.params;

  friendTasks = friendTasks.filter(task => task.id !== Number(id));

  res.json({ message: "FriendTask gelöscht" });
});


// START GANZ AM ENDE
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});