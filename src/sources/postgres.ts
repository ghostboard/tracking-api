import knex from 'knex'

const connection = process.env.SQLDB_URL
const config = {
	client: 'postgres',
	connection
}

const client = knex(config)
export default client