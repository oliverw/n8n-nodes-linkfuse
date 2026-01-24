import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon
} from 'n8n-workflow';

export class LinkfuseApi implements ICredentialType {
	name = 'linkfuseApi';
	displayName = 'Linkfuse API';
	icon = 'file:logo.svg' as Icon;
	documentationUrl = 'https://github.com/oliverw/n8n-nodes-linkfuse?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.linkfuse.net/api/v1',
			url: '/links',
			headers: {
				'X-API-CLIENT': 'n8n',
			},
		},
	};
}
