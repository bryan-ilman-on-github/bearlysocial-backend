import { connectToDatabase } from "./mongodb-client.js";

export const deleteAccount = async (args) => {
  const { id, token } = args;

  const responseBody = {
    id: id,
    token: token,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // try {
  //   const db = await connectToDatabase();
  //   return `The type of myVariable is: ${typeof db}`;

  //   //   const collection = db.collection("users");

  //   //   const document = await collection.findOne({ id });

  //   //   if (!document) {
  //   //     return { statusCode: 400 };
  //   //   }

  //   //   if (document.token === token) {
  //   //     await collection.deleteOne({ id });
  //   //     return { statusCode: 200 };
  //   //   } else {
  //   //     return { statusCode: 400 };
  //   //   }
  //   // } catch (error) {
  //   //   return { statusCode: 500 };
  //   // }
  // } finally {
  // }
};

export const main = async (args) => {
  return await deleteAccount(args);
};
