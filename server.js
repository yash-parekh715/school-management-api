require("dotenv").config();
const app = require("./src/app");
const { testConnection } = require("./src/config/database");
const { initializeDatabase } = require("./src/config/dbInit");

const PORT = process.env.PORT || 3000;

async function startServer() {
  // Test database connection
  const isConnected = await testConnection();

  if (!isConnected) {
    console.error("Failed to connect to database. Exiting...");
    process.exit(1);
  }

  // Initialize database
  await initializeDatabase();

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
