import axios from 'axios';
import 'dotenv/config';

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;

console.log('Testing Email Service Configuration...');

// Avoid exposing sensitive configuration details in logs
console.log(
    'API Key:',
    EMAIL_API_KEY ? 'Configured' : 'Not Set'
);

// Validate required environment variable
if (!EMAIL_SERVICE_URL) {
    console.error('❌ EMAIL_SERVICE_URL is missing in .env');
    process.exit(1);
}

// Validate URL format before making requests
try {
    new URL(EMAIL_SERVICE_URL);
} catch {
    console.error('❌ EMAIL_SERVICE_URL is not a valid URL');
    process.exit(1);
}

const testHealth = async () => {
    try {
        console.log('\nTesting /api/health...');

        const response = await axios.get(
            `${EMAIL_SERVICE_URL}/api/health`,
            {
                timeout: 5000,
            }
        );

        console.log('✅ Health Check Passed:', response.data);

        return true;

    } catch (error) {

        // Safer Axios-specific error handling
        if (axios.isAxiosError(error)) {

            if (error.code === 'ECONNABORTED') {
                console.error('❌ Request timed out');

            } else if (error.response) {
                console.error(
                    `❌ Service responded with status ${error.response.status}`
                );

                console.error('Response Data:', error.response.data);

            } else if (error.request) {
                console.error(
                    '❌ No response received from the email service'
                );

            } else {
                console.error(
                    '❌ Axios request setup failed:',
                    error.message
                );
            }

        } else {
            console.error('❌ Unexpected error:', error);
        }

        return false;
    }
};

const run = async () => {

    const healthPassed = await testHealth();

    if (!healthPassed) {
        console.log(
            '\n❌ Service checks failed. Please verify deployment status and configuration.'
        );
        return;
    }

    console.log('\n✅ Email Service looks reachable!');
};

// Top-level async error handling
run().catch((error) => {
    console.error('❌ Fatal runtime error:', error);
    process.exit(1);
});