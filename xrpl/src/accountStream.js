import { Client } from 'xrpl';

// Connect to XRPL and stream account transactions
const client = new Client('wss://s2.ripple.com');

async function main() {
    // Connect to XRPL
    await client.connect();
    console.log('Connected to XRPL');

    // Listen for transactions affecting the monitored account
    client.on('transaction', (transaction) => {
        console.log('New Transaction:');
        console.log(JSON.stringify(transaction, null, 2));
        console.log('---');
    });

    // Subscribe to account stream
    await client.request({
        command: 'subscribe',
        accounts: ['rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De']
    });

    console.log('Listening for transactions on account: rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De');
}

main().catch(console.error);
