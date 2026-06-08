import { Client } from 'xrpl';

// Connect to XRPL and stream all transactions
const client = new Client('wss://s2.ripple.com');

async function main() {
    // Connect to XRPL
    await client.connect();
    console.log('Connected to XRPL');

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
