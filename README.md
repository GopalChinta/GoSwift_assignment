Here's a complete `README.md` file for your Node.js + TypeScript + MongoDB backend assignment with `uploads/book.csv` generation and REST API routes:

---

## 📘 Node.js Backend Assignment

This project is a minimal backend REST API built with **Node.js**, **TypeScript**, and **MongoDB** (no frameworks like Express). It fetches users, posts, and comments from a public API and serves nested data with REST endpoints. It also exports a CSV of users to `uploads/book.csv`.

---

### 🚀 Features

* REST API using built-in `http` module
* MongoDB database integration
* Data fetching from JSONPlaceholder API
* CSV file export (`uploads/book.csv`)
* Fully typed using TypeScript

---

### 📦 Tech Stack

* Node.js (native `http`)
* TypeScript
* MongoDB (local or Atlas)
* No external frameworks (except `mongodb`)

---

### 📁 Folder Structure

```
node_assignment/
├── src/
│   ├── db.ts
│   ├── handlers.ts
│   ├── index.ts
│   ├── load.ts
│   └── types.ts
├── uploads/
│   └── book.csv (auto-created on /load)
├── package.json
├── tsconfig.json
└── README.md
```

---

### 📄 Installation

```bash
git clone https://github.com/GopalChinta/GoSwift_assignment
cd node_assignment
npm install
```

---

### 🔧 MongoDB Setup

#### ✅ Option 1: Local MongoDB

Start your local MongoDB server:

```bash
mongod --dbpath <path-to-your-data>
```

#### ✅ Option 2: MongoDB Atlas

Replace the URI in `src/db.ts`:

```ts
const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/node_assignment";
```

---

### 🏃 Run the Project

```bash
npm run dev
```

Server starts at:

```
http://localhost:3000
```

---

### 🌐 API Endpoints

| Method | Endpoint               | Description                                   |
| ------ | ---------------------- | --------------------------------------------- |
| GET    | `/`                    | Server status message                         |
| GET    | `/load`                | Load users, posts, comments, and generate CSV |
| GET    | `/users/:userId`       | Get full nested user data                     |
| PUT    | `/users`               | Add a new user (must include `id`)            |
| DELETE | `/users`               | Delete all users                              |
| DELETE | `/users/:userId`       | Delete a specific user                        |
| GET    | `/book.csv` (optional) | Serve the `uploads/book.csv` (if implemented) |

---

### 📄 Example CSV Output (`uploads/book.csv`)

```csv
id,name,username,email,phone,website,company_name
1,"Leanne Graham","Bret","Sincere@april.biz","1-770-736-8031 x56442","hildegard.org","Romaguera-Crona"
...
```

---

### ✅ Test Flow

1. Start server: `npm run dev`
2. Visit `http://localhost:3000/load`
3. Then visit `http://localhost:3000/users/1` to see nested data
4. Open `uploads/book.csv` to see CSV content

---

Let me know if you'd like a zip version or want a `GET /book.csv` endpoint added!
