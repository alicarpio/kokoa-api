import { config } from 'dotenv'

import CreateApp from './api'

config()

const PORT = process.env.PORT || 3000

;(async function () {
    const app = await CreateApp()
    app!.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
})()
