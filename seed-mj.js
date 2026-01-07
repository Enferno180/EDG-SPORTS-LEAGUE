const { Client } = require('pg');
const dotenv = require('dotenv');
// Try loading .env.local first, then .env
dotenv.config({ path: '.env.local' });
if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.log("Keys not found in .env.local, trying .env...");
    dotenv.config({ path: '.env' });
}

async function main() {
    console.log('Connecting to database...');
    // Check for keys
    if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
        console.error("Error: No POSTGRES_URL or DATABASE_URL found in .env.local");
        // Attempt to just allow it to fail naturally or exit? 
        // The user said "Connect to the Neon database".
        console.log("Attempting to connect with standard Vercel env vars...");
    }

    const client = new Client({
        connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Neon/Vercel often requires SSL
        }
    });

    try {
        await client.connect();
        console.log('Connected.');

        // Create table
        console.log('Creating table if needed...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name TEXT,
        team TEXT,
        position TEXT,
        jersey_number INTEGER,
        height TEXT,
        weight TEXT,
        ppg DECIMAL
      );
    `);

        // Insert MJ
        console.log('Inserting MJ...');
        const insertQuery = `
      INSERT INTO players (name, team, position, jersey_number, height, weight, ppg)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
        const values = ['Michael Jordan', 'Broad Street Raging Bulls', 'SG', 23, "6'6\"", '216 lbs', 30.1];

        await client.query(insertQuery, values);

        console.log("SUCCESS: MJ has been signed to the league");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}

main();
