import { Client } from 'xahau';

/*
Order book streams monitor specific trading pairs for order book changes.
Sends transaction messages whenever a transaction affects the monitored order book.
Subscribed to XAH/EVR order book to receive updates.

https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
*/

// Connect to Xahau and stream order book changes
const client = new Client('wss://xahau.network');

async function main() {
    // Connect to Xahau
    await client.connect();
    console.log('Connected to Xahau');

    // Listen for transactions affecting the monitored order book
    client.on('transaction', (transaction) => {
        console.log('Order Book Transaction:');
        console.log(JSON.stringify(transaction, null, 2));
        console.log('---');
    });

    // Subscribe to XAH/EVR order book
    await client.request({
        command: 'subscribe',
        books: [
            {
                taker_pays: {
                    currency: 'XAH'
                },
                taker_gets: {
                    currency: 'EVR',
                    issuer: 'rEvernodee8dJLaFsujS6q1EiXvZYmHXr8'
                },
                snapshot: true
            }
        ]
    });

    console.log('Listening for XAH/EVR order book changes...');
}

main().catch(console.error);