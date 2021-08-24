/* eslint-disable no-unused-vars */
import server from "./app.js";
import * as db from "./utils/dbDrive2.js";
db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

const port = process.env.PORT || 3100;
server.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});

/* //Or first connect to db then start the app
db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    server.listen(port, () => {
      console.log(`Server Started at http://localhost:${port}`);
    });
  }
}); */
