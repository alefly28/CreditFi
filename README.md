# CreditFi

CreditFi is a decentralized lending platform that introduces credit scores to crypto lending, making DeFi lending more accessible and efficient.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://creditfi.onrender.com)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](./LICENSE)
[![Security: Bug Bounty](https://img.shields.io/badge/security-bug%20bounty-blue)](./SECURITY.md)

## Important Notice

This software is proprietary and confidential. Use is subject to license terms. See [LICENSE](./LICENSE) and [TERMS_OF_USE.md](./TERMS_OF_USE.md) for details.

## Features

- 🏦 Decentralized lending and borrowing
- 📈 DeFi credit score system (0-850)
- 🔒 Flash loan protection
- 💰 Competitive interest rates
- 🎁 Loyalty rewards program
- ⚡ Real-time transaction notifications
- 📱 Mobile-responsive interface

## Quick Start

1. Visit [CreditFi](https://creditfi.onrender.com)
2. Connect your wallet
3. Get testnet tokens from our faucet
4. Start lending or borrowing!

## For Developers

### Prerequisites

- Node.js >= 14
- npm >= 6
- Hardhat

### Installation

```bash
git clone https://github.com/alefly28/creditfi.git
cd creditfi
npm install
```

### Configuration

Create a `.env` file:
```env
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_key
ETHERSCAN_API_KEY=your_etherscan_key
```

### Running Tests

```bash
npx hardhat test
npx hardhat coverage
```

### Local Development

```bash
# Start local hardhat node
npx hardhat node

# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Start frontend
cd frontend
npm install
npm start
```

## Smart Contracts (Sepolia Testnet)

- CreditScore: [address]
- LendingPool: [address]
- LendingGovernance: [address]
- TestnetFaucet: [address]

## Security

- [Security Policy and Bug Bounty](./SECURITY.md)
- [Audit Preparation](./AUDIT.md)
- [Known Issues](./SECURITY.md#known-issues)

## Documentation

- [Technical Documentation](https://docs.creditfi.finance)
- [API Documentation](https://api.creditfi.finance/docs)
- [User Guide](https://docs.creditfi.finance/guide)
- [GitHub Repository](https://github.com/alefly28/CreditFi) - Full source code and documentation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Community

- [Discord](https://discord.gg/creditfi)
- [Twitter](https://twitter.com/CreditFi_)
- [Blog](https://blog.creditfi.finance)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenZeppelin for secure contract implementations
- Chainlink for price feeds
- The entire DeFi community for inspiration
