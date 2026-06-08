import { Client } from 'xahau';

// Connect to Xahau and stream validated ledgers
const client = new Client('wss://xahau.network');

async function main() {
    // Connect to Xahau
    await client.connect();
    console.log('Connected to Xahau');

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
