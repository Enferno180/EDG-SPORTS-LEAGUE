const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    dotenv.config({ path: '.env' });
}

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
console.log("URL defined:", !!url);
if (url) {
    console.log("URL starts with:", url.substring(0, 11)); // e.g. "postgres://" or "file:"
    console.log("URL contains @:", url.includes('@'));
} else {
    console.log("No URL found in env vars.");
}
