# CreditFi Testing Guide

This guide will help you test the CreditFi protocol on the Sepolia testnet.

## Prerequisites

1. Install Node.js (v16 or later)
2. Install MetaMask or another Web3 wallet
3. Get some Sepolia ETH from a faucet (links below)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/alefly28/CreditFi.git
cd CreditFi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your credentials:
```bash
cp .env.example .env
```

Edit the `.env` file with your:
- ALCHEMY_API_KEY
- ETHERSCAN_API_KEY
- PRIVATE_KEY (from your test wallet)

## Testnet Faucets

Get Sepolia ETH from these faucets:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)

## Running Tests

1. Run the local test suite:
```bash
npx hardhat test
```

2. Deploy to Sepolia testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Interact with deployed contracts:
```bash
npx hardhat run scripts/interact.js --network sepolia
```

## Testing the Frontend

1. Navigate to the frontend directory:
```bash
cd creditfi-frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Connect your wallet (make sure it's on Sepolia network)

## Test Scenarios

### Basic Testing
1. Connect your wallet
2. Check your initial credit score
3. Make a deposit
4. Try borrowing with different collateral amounts

### Advanced Testing
1. Test loan repayments
2. Check credit score changes
3. Test liquidation scenarios
4. Try emergency functions (admin only)

## Reporting Issues

If you encounter any issues:
1. Check the console for error messages
2. Verify your wallet is on Sepolia network
3. Ensure you have enough Sepolia ETH
4. Create an issue on GitHub with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Console logs
   - Transaction hashes (if applicable)

## Security Testing

When testing, please note:
- Use only test ETH
- Don't share your private keys
- Report security issues privately
- Test all error conditions
- Verify contract interactions

## Contract Addresses

After deployment, you can find the contract addresses in:
- `deployments-sepolia.json`
- The frontend `.env` file
- Our documentation site

## Monitoring

Monitor your test transactions on:
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- The CreditFi dashboard
- MetaMask activity

## Need Help?

- Join our [Discord](https://discord.gg/creditfi)
- Check the [Documentation](https://docs.creditfi.finance)
- Email: support@creditfi.finance 