# n8n-nodes-linkfuse

This is an n8n community node. It lets you use Linkfuse in your n8n workflows.

Linkfuse is a Link shortener with automatic Amazon localization for Creatives and Affiliates.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The Node supports the following operations.

### Get Many ### 

Enumerates the Link objects owned by the Account associated with the Authentication Token.

#### Parameters ####

- **Page**: The page of Links to retrieve, starting at 0.
- **Page Size**: How many results per Page to return. Maximum 50.

### Get ### 

Returns the Link with the specified Id.

#### Parameters ####

**Id**: The Id of the Link

### Create ### 

Creates a new Link, or returns returns an existing one.

#### Parameters ####

- **Url**: The source URL of the Link. If the domain the Url points to, is not (yet) supported by the service, the operation fails with a HTTP Status Code 400.
- **Tags**: A string containing a comma separated list of Tags to assign to the newly created Link. Tag names may only contain alpha-numeric characters and no whitespace.
- **Allow Recycle**: The parameter controls whether to re-use an existing link if it points to the same URL

### Delete ### 

Deletes the Link with the specified Id.

#### Parameters ####

**Id**: The Id of the Link

## Credentials

This Node operates on the **Linkfuse REST API**. To access the API, you must authenticate each request using a **Bearer Token** associated with your account. 

### Prerequisites 

Before you can generate a token, you'll need a LinkBrain account. 

1. **Sign up for free** at [https://app.linkfuse.net/signup](https://app.linkfuse.net/signup) 
2. **Sign in** to your account at [https://app.linkfuse.net](https://app.linkfuse.net/signin) 

### Obtaining an API Token 

Once signed in, you can generate your personal API token: 

1. Navigate to **Integrations → API**, or open [https://app.linkfuse.net/integrations/api](https://app.linkfuse.net/integrations/api) directly. 
2. Click **Generate Token** to create a new Bearer Token. 
3. Copy the token --- you'll need it for authenticating API requests. 
> 
> **Note:** Treat your API token like a password. Do not share it publicly or embed it in client-side code. 

## Compatibility

This Node has been tested successfully with n8n 1.115.3

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Linkfuse API Playground](https://app.linkfuse.net/scalar/v1)
* [NPM Package](https://www.npmjs.com/package/n8n-nodes-fltwo)
