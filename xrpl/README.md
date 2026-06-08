## XRPL WebSocket Examples

A focused collection of JavaScript WebSocket examples for interacting with the XRP Ledger (XRPL). These scripts demonstrate WebSocket subscriptions and requests for common XRPL streams and events and are designed for quick experimentation and learning.

## Overview

The `XRPL` examples are small, copy-paste-friendly scripts that connect to public XRPL endpoints (for example `wss://s2.ripple.com`) and log stream events such as ledgers, transactions, consensus phases, and order book changes.

### Scripts and Their Purposes

- `accountStream.js` — Tracks transactions affecting a specific account.
- `consensusStream.js` — Tracks consensus phase changes (`open`, `establish`, `accepted`).
- `bookchangesStream.js` — Tracks order book changes by subscribing to the `ledger` stream and requesting `book_changes`.
- `ledgerStream.js` — Subscribes to the `ledger` stream and logs validated ledgers.
- `orderbookStream.js` — Monitors order book events for specific markets.
- `serverinfoStream.js` — Requests server information and status.
- `transactionStream.js` — Subscribes to validated transactions.
- `validationStream.js` — Monitors validator vote messages.

## Considerations

### Markers

Some methods return paginated results. When results exceed a single response, responses include a `marker` field. Use the `marker` value in subsequent requests to fetch the next page. If no `marker` is present, you have reached the end of the results.

Marker formats are server-defined and may vary; treat markers as opaque tokens. Markers are temporary and may expire (commonly ~10 minutes).

### Rate Limiting

Public XRPL servers enforce rate limits per client IP. Clients behind the same NAT share the same limit. When a client approaches the rate limit, responses may include a top-level `warning` with value `load`. If limits are exceeded, the server may disconnect and temporarily block the client IP. Admin clients are typically exempt from rate limits.


## Public API Methods

This collection focuses on WebSocket examples for interacting with `rippled` servers. The README documents common public API methods available over XRPL servers for reference; examples and scripts in this repo use WebSocket subscriptions and requests.

### Account Methods
An account in the XRP Ledger represents a holder of XRP and a sender of transactions. Use these methods to work with account info.

- `account_channels`, `account_currencies`, `account_info`, `account_lines`, `account_nfts`, `account_objects`, `account_offers`, `account_tx`, `gateway_balances`, `noripple_check`

### Ledger Methods
A ledger version contains a header, a transaction tree, and a state tree, which contain account settings, trust lines, balances, transactions, and other data. Use these methods to retrieve ledger info.

- `ledger`, `ledger_closed`, `ledger_current`, `ledger_data`, `ledger_entry`

### Transaction Methods
Transactions are the only thing that can modify the shared state of the XRP Ledger. All business on the XRP Ledger takes the form of transactions. Use these methods to work with transactions.

- `submit`, `submit_multisigned`, `transaction_entry`, `tx`, `sign` (admin), `sign_for` (admin)

### Path and Order Book Methods
Paths define a way for payments to flow through intermediary steps on their way from sender to receiver. Paths enable cross-currency payments by connecting sender and receiver through order books. Use these methods to work with paths and other books.

- `amm_info`, `book_offers`, `deposit_authorized`, `nft_buy_offers`, `nft_sell_offers`, `path_find`, `ripple_path_find`

### Payment Channel Methods
Payment channels are a tool for facilitating repeated, unidirectional payments, or temporary credit between two parties. Use these methods to work with payment channels.

- `channel_verify`, `channel_authorize` (admin)

### Subscription Methods (WebSocket only)
Use these methods to enable the server to push updates to your client when various events happen, so that you can know and react right away. WebSocket API only.

- `subscribe`, `unsubscribe`

### Server Info Methods
Use these methods to retrieve information about the current state of the rippled server.

- `fee`, `feature`, `server_info`, `server_state`, `server_definitions`, `manifest`

### Clio Methods
Use these methods to retrieve information using Clio server APIs.

- `server_info`, `ledger`, `nft_info`, `nft_history`, `nfts_by_issuer`

### Utility Methods
Use these methods to perform convenient tasks, such as ping and random number generation.

- `json` (proxy), `ping`, `random`


## Request Formatting Guide

### Public Servers

- Mainnet WebSocket: `wss://s2.ripple.com` (https://s2.ripple.com:51234/)
- Testnet WebSocket: `wss://s.altnet.rippletest.net` (https://s.altnet.rippletest.net:51234/)
- Devnet WebSocket: `wss://s.devnet.rippletest.net` (https://s.devnet.rippletest.net:51234/)

After you open a WebSocket to a `rippled` server, send commands as a JSON object. Common fields:

- `command` (string): The API method name.
- `id` (optional): A unique value to identify this request. The response will include the same `id` when present.
- `api_version` (optional): Numeric API version to use.
- Method parameters: Provide any method-specific parameters at the top-level of the JSON object.

Example request:

```
{
	"id": "example_ws_request_1",
	"command": "account_info",
	"account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
	"ledger_index": "validated",
	"api_version": 2
}
```

## Response Formatting Guide

Responses differ slightly between WebSocket, JSON-RPC, and commandline interfaces. WebSocket responses to direct requests typically include:

- `status` (string): `success` when the request was processed.
- `type` (string): `response` for direct responses; subscription notifications use other values (e.g., `ledgerClosed`, `transaction`).
- `result` (object): The query result; contents vary by method.
- `id` (varies): Echoes the request `id` when provided.
- `warning` (optional): The string `load` when you are approaching rate limits.
- `warnings` (optional): Array of Warning Objects with structured details.
- `forwarded` (optional boolean): `true` if the request was forwarded (Clio ↔ P2P).

Example successful response:

```
{
	"id": 2,
	"status": "success",
	"type": "response",
	"result": {
		"account_data": {
			"Account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
			"Balance": "27389517749",
			"Flags": 0,
			"LedgerEntryType": "AccountRoot",
			"OwnerCount": 18,
			"PreviousTxnID": "B6B410172C0B65575D89E464AF5B99937CC568822929ABF87DA75CBD11911932",
			"PreviousTxnLgrSeq": 6592159,
			"Sequence": 1400,
			"index": "4F83A2CF7E70F77F79A307E6A472BFC2585B806A70833CCD1C26105BAE0D6E05"
		},
		"ledger_index": 6760970
	}
}
```

## API Warnings

When a response contains a `warnings` array, each entry is a Warning Object with the following fields:

- `id` (number): Numeric warning code.
- `message` (string): Human-readable description (do not rely on this string for program logic).
- `details` (object, optional): Additional structured context for the warning.

## Usage

Run the example scripts directly from the repository root. Examples are in `xrpl/src` and can be executed with Node.js:

```bash
node xrpl/src/ledgerStream.js
node xrpl/src/accountStream.js
```

## Notes

- These examples are educational and intentionally minimal. Add production-grade error handling before using in critical systems.
- All network endpoints and example accounts in scripts are illustrative — review and replace with your own values as needed.

## Contributing

Contributions welcome. Open an issue to discuss changes or submit a pull request with tests or sample outputs when appropriate.

## Resources

- https://xrpl.org/docs/references/http-websocket-apis/public-api-methods
- https://xrpl.org/docs/references/http-websocket-apis/api-conventions/request-formatting
- https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting

## License

MIT



