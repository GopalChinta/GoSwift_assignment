import { createServer } from "http";
import { handleRequest } from "./handlers";

const PORT = 3000;
const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

