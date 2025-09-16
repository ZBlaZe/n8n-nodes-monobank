# n8n-nodes-monobank

<p align="center">
  <img src="https://api.monobank.ua/docs/logo.png" alt="Monobank Logo" width="200"/>
  <br>
  <strong>Community node for n8n to integrate with Monobank API</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/n8n-nodes-monobank"><img src="https://img.shields.io/npm/v/n8n-nodes-monobank?style=flat-square" alt="npm version"/></a>
  <a href="https://github.com/zblaze/n8n-nodes-monobank/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zblaze/n8n-nodes-monobank?style=flat-square" alt="License"/></a>
  <a href="https://n8n.io"><img src="https://img.shields.io/badge/n8n-1.108.0+-blueviolet?style=flat-square" alt="n8n version"/></a>
</p>

A community node for [n8n](https://n8n.io) to integrate with the [Monobank API](https://api.monobank.ua/docs/index.html). Retrieve client information, accounts, jars, statements, currency rates, and bank sync data with ease.

## ✨ Features

- 🏦 **Complete Monobank Integration** - Access all major API endpoints for individuals
- 🔐 **Secure Authentication** - Built-in credential management
- 📊 **Rich Data Access** - Get statements, accounts, jars, and currency rates
- 🚀 **Easy Setup** - Simple installation and configuration
- 🌍 **Public & Private APIs** - Support for both authenticated and public endpoints

## 📦 Installation
```bash
npm install n8n-nodes-monobank
```

## 📋 Prerequisites

- **n8n**: Version 1.108.0 or higher
- **Monobank API Token**: Required for private operations
  - 🔗 [**Get your API token here**](https://api.monobank.ua/index.html)
  - Navigate to the personal cabinet and generate your token

## 🚀 Usage

### 1️⃣ Add the Node
Add the **MonoBank** node to your workflow in n8n.

### 2️⃣ Configure Credentials
- **For Private Operations**: Create a "MonoBank API" credential with your token from the [Monobank API cabinet](https://api.monobank.ua/index.html)
- **For Public Operations**: No credentials required (Currency Rates, Bank Sync)

### 3️⃣ Select Operation
Choose from available operations based on your needs.

### 4️⃣ Configure Parameters
For **Get Statement** operations:
- **Account ID**: Use account ID from `Get Accounts` or `0` for default account
- **From Date**: Start date (e.g., `2025-09-01`)
- **To Date**: End date (optional, e.g., `2025-09-17`)

### 5️⃣ Execute
Run the node and process the response data.

> ⚠️ **Rate Limit Notice**: Monobank API has rate limits (1 request per 60 seconds for `/personal/*` endpoints)

## 🛠️ Available Operations

| Operation | Description | Authentication | Endpoint |
|-----------|-------------|----------------|----------|
| **Get Client Info** | Retrieve full client details (clientId, name, permissions, accounts, jars, managedClients) | ✅ Required | `/personal/client-info` |
| **Get Accounts** | Retrieve list of client accounts | ✅ Required | `/personal/client-info` |
| **Get Jars** | Retrieve list of jars (savings pots) | ✅ Required | `/personal/client-info` |
| **Get Managed Accounts** | Retrieve list of managed accounts | ✅ Required | `/personal/client-info` |
| **Get Statement** | Retrieve account statement for specified period | ✅ Required | `/personal/statement/{accountId}/{from}/{to}` |
| **Get Currency Rates** | Retrieve current currency exchange rates | ❌ Public | `/bank/currency` |
| **Get Bank Sync** | Retrieve bank synchronization keys | ❌ Public | `/bank/sync` |

## 💡 Example Workflows

### Basic Account Information
1. Use **Get Client Info** to retrieve all client data
2. Process the response to extract specific information
3. Use in subsequent nodes for further processing

### Statement Analysis
1. Use **Get Accounts** to get available accounts
2. Use **Get Statement** with specific account ID and date range
3. Analyze transactions and generate reports

### Currency Monitoring
1. Use **Get Currency Rates** to fetch current rates
2. Set up periodic execution to monitor changes
3. Send notifications when rates meet specific criteria

## 🤝 Support the Developer

If you find this node useful, consider supporting its development to keep it maintained and updated! Your contributions help cover coffee and coding time. ☕

<p align="center">
  <a href="https://ko-fi.com/zblaze">
    <img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-fi"/>
  </a>
  <a href="https://commerce.coinbase.com/pay/144f37a1-7d1e-468c-979d-1c8c9bcfa14b">
    <img src="https://img.shields.io/badge/Coinbase-0052FF?style=for-the-badge&logo=Coinbase&logoColor=white" alt="Coinbase Commerce"/>
  </a>
</p>

Every little bit helps, and thank you for your support! 🙏

## 📄 License

[MIT](LICENSE) - See LICENSE file for details.

## 🆘 Support & Community

- 🐛 **Issues**: [GitHub Issues](https://github.com/zblaze/n8n-nodes-monobank/issues)
- 💬 **Community**: [Monobank API Telegram](https://t.me/monobank_api)
- 📖 **Documentation**: [Monobank API Docs](https://api.monobank.ua/docs/index.html)
- 🔑 **API Cabinet**: [Get your API token](https://api.monobank.ua/)

## 🏗️ Development

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### Building from Source
```bash
git clone https://github.com/zblaze/n8n-nodes-monobank.git
cd n8n-nodes-monobank
npm install
npm run build
```

---

<p align="center">
  Made with ❤️ for the n8n community
  <br>
  <small>This is an unofficial community project and is not affiliated with Monobank</small>
</p>
