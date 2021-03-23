module.exports = {
    "type": "postgres",
    "host":  "localhost",
    "port": process.env.POSTGRES_PORT,
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "migrations": ['./src/database/migrations/*.ts'],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}