# Architectural Patterns

This document describes the architectural patterns, design decisions, and conventions used throughout the n8n-nodes-linkfuse codebase.

## 1. Declarative Routing Pattern

API calls are defined declaratively in configuration objects rather than imperative code. The n8n framework handles execution.

**Implementation:** Each operation defines its HTTP request in a `routing` object:
- [resources/link/index.ts:27-35](nodes/Linkfuse/resources/link/index.ts#L27-L35) - GET /links with pagination
- [resources/link/index.ts:63-74](nodes/Linkfuse/resources/link/index.ts#L63-L74) - POST /links
- [resources/channel/index.ts:61-72](nodes/Linkfuse/resources/channel/index.ts#L61-L72) - POST process

**Structure:**
```typescript
routing: {
  request: { method: 'GET', url: '/endpoint' },
  output: { postReceive: [{ type: 'rootProperty', properties: { property: 'rows' } }] }
}
```

## 2. Resource-Operation Organization

Code is organized by resource (link, channel) with each CRUD operation in a separate file. Operations are composed using spread operators.

**Directory Structure:**
- `resources/link/` - All link operations
- `resources/channel/` - All channel operations

**Composition Pattern:**
- [resources/link/index.ts:88-95](nodes/Linkfuse/resources/link/index.ts#L88-L95) - Spreads all operation descriptions

## 3. Display Conditions Pattern

UI fields are conditionally shown based on the selected resource and operation using `displayOptions.show` configuration.

**Implementation:** Each operation file exports a condition object:
- [resources/link/get.ts:5-8](nodes/Linkfuse/resources/link/get.ts#L5-L8) - `showOnlyForLinkGet`
- [resources/link/create.ts:24-27](nodes/Linkfuse/resources/link/create.ts#L24-L27) - `showOnlyForLinkCreate`

**Pattern:**
```typescript
const showOnlyFor[Resource][Operation] = {
  operation: ['operationName'],
  resource: ['resourceName']
};
```

## 4. Pre-Send Transform Pattern

Request data can be transformed before sending using `preSend` hooks.

**Implementation:**
- [resources/link/create.ts:8-19](nodes/Linkfuse/resources/link/create.ts#L8-L19) - `transformTags` function

**Pattern:**
```typescript
export function transformFunction(
  this: IExecuteSingleFunctions,
  requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
  // Transform requestOptions.body
  return Promise.resolve(requestOptions);
}
```

Applied via: `send: { preSend: [transformTags] }`

## 5. Template Expression Pattern

Dynamic values in URLs and headers use n8n's template expression syntax with double braces.

**Examples:**
- [resources/link/index.ts:55](nodes/Linkfuse/resources/link/index.ts#L55) - `url: '=/links/{{$parameter.linkId}}'`
- [LinkfuseApi.credentials.ts:30](credentials/LinkfuseApi.credentials.ts#L30) - `Authorization: '=Bearer {{$credentials.accessToken}}'`

## 6. Generic Authentication Pattern

Credentials use `IAuthenticateGeneric` interface to define authentication headers.

**Implementation:**
- [LinkfuseApi.credentials.ts:26-33](credentials/LinkfuseApi.credentials.ts#L26-L33) - Bearer token authentication

## 7. Response Post-Processing Pattern

API responses are processed using `postReceive` hooks to extract nested data.

**Implementation:**
- [resources/link/index.ts:32-35](nodes/Linkfuse/resources/link/index.ts#L32-L35) - Extracts `rows` from paginated response

## 8. Node Description Pattern

The main node class defines all metadata in a single `description` object.

**Implementation:**
- [Linkfuse.node.ts:9-49](nodes/Linkfuse/Linkfuse.node.ts#L9-L49) - Complete node description

**Key Properties:**
- `credentials` - Required authentication
- `requestDefaults` - Base URL and headers
- `properties` - User-configurable parameters
- `usableAsTool: true` - Enables AI agent integration

## 9. File Organization Conventions

| Directory | Purpose |
|-----------|---------|
| `credentials/` | Authentication configurations |
| `nodes/[NodeName]/` | Node class and metadata |
| `nodes/[NodeName]/resources/` | Resource-specific operations |
| `nodes/[NodeName]/resources/[resource]/` | CRUD operation files |
