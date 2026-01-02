import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { linkDescription } from './resources/link';
import { channelDescription } from './resources/channel';

export class Linkfuse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Linkfuse',
		name: 'linkfuse',
		icon: "file:logo.svg",
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Linkfuse API',
		defaults: {
			name: 'Linkfuse',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'linkfuseApi', required: true }],
		requestDefaults: {
			baseURL: 'https://app.linkfuse.net/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Link',
						value: 'link',
					},
					{
						name: 'Channel',
						value: 'channel',
					},
				],
				default: 'link',
			},
			...linkDescription,
			...channelDescription,
		],
		usableAsTool: true,
	};
}
