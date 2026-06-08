import { Client } from 'xrpl';

// Connect to XRPL and stream order book changes
const client = new Client('wss://s2.ripple.com');

async function main() {
    // Connect to XRPL
    await client.connect();
    console.log('Connected to XRPL');

    // Listen for transactions affecting the monitored order book
    client.on('transaction', (transaction) => {
        console.log('Order Book Transaction:');
        console.log(JSON.stringify(transaction, null, 2));
        console.log('---');
    });

    // Subscribe to XRP/RLUSD order book
    await client.request({
        command: 'subscribe',
        books: [
            {
                taker_pays: {
                    currency: 'XRP'
                },
                taker_gets: {
                    currency: '524C555344000000000000000000000000000000',
                    issuer: 'rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De'
                },
                snapshot: true
            }
        ]
    });

    console.log('Listening for XRP/RLUSD order book changes...');
}

main().catch(console.error);
