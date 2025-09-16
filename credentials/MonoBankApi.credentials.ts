import { ICredentialType, INodeProperties, ICredentialTestRequest, INodeCredentialTestResult } from 'n8n-workflow';

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

  // test: ICredentialTestRequest = {
  //   request: {
  //     method: 'GET',
  //     url: 'https://api.monobank.ua/personal/client-info',
  //     headers: {
  //       'X-Token': '{{ $credentials.token }}',
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     json: true,
  //     timeout: 5000,
  //   },
  // };
}