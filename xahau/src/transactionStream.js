import { Client } from 'xahau';

/*
Transaction stream monitors all validated transactions on the Xahau network.
Sends transaction messages whenever any transaction is included in a validated ledger.

https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
*/

// Connect to Xahau and stream all transactions
const client = new Client('wss://xahau.network');

async function main() {
    // Connect to Xahau
    await client.connect();
    console.log('Connected to Xahau');

    // Listen for all validated transactions
    client.on('transaction', (transaction) => {
        console.log('New Transaction:');
        console.log(JSON.stringify(transaction, null, 2));
        console.log('---');
    });

    // Subscribe to transactions stream
    await client.request({
        command: 'subscribe',
        streams: ['transactions']
    });

    console.log('Listening for all validated transactions...');
}

main().catch(console.error);