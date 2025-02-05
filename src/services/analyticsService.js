import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from '../utils/constants';

export class AnalyticsService {
  constructor(provider, chainId) {
    this.provider = provider;
    this.chainId = chainId;
  }

  async getTotalValueLocked() {
    const lendingPool = new ethers.Contract(
      CONTRACT_ADDRESSES[this.chainId].lendingPool,
      ['function totalDeposits() view returns (uint256)'],
      this.provider
    );
    return lendingPool.totalDeposits();
  }

  async getUtilizationRate() {
    const lendingPool = new ethers.Contract(
      CONTRACT_ADDRESSES[this.chainId].lendingPool,
      [
        'function totalDeposits() view returns (uint256)',
        'function totalBorrowed() view returns (uint256)'
      ],
      this.provider
    );

    const [deposits, borrowed] = await Promise.all([
      lendingPool.totalDeposits(),
      lendingPool.totalBorrowed()
    ]);

    return borrowed.mul(100).div(deposits);
  }

  async getAverageCreditScore() {
    const creditScore = new ethers.Contract(
      CONTRACT_ADDRESSES[this.chainId].creditScore,
      ['function getAverageCreditScore() view returns (uint256)'],
      this.provider
    );
    return creditScore.getAverageCreditScore();
  }
} 