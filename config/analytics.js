// Analytics Configuration

const METRICS = {
  // User Metrics
  USER: {
    WALLET_CONNECTED: 'wallet_connected',
    CREDIT_SCORE_CHECKED: 'credit_score_checked',
    LOAN_INITIATED: 'loan_initiated',
    LOAN_REPAID: 'loan_repaid',
    DEPOSIT_MADE: 'deposit_made',
    WITHDRAWAL_MADE: 'withdrawal_made',
  },

  // Protocol Metrics
  PROTOCOL: {
    TVL: 'total_value_locked',
    ACTIVE_LOANS: 'active_loans',
    TOTAL_BORROWED: 'total_borrowed',
    TOTAL_REPAID: 'total_repaid',
    LIQUIDATIONS: 'liquidations',
    AVERAGE_CREDIT_SCORE: 'average_credit_score',
  },

  // Smart Contract Events
  CONTRACT: {
    BORROW_EVENT: 'LoanTaken',
    REPAY_EVENT: 'LoanRepaid',
    DEPOSIT_EVENT: 'Deposited',
    WITHDRAW_EVENT: 'Withdrawn',
    LIQUIDATION_EVENT: 'LoanLiquidated',
    SCORE_UPDATE: 'CreditScoreUpdated',
  },
};

const TRACKING_ENDPOINTS = {
  PRODUCTION: 'https://analytics.creditfi.finance/track',
  STAGING: 'https://staging-analytics.creditfi.finance/track',
  LOCAL: 'http://localhost:3001/track',
};

const EXTERNAL_SERVICES = {
  // Google Analytics
  GA: {
    TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID,
    ENABLED: true,
  },

  // Segment
  SEGMENT: {
    WRITE_KEY: process.env.REACT_APP_SEGMENT_WRITE_KEY,
    ENABLED: true,
  },

  // Custom Analytics
  INTERNAL: {
    API_KEY: process.env.REACT_APP_ANALYTICS_API_KEY,
    ENABLED: true,
  },
};

const TRACKING_CONFIG = {
  // General Settings
  ENABLED: true,
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  BATCH_EVENTS: true,
  BATCH_SIZE: 10,
  BATCH_INTERVAL: 5000, // 5 seconds

  // Privacy Settings
  ANONYMIZE_IPS: true,
  RESPECT_DNT: true, // Do Not Track
  COOKIE_CONSENT_REQUIRED: true,

  // Rate Limiting
  MAX_EVENTS_PER_MINUTE: 60,
  THROTTLE_THRESHOLD: 100,

  // Data Retention
  RETENTION_PERIOD: 90, // days
};

// Event Categories
const EVENT_CATEGORIES = {
  USER_INTERACTION: 'user_interaction',
  PROTOCOL_METRICS: 'protocol_metrics',
  SMART_CONTRACT: 'smart_contract',
  PERFORMANCE: 'performance',
  ERROR: 'error',
};

// Event Properties to Track
const EVENT_PROPERTIES = {
  TIMESTAMP: 'timestamp',
  USER_ADDRESS: 'user_address',
  NETWORK_ID: 'network_id',
  TRANSACTION_HASH: 'transaction_hash',
  GAS_USED: 'gas_used',
  STATUS: 'status',
  ERROR_MESSAGE: 'error_message',
  CREDIT_SCORE: 'credit_score',
  AMOUNT: 'amount',
  COLLATERAL: 'collateral',
};

// Analytics Class
class Analytics {
  constructor(config = {}) {
    this.config = { ...TRACKING_CONFIG, ...config };
    this.eventQueue = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Initialize external services
    if (EXTERNAL_SERVICES.GA.ENABLED) {
      this.initGoogleAnalytics();
    }

    if (EXTERNAL_SERVICES.SEGMENT.ENABLED) {
      this.initSegment();
    }

    if (EXTERNAL_SERVICES.INTERNAL.ENABLED) {
      this.initInternalAnalytics();
    }

    // Start batch processing if enabled
    if (this.config.BATCH_EVENTS) {
      this.startBatchProcessing();
    }

    this.initialized = true;
  }

  trackEvent(category, action, properties = {}) {
    if (!this.config.ENABLED) return;

    const event = {
      category,
      action,
      properties: {
        ...properties,
        timestamp: Date.now(),
      },
    };

    if (this.config.BATCH_EVENTS) {
      this.queueEvent(event);
    } else {
      this.sendEvent(event);
    }
  }

  queueEvent(event) {
    this.eventQueue.push(event);
    if (this.eventQueue.length >= this.config.BATCH_SIZE) {
      this.processEventQueue();
    }
  }

  async processEventQueue() {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await this.sendEvents(events);
    } catch (error) {
      console.error('Failed to process event queue:', error);
      // Requeue failed events
      this.eventQueue = [...events, ...this.eventQueue];
    }
  }

  async sendEvents(events) {
    // Implementation for sending events to analytics backend
  }

  // Utility methods
  setUser(address) {
    // Set user identity for tracking
  }

  clearUser() {
    // Clear user identity
  }
}

// Export configurations and Analytics class
export {
  METRICS,
  TRACKING_ENDPOINTS,
  EXTERNAL_SERVICES,
  TRACKING_CONFIG,
  EVENT_CATEGORIES,
  EVENT_PROPERTIES,
  Analytics,
}; 