import cluster from "cluster";
import { cpus } from "os";
import server from "./app.js";
import connectDB from "./utils/db.js";

const totalCPUs = cpus().length;

if (cluster.isMaster) {
  console.log(`Total Number of CPUs count is ${totalCPUs}`);

  for (var i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
  cluster.on("online", (worker) => {
    console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
  });
  cluster.on("exit", (worker) => {
    console.log(
      `Worker Id is ${worker.id} and PID is ${worker.process.pid} is offline`
    );
    console.log("Let's fork new worker!");
    cluster.fork();
  });
} else {
  connectDB();
  const port = process.env.PORT || 3100;
  server.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
  });
}
