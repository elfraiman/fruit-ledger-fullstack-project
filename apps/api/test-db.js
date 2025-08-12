const postgres = require('postgres');

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'fruity',
  username: 'candidate'
});

async function testConnection() {
  try {
    const result = await sql`SELECT * FROM location LIMIT 1`;
    console.log('Connection successful:', result);
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
}

testConnection();
