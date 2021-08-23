import server from "./app.js";
import connectDB from "./utils/dbDrive.js";
// connectDB();

const port = process.env.PORT || 3100;
server.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});
