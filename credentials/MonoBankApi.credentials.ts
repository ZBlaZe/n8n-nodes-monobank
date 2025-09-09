import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MonoBankApi implements ICredentialType {
  name = 'monoBankApi';
  displayName = 'MonoBank API';
  documentationUrl = 'https://api.monobank.ua/docs/';
  properties: INodeProperties[] = [
    {
      displayName: 'Token',
      name: 'token',
      type: 'string',
      default: '',
      description: 'Personal token from Monobank API cabinet',
    },
  ];
}