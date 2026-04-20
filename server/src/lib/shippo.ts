// services/shippo.js
import { Shippo } from "shippo";

const client = new Shippo({
  apiKeyHeader: `ShippoToken ${process.env.SHIPPO_API_KEY || "ship"}`,
});

export default client;