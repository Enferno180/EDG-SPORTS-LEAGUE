const dotenv = require('dotenv');
const result = dotenv.config({ path: '.env.local' });

if (result.error) {
    console.log("Error loading .env.local:", result.error);
} else {
    console.log("Loaded keys from .env.local:", Object.keys(result.parsed));
}

console.log("All env keys starting with POSTGRES or DATA:", Object.keys(process.env).filter(k => k.startsWith('POSTGRES') || k.startsWith('DATA')));
