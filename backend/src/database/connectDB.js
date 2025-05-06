import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

let sequelize;

const connectDb = async () => {
  console.log("connecting");
  const dialectOptions = {};
  if (process.env.NODE_ENV === "production") {
    dialectOptions.ssl = {
      rejectUnauthorized: false,
    };
  }

  // Initialize Sequelize
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10), // Convert port to a number
      dialect: "postgres",
      logging: false,
      dialectOptions,
    }
  );

  try {
    // Test the connection
    await sequelize.authenticate();
    console.log(
      `Database ${process.env.DATABASE_NAME} connection has been established successfully.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

await connectDb();

export { sequelize };
