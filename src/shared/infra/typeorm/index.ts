import { createConnection, getConnectionOptions } from 'typeorm'
interface IOptions {
  host: string
}

getConnectionOptions().then(options => {
  createConnection({
    ...options
  })
})
