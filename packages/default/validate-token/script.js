import { connectToDatabase } from "../../../lib/mongodb-client.js";

export const validateToken = async (args) => {
  const { id, token } = args;

  try {
    const db = await connectToDatabase();

    const collection = db.collection("users");

    const document = await collection.findOne({ id });

    if (!document) {
      return { statusCode: 400 };
    }

    if (document.token === token) {
      await collection.deleteOne({ id });
      return { statusCode: 200 };
    } else {
      return { statusCode: 400 };
    }
  } catch (error) {
    return { statusCode: 500 };
  }
};

export const main = async (args) => {
  return await validateToken(args);
};
