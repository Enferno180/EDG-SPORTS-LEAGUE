const dotenv = require('dotenv');
const result = dotenv.config({ path: '.env' });

if (result.error) {
    console.log("Error loading .env:", result.error);
} else {
    console.log("Loaded keys from .env:", Object.keys(result.parsed));
}
