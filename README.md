
# js-websockets

[![Node.js](https://img.shields.io/node/v/xrpl.svg)](https://nodejs.org/)
[![XRPL:v xrpl](https://img.shields.io/npm/v/xrpl.svg)](https://www.npmjs.com/package/xrpl)
[![Xahau:v xahau](https://img.shields.io/npm/v/xahau.svg)](https://www.npmjs.com/package/xahau)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This repository provides two small, focused example sets for exploring WebSocket streaming APIs used by XRPL-compatible ledgers:

- `xahau/` — examples that use the `xahau` JavaScript package (`xahau` on npm) and target `xahaud` servers. Xahau is an independent Layer‑1 project that is largely compatible with XRPL APIs but runs its own network and endpoints.
- `xrpl/` — examples that use the official `xrpl` JavaScript library (`xrpl` on npm) and connect to `rippled` public endpoints.

Purpose: Make it trivial to run, inspect, and learn from WebSocket streams (ledgers, transactions, order-book events, consensus, server info) across both networks. Examples are intentionally small so you can copy them into your own project quickly.

## Overview

This repository contains standalone example scripts intended for learning and quick experimentation with XRPL-compatible WebSocket streams across multiple networks. Each script is intentionally minimal and runnable directly with Node.js so developers can copy, run, and adapt the examples quickly. Examples use the library appropriate to the target network (for example `xahau` for Xahau examples and `xrpl` for XRPL examples).

Supported streams and commands follow XRPL-compatible WebSocket APIs. Most streams behave similarly on both networks; where behavior or method names differ the per-network READMEs call that out.

- Accounts stream: Tracks transactions affecting a specific account.
- Consensus stream: Tracks consensus phase transitions on the network (implementation details and phases may vary by network).
- Book changes: Tracks on-ledger order book changes via `book_changes` or subscription streams.
- Ledger stream: Monitors validated ledgers and ledger metadata.
- Order book streams: Monitors offers and trades for specific markets.
- Server info: Retrieves node/server state and configuration.
- Transactions stream: Streams validated transactions in real time.
- Validations: Validator votes and consensus-related messages (network-dependent availability).

See `xahau/README.md` and `xrpl/README.md` for network-specific endpoints, examples, and any API differences.

## Repository structure

- `xahau/` — WebSocket examples using the `xahau` library and endpoints (ESM), Each file in `xahau/src/` is a runnable example.
- `xrpl/` — WebSocket examples using the `xrpl` library (ESM) mirroring the Xahau examples .
- `package.json` — root package metadata and npm scripts for running examples from the repository root.
- `README.md` files in each example folder — network-specific guidance and API references.

Each example folder contains the same set of small scripts so you can compare library behavior and API differences side-by-side.


## Prerequisites

- Node.js v14 or later
- `npm` (bundled with Node.js)

Install dependencies from the repository root:

```bash
npm install
```

## Installation

Clone the repository and install Node dependencies:

```bash
git clone https://github.com/Xspence-XRPL/js-websockets.git
cd js-websockets
npm install
```

## Running examples

Run an example directly from the repository root (examples are ESM):

```bash
node xahau/src/ledgerStream.js
node xrpl/src/accountStream.js
```

Common npm scripts (defined in `package.json`):

```bash
npm run test                # runs XRPL and Xahau ledger streams concurrently
npm run xahau:ledger        # run Xahau ledgerStream.js
npm run xrpl:ledger         # run XRPL ledgerStream.js
npm run xahau:account       # run Xahau accountStream.js
npm run xrpl:account        # run XRPL accountStream.js
```

Notes:

- Examples use hard-coded public endpoints and sample accounts for learning. Replace endpoints/accounts before using in production.
- Keep examples minimal by design; add error handling and reconnection logic for production usage.


## Notes

- Examples default to public endpoints (see network READMEs). Review endpoints and replace before production use.
- Output is logged to the console in JSON or human-readable form depending on the script.
- For API reference and stream details see https://xrpl.org/docs/references/http-websocket-apis/.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests, and submit pull requests for enhancements. Use clear commit messages and provide examples or tests when appropriate.

## Resources

### Xahau
- https://xahau.network/docs/features/http-websocket-apis/public-api-methods/
- https://xahau.network/docs/features/http-websocket-apis/request-formatting-guide/
- https://xahau.network/docs/features/http-websocket-apis/response-formatting-guide/

### XRPL
- https://xrpl.org/docs/references/http-websocket-apis/public-api-methods
- https://xrpl.org/docs/references/http-websocket-apis/api-conventions/request-formatting
- https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting

## License

MIT
