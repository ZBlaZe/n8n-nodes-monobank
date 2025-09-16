import { IExecuteFunctions, INodeType, INodeTypeDescription, INodeExecutionData, ICredentialDataDecryptedObject } from 'n8n-workflow';
import axios from 'axios';

export class MonoBank implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'MonoBank',
    name: 'monoBank',
    icon: 'file:monobank.svg',
    group: ['input', 'output'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Interact with Monobank API',
    defaults: { name: 'MonoBank' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'monoBankApi',
        required: false,
      },
    ],
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
            action: 'Get client information',
            description: 'Retrieve full client details including accounts and jars',
          },
          {
            name: 'Get Accounts',
            value: 'getAccounts',
            action: 'Get accounts',
            description: 'Retrieve list of accounts',
          },
          {
            name: 'Get Jars',
            value: 'getJars',
            action: 'Get jars',
            description: 'Retrieve list of jars (savings pots)',
          },
          {
            name: 'Get Managed Accounts',
            value: 'getManagedAccounts',
            action: 'Get managed accounts',
            description: 'Retrieve list of managed accounts',
          },
          {
            name: 'Get Statement',
            value: 'getStatement',
            action: 'Get statement',
            description: 'Retrieve statement for an account',
          },
          {
            name: 'Get Currency Rates',
            value: 'getCurrencyRates',
            action: 'Get currency rates',
            description: 'Retrieve current currency rates (public)',
          },
          {
            name: 'Get Bank Sync',
            value: 'getBankSync',
            action: 'Get bank sync data',
            description: 'Retrieve bank sync keys (public)',
          },
        ],
        default: 'getClientInfo',
      },
      {
        displayName: 'Account ID',
        name: 'accountId',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['getStatement'],
          },
        },
        default: '',
        description: 'Account ID for statement (from Get Accounts or 0 for default)',
        required: true,
      },
      {
        displayName: 'From Date',
        name: 'from',
        type: 'dateTime',
        displayOptions: {
          show: {
            operation: ['getStatement'],
          },
        },
        default: '',
        description: 'From date for statement (e.g., 2025-09-01)',
        required: true,
      },
      {
        displayName: 'To Date',
        name: 'to',
        type: 'dateTime',
        displayOptions: {
          show: {
            operation: ['getStatement'],
          },
        },
        default: '',
        description: 'To date for statement (e.g., 2025-09-17, optional)',
        required: false,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const operation = this.getNodeParameter('operation', 0) as string;
    const credentials = (await this.getCredentials('monoBankApi')) as ICredentialDataDecryptedObject | undefined;
    const token = credentials?.token as string | undefined;
    const returnData: INodeExecutionData[] = [];

    if (!token && ['getClientInfo', 'getAccounts', 'getJars', 'getManagedAccounts', 'getStatement'].includes(operation)) {
      throw new Error('Token is required for this operation');
    }

    for (let i = 0; i < items.length; i++) {
      try {
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token && !['getCurrencyRates', 'getBankSync'].includes(operation) ? { 'X-Token': token } : {}),
        };

        let response;
        switch (operation) {
          case 'getClientInfo':
            response = await axios.get('https://api.monobank.ua/personal/client-info', { headers });
            returnData.push({ json: response.data });
            break;
          case 'getAccounts':
            response = await axios.get('https://api.monobank.ua/personal/client-info', { headers });
            returnData.push({ json: response.data.accounts || [] });
            break;
          case 'getJars':
            response = await axios.get('https://api.monobank.ua/personal/client-info', { headers });
            returnData.push({ json: response.data.jars || [] });
            break;
          case 'getManagedAccounts':
            response = await axios.get('https://api.monobank.ua/personal/client-info', { headers });
            returnData.push({ json: response.data.managedClients || [] });
            break;
          case 'getStatement':
            const accountId = this.getNodeParameter('accountId', i) as string;
            const from = Math.floor(new Date(this.getNodeParameter('from', i) as string).getTime() / 1000);
            const to = this.getNodeParameter('to', i) ? Math.floor(new Date(this.getNodeParameter('to', i) as string).getTime() / 1000) : Math.floor(Date.now() / 1000);
            response = await axios.get(`https://api.monobank.ua/personal/statement/${accountId}/${from}/${to}`, { headers });
            returnData.push({ json: response.data });
            break;
          case 'getCurrencyRates':
            response = await axios.get('https://api.monobank.ua/bank/currency', { headers });
            returnData.push({ json: response.data });
            break;
          case 'getBankSync':
            response = await axios.get('https://api.monobank.ua/bank/sync', { headers });
            returnData.push({ json: response.data });
            break;
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
      } catch (error: any) {
        throw new Error(`Request failed: ${error.response?.data?.errorDescription || error.message}`);
      }
    }

    return [returnData];
  }
}