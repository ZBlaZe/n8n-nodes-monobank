import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MonoBank implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'MonoBank',
    name: 'monoBank',
    icon: 'file:monobank.svg', // Видали, якщо іконки немає
    group: ['input', 'output'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Get account information from MonoBank API',
    defaults: { name: 'MonoBank' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'monoBankApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.monobank.ua',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Token': '={{$credentials.token}}',
      },
    },
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Get Client Info',
            value: 'getClientInfo',
            action: 'Get client and accounts information',
            description: 'Retrieve client details including accounts',
            routing: {
              request: {
                method: 'GET',
                url: '/personal/client-info',
              },
              output: {
                postReceive: [
                  {
                    type: 'rootProperty',
                    properties: { property: 'accounts' },
                  },
                ],
              },
            },
          },
        ],
        default: 'getClientInfo',
      },
    ],
  };
}