// crud.js
import mysql from "mysql2/promise";

async function main() {
  // 1️⃣ Connect to MySQL
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_mysql_password",  // change this
    database: "universitydb"           // must match the DB you created
  });
  console.log("✅ Connected to MySQL");

  // 2️⃣ CREATE: Insert a new user
  await db.execute("INSERT INTO colleges (collegeid, collegename) VALUES (?, ?)", [
    "CLG021",
    "College_21",
  ]);
  console.log("🟢 Inserted a user");

  // 3️⃣ READ: Fetch users
  const [rows] = await db.execute("SELECT * FROM colleges");
  console.log("📋 Users:", rows);

  // 4️⃣ UPDATE: Change user email
//   await db.execute("UPDATE users SET email = ? WHERE name = ?", [
//     "alice@newmail.com",
//     "Alice",
//   ]);
//   console.log("🟡 Updated user email");

//   // 5️⃣ DELETE: Remove a user
//   await db.execute("DELETE FROM users WHERE name = ?", ["Alice"]);
//   console.log("🔴 Deleted user");

  await db.end();
  console.log("✅ Connection closed");
}

main().catch(err => console.error("❌ Error:", err));
