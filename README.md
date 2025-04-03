# CreditFi

CreditFi is a decentralized lending platform that incorporates credit scoring into DeFi, enabling more efficient borrowing and lending based on on-chain reputation.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://creditfi.onrender.com)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](./LICENSE)
[![Security: Bug Bounty](https://img.shields.io/badge/security-bug%20bounty-blue)](./SECURITY.md)

## Important Notice

This software is proprietary and confidential. Use is subject to license terms. See [LICENSE](./LICENSE) and [TERMS_OF_USE.md](./TERMS_OF_USE.md) for details.

## Features

- **On-chain Credit Scoring**: Build your credit score through consistent on-chain activity
- **Reputation-based Lending**: Get better lending terms based on your credit score
- **Decentralized Lending**: Supply and borrow assets directly from the protocol
- **Reward System**: Earn rewards for providing liquidity and maintaining good borrowing habits

## Technology Stack

- **Frontend**: React, Material UI, Web3React
- **Smart Contracts**: Solidity, Hardhat
- **Testing**: Waffle, Ethers.js
- **Deployment**: Render, GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MetaMask or another Web3 wallet
- Sepolia testnet ETH

### Installation

1. Clone the repository
```
git clone https://github.com/alefly28/CreditFi.git
cd CreditFi
```

2. Install dependencies
```
npm install
cd creditfi-frontend
npm install --legacy-peer-deps
```

3. Start the development server
```
npm start
```

### Smart Contract Deployment

1. Setup environment variables
```
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

2. Deploy contracts
```
npx hardhat run scripts/deploy.js --network sepolia
```

## Usage

1. Connect your wallet
2. Get test tokens from our faucet
3. Supply assets to earn interest
4. Build your credit score through consistent repayments
5. Access better borrowing terms as your score improves

## Deployment

The frontend is deployed on Render at [https://creditfi.onrender.com](https://creditfi.onrender.com)

### Manual Deployment

To deploy the frontend manually:
```
cd creditfi-frontend
node deploy-to-render.js
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

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenZeppelin for secure contract implementations
- Chainlink for price feeds
- The entire DeFi community for inspiration

## Contact

For any questions or feedback, please open an issue on GitHub.
