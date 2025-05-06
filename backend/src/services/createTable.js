import sequelize from "../path_to_your_sequelize_instance"; // Correct path to your Sequelize instance
import { Users } from "../models/users.models.js"; // Correct path to your models

sequelize
  .sync({ force: true }) // This will recreate the tables
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
