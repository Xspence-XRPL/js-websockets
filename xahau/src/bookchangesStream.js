import { Client } from 'xahau';

/*
Book changes stream monitors order book changes across all trading pairs.
Since book_changes stream requires ledger index, we subscribe to ledger stream
and request book changes for each new validated ledger.

https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
*/

// Connect to Xahau and stream book changes
const client = new Client('wss://xahau.network');

async function main() {
    // Connect to Xahau
    await client.connect();
    console.log('Connected to Xahau');

    // Listen for new validated ledgers
    client.on('ledgerClosed', async (ledger) => {
        console.log(`Ledger ${ledger.ledger_index} validated, checking for book changes...`);
        
        try {
            // Request book changes for this ledger
            const response = await client.request({
                command: 'book_changes',
                ledger_index: ledger.ledger_index
            });
            
            const bookChanges = response.result || response;
            
            if (bookChanges.changes && bookChanges.changes.length > 0) {
                console.log('Order Book Changes:');
                console.log(JSON.stringify(bookChanges, null, 2));
                console.log('---');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    // Subscribe to ledger stream
    await client.request({
        command: 'subscribe',
        streams: ['ledger']
    });

    console.log('Listening for order book changes...');
}

main().catch(console.error);