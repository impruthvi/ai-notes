import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;