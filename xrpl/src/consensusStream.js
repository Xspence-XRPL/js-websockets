import { Client } from 'xrpl';

// Connect to XRPL and stream consensus phase changes
const client = new Client('wss://s2.ripple.com');

async function main() {
    // Connect to XRPL
    await client.connect();
    console.log('Connected to XRPL');

    // Listen for consensus phase changes
    client.on('consensusPhase', (consensus) => {
        console.log('Consensus Phase Change:');
        console.log(JSON.stringify(consensus, null, 2));
        console.log('---');
    });

    // Subscribe to consensus stream
    await client.request({
        command: 'subscribe',
        streams: ['consensus']
    });

    console.log('Listening for consensus phase changes...');
}

main().catch(console.error);
