import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
export const dbName = "node_assignment";

let connected = false;

export async function getDb() {
  if (!connected) {
    await client.connect();
    connected = true;
  }
  return client.db(dbName);
}



