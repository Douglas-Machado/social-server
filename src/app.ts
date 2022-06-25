import express from 'express'
import { routes } from './routes'
import cors from 'cors'

import swaggerUi from 'swagger-ui-express'

import swaggerDocs from './swagger.json'

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors())

app.use(routes)

app.use('/v1', routes)

app.listen(4001, () => {
  console.log('Server running on PORT 4001')
})
