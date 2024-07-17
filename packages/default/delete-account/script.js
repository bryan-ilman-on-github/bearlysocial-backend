import { connectToDatabase } from "./mongodb-client.js";

export const deleteAccount = async ({ id, token }) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection("users");

    const user = await users.findOne({ _id: id });

    if (!user) return { statusCode: 400 };

    if (user.token !== token) return { statusCode: 400 };

    await users.deleteOne({ _id: id });
    return { statusCode: 200 };
  } catch (error) {
    return { statusCode: 500 };
  }
};

export const main = async (args) => await deleteAccount(args);
