import { Client } from 'xahau';

/*
Account stream monitors a specific account for validated transactions.
Sends transaction messages whenever a transaction affects the monitored account.
Subscribed to the EVR Issuer account to receive updates.

https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
*/

// Connect to Xahau and stream account transactions
const client = new Client('wss://xahau.network');

async function main() {
    // Connect to Xahau
    await client.connect();
    console.log('Connected to Xahau');

    // Listen for transactions affecting the monitored account
    client.on('transaction', (transaction) => {
        console.log('New Transaction:');
        console.log(JSON.stringify(transaction, null, 2));
        console.log('---');
    });

    // Subscribe to account stream
    await client.request({
        command: 'subscribe',
        accounts: ['rEvernodee8dJLaFsujS6q1EiXvZYmHXr8']
    });

    console.log('Listening for transactions on account: rEvernodee8dJLaFsujS6q1EiXvZYmHXr8');
}

main().catch(console.error);