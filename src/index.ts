import { config } from "dotenv";

import createApp from "./api";

config();

const PORT = process.env.PORT;

(async function () {
  const app = await createApp();
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
})();
