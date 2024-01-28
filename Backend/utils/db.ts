import * as mongoDB from "mongodb";

const DB_CONN_STRING=process.env.DB_URL
const DB_NAME=process.env.DB_NAME

export const collections: { selectedFilter?: mongoDB.Collection } = {}

export async function connectToDatabase () {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
  await client.connect();
  const db: mongoDB.Db = client.db(DB_NAME);
  const selectedFilterCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME);
  collections.selectedFilter = selectedFilterCollection;
  console.log(`Successfully connected to database`);
}
