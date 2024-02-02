import "dotenv/config";
import app from "./src/app";

import http from "http";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
