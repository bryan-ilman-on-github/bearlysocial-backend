import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost";
const dbName = "app";

let dbClient;

/**
 * Establishes a connection to the MongoDB database.
 * If a connection has not been established yet,
 * it initializes a new MongoClient connection using the provided URI
 * or defaults to a local MongoDB instance.
 * Once connected, returns a promise that resolves to the MongoDB database instance.
 */
export const connectToDatabase = async () => {
  if (!dbClient) dbClient = await new MongoClient(mongoURI).connect();

  return dbClient.db(dbName);
};
