# Xahau WebSocket Examples

A focused collection of JavaScript WebSocket examples for interacting with `xahaud` servers the XRPL-compatible Xahau network. These examples demonstrate WebSocket subscriptions and requests for common Xahau streams and events.

## Overview

The `xahau` examples are small, copy-paste-friendly scripts that connect to public Xahau endpoints and log responses for common API methods. They are designed for learning, debugging, and quick experimentation.

### Scripts

- `accountStream.js` — Subscribe to account-related events and transactions.
- `consensusStream.js` — Observe consensus phase transitions.
- `bookchangesStream.js` — Track order book changes via `book_changes`.
- `ledgerStream.js` — Receive validated ledger notifications.
- `orderbookStream.js` — Monitor specific order book activity.
- `serverinfoStream.js` — Request server metadata and status.
- `transactionStream.js` — Subscribe to validated transactions.
- `validationStream.js` — Receive validator vote messages.

## Considerations

### Markers

Some methods return paginated results. When results exceed a single response, responses include a `marker` field. Use the `marker` value in subsequent requests to fetch the next page. If no `marker` is present, you have reached the end of the results.

Marker formats are server-defined and may vary; treat markers as opaque tokens. Markers are temporary and may expire (commonly ~10 minutes).

### Rate Limiting

Public `xahaud` servers enforce rate limits per client IP. Clients behind the same NAT share the same limit. When a client approaches the rate limit, responses may include a top-level `warning` with value `load`. If limits are exceeded, the server may disconnect and temporarily block the client IP. Admin clients are typically exempt from rate limits.

## Public API Methods (Overview)

These examples interact with the public API surface exposed by `xahaud`. The list below is a condensed reference.

### Account methods
An account in the Xahau network represents a holder of XAH and a sender of transactions. Use these methods to work with account info.

- `account_channels`, `account_currencies`, `account_info`, `account_lines`, `account_objects`, `account_offers`, `account_tx`, `gateway_balances`, `noripple_check`

### Ledger methods
A ledger version contains a header, a transaction tree, and a state tree, which contain account settings, trust lines, balances, transactions, and other data. Use these methods to retrieve ledger info.

- `ledger`, `ledger_closed`, `ledger_current`, `ledger_data`, `ledger_entry`

### Transaction methods
Transactions are the only thing that can modify the shared state of the Xahau. All business on Xahau takes the form of transactions. Use these methods to work with transactions.

- `submit`, `submit_multisigned`, `transaction_entry`, `tx`, `sign` (admin), `sign_for` (admin)

### Order book and payment channel
Order books list offers to trade one currency for another. Use `book_offers` or the `book_changes` stream to inspect market depth and track offers being added, filled, or removed. Payment channels are separate and handle repeated, one-way payments.

- `book_offers`, `deposit_authorized`, `channel_authorize`, `channel_verify`

### Subscription and server methods
Use these methods to enable the server to push updates to your client when various events happen, so that you can know and react right away.

- `subscribe`, `unsubscribe`, `fee`, `server_info`, `server_state`, `manifest`

### Utilities
Use these methods to perform convenient tasks, such as ping and random number generation.

- `json` (commandline proxy), `ping`, `random`

## Request Formatting Guide

### Public Servers

- Mainnet WebSocket: `wss://xahau.network` (https://xahau.network)
- Testnet WebSocket: `wss://xahau-test.net` (https://xahau-test.net)


### WebSocket Request Example

```json
{ "id": 3, "command": "account_info", "account": "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8", "strict": true, "ledger_index": "validated", "api_version": 1 }
```

Field reference for WebSocket requests:

- `command` (string): API method name.
- `id` (optional): Request identifier.
- `api_version` (optional): Numeric API version.

Note: This collection focuses solely on WebSocket examples. While `xahaud` exposes JSON-RPC and command-line interfaces, those are outside the scope of these scripts. The README documents the available methods for reference, but examples and code here assume WebSocket usage.

## Response Formatting Guide

Responses vary by interface (WebSocket vs JSON-RPC/commandline). JSON-RPC and commandline share the same format.

Common fields:

- `id` — (WebSocket) the request id.
- `status` — (WebSocket) `success` when the request was processed.
- `result` — Object containing the query result (JSON-RPC/commandline).
- `type` — (WebSocket) indicates response type (e.g., `response`, `ledgerClosed`, `transaction`).
- `warning` — Optional, value `load` indicates high server load / approaching rate limit.
- `warnings` — Optional array of warning objects with `id`, `message`, and optional `details`.

## API Warnings

When a response contains a `warnings` array, each entry is a Warning Object with the following fields:

- `id` (number): Numeric warning code.
- `message` (string): Human-readable description (do not rely on this string for program logic).
- `details` (object, optional): Additional structured context for the warning.

## Usage

Run the example scripts directly from the repository root. Examples are in `xahau/src` and can be executed with Node.js:

```bash
node xahau/src/ledgerStream.js
node xahau/src/accountStream.js
```

## Notes

- These examples are educational and intentionally minimal. Add production-grade error handling before using in critical systems.
- All network endpoints and example accounts in scripts are illustrative — review and replace with your own values as needed.

## Contributing

Contributions welcome. Open an issue to discuss changes or submit a pull request with tests or sample outputs when appropriate.

## Resources

- https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
- https://xahau.network/docs/features/http-websocket-apis/request-formatting-guide/
- https://xahau.network/docs/features/http-websocket-apis/response-formatting-guide/

## License

MIT

