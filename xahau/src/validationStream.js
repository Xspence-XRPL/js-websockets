import { Client } from 'xahau';

/*
Validations stream monitors validation messages (votes) from Xahau validators.
Sends messages whenever the server receives a validation message during consensus.

https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
*/

// Connect to Xahau and stream validation messages
const client = new Client('wss://xahau.network');

async function main() {
    // Connect to Xahau
    await client.connect();
    console.log('Connected to Xahau');

    // Listen for validation messages
    client.on('validationReceived', (validation) => {
        console.log('New Validation:');
        console.log(JSON.stringify(validation, null, 2));
        console.log('---');
    });

    // Subscribe to validations stream
    await client.request({
        command: 'subscribe',
        streams: ['validations']
    });

    console.log('Listening for validation messages...');
}

main().catch(console.error);