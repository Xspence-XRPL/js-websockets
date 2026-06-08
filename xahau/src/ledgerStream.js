import { Client } from 'xahau';

/*
The ledger stream only sends ledgerClosed messages when the consensus process declares a new
validated ledger. The message identifies the ledger and provides some information about its
contents. 

https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
*/

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