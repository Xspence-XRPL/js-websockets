import { Client } from 'xrpl';

// Connect to XRPL and stream validated ledgers
const client = new Client('wss://s2.ripple.com');

async function main() {
    // Connect to XRPL
    await client.connect();
    console.log('Connected to XRPL');

    // Listen for new validated ledgers
    client.on('ledgerClosed', (ledger) => {
        console.log('New Validated Ledger:');
        console.log(JSON.stringify(ledger, null, 2));
        console.log('---');
    });

    // Subscribe to ledger stream
    await client.request({
        command: 'subscribe',
        streams: ['ledger']
    });

    console.log('Listening for validated ledgers...');
}

main().catch(console.error);
