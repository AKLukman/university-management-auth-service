import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from '../src/app/modules/users/users.route'

const app: Application = express()

// cors
app.use(cors())

// parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Applications routes
app.use('/api/v1/users', usersRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('database working!')
})

export default app
