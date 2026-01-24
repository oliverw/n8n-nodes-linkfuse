# n8n-nodes-linkfuse

n8n community node package for integrating with the Linkfuse API - a link shortener with automatic Amazon localization for affiliate marketing.

## Tech Stack

- **Language:** TypeScript 5.9 (strict mode)
- **Framework:** n8n-workflow 2.2.2
- **Build:** n8n-node-cli (handles build, lint, dev, release)
- **Module:** CommonJS (ES2019 target)
- **Linting:** ESLint 9 + Prettier

## Project Structure

```
├── credentials/                 # Authentication configurations
│   └── LinkfuseApi.credentials.ts  # Bearer token auth
├── nodes/Linkfuse/             # Main node implementation
│   ├── Linkfuse.node.ts        # Node class entry point
│   ├── Linkfuse.node.json      # Node metadata for n8n
│   └── resources/              # API resource operations
│       ├── link/               # Link CRUD operations
│       │   ├── index.ts        # Operations config + getAll/get/delete routing
│       │   └── create.ts       # Create operation with tag transformation
│       └── channel/            # Channel CRUD operations
│           ├── index.ts        # Operations config
│           └── process.ts      # Queue channel for update
└── dist/                       # Compiled output (not in git)
```

## Essential Commands

```bash
npm run build          # Compile TypeScript to dist/
npm run build:watch    # Watch mode for development
npm run dev            # n8n development mode
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix lint issues
npm run release        # Publish new version via release-it
```

## Key Entry Points

- **Node Class:** [nodes/Linkfuse/Linkfuse.node.ts:7](nodes/Linkfuse/Linkfuse.node.ts#L7) - Main `Linkfuse` class
- **Credentials:** [credentials/LinkfuseApi.credentials.ts:7](credentials/LinkfuseApi.credentials.ts#L7) - `LinkfuseApi` class
- **API Base URL:** [nodes/Linkfuse/Linkfuse.node.ts:21](nodes/Linkfuse/Linkfuse.node.ts#L21) - `https://app.linkfuse.net/api/v1`

## Resources & Operations

| Resource | Operations | File |
|----------|-----------|------|
| Link | getAll, get, create, delete | [resources/link/index.ts](nodes/Linkfuse/resources/link/index.ts) |
| Channel | getAll, get, delete, process | [resources/channel/index.ts](nodes/Linkfuse/resources/channel/index.ts) |

## Adding New Features

**New Operation:** Create operation file in `resources/[resource]/`, export `INodeProperties[]`, spread into resource's `index.ts`

**New Resource:** Create `resources/[resource]/index.ts`, add to resource dropdown in [Linkfuse.node.ts:33-41](nodes/Linkfuse/Linkfuse.node.ts#L33-L41)

**Custom Transform:** See `transformTags` pattern in [resources/link/create.ts:8-19](nodes/Linkfuse/resources/link/create.ts#L8-L19)

## CI/CD

GitHub Actions runs on PR/push to main: install → lint → build

## Additional Documentation

When working on specific topics, consult these files:

| Topic | File |
|-------|------|
| Design patterns & conventions | [.claude/docs/architectural_patterns.md](.claude/docs/architectural_patterns.md) |
| n8n node development | [README.md](README.md) |
| Version history | [CHANGELOG.md](CHANGELOG.md) |
