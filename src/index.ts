import { config } from "dotenv";

import createApp from "./api";

config();

const PORT = process.env.PORT || 3000;

(async function () {
  const app = await createApp();
  app!.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
})();
