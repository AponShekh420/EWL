// services/shippo.js
import { Shippo } from "shippo";
import dotenv from "dotenv";
dotenv.config()
const client = new Shippo({
  apiKeyHeader: `ShippoToken ${process.env.SHIPPO_API_KEY || "dfsdfsdfsfaasd"}`,
});

export default client;