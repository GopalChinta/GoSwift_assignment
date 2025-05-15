import { IncomingMessage, ServerResponse } from "http";
import { loadData } from "./load";
import { getDb } from "./db";
import { User } from "./types";
import { parse } from "url";

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const method = req.method || "";
  const url = parse(req.url || "", true);
  const path = url.pathname || "";

  // New root route for "/"
  if (method === "GET" && path === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server is running" }));
    return;
  }

  if (method === "GET" && path === "/load") {
    try {
      await loadData();
      res.writeHead(200);
      res.end();
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Failed to load data" }));
    }
    return;
  }

  const db = await getDb();
  const usersCol = db.collection("users");

  if (method === "GET" && path.startsWith("/users/")) {
    const userId = parseInt(path.split("/")[2]);
    if (isNaN(userId)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Invalid userId" }));
      return;
    }

    const user = await usersCol.findOne({ id: userId });
    if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    const { _id, ...cleanUser } = user; // remove MongoDB internal ID
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(cleanUser, null, 2));
    return;
  }

  if (method === "DELETE" && path === "/users") {
    await usersCol.deleteMany({});
    res.writeHead(200);
    res.end();
    return;
  }

  if (method === "DELETE" && path.startsWith("/users/")) {
    const userId = parseInt(path.split("/")[2]);
    if (isNaN(userId)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Invalid userId" }));
      return;
    }
    const result = await usersCol.deleteOne({ id: userId });
    if (result.deletedCount === 0) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not found" }));
    } else {
      res.writeHead(200);
      res.end();
    }
    return;
  }

  if (method === "PUT" && path === "/users") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const user: User = JSON.parse(body);
        if (!user.id) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "User must have an id" }));
          return;
        }
        const exists = await usersCol.findOne({ id: user.id });
        if (exists) {
          res.writeHead(409);
          res.end(JSON.stringify({ error: "User already exists" }));
          return;
        }
        await usersCol.insertOne(user);
        res.writeHead(201, { Location: `/users/${user.id}` });
        res.end();
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      }
    });
    return;
  }

  // Default 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
}

