// import sequelize from "./../src/database/connectDB.js"; // Correct path to your Sequelize instance
// import { Users } from "./src/models/users.models.js"; // Correct path to your models
import { sequelize } from "./src/database/connectDB.js";

sequelize.sync({ force: true });
console.log("Database & tables created!");
