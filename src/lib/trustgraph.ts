
export interface TrustGraphFactors {
  transactionHistory: number; // 25%
  protocolInteraction: number; // 20%
  liquidityProvision: number; // 15%
  loanRepayment: number; // 20%
  governanceParticipation: number; // 10%
  timeInEcosystem: number; // 10%
}

export const calculateTrustGraphScore = (factors: TrustGraphFactors): number => {
  const score = (
    factors.transactionHistory * 0.25 +
    factors.protocolInteraction * 0.20 +
    factors.liquidityProvision * 0.15 +
    factors.loanRepayment * 0.20 +
    factors.governanceParticipation * 0.10 +
    factors.timeInEcosystem * 0.10
  );
  
  return Math.round(Math.max(300, Math.min(850, score)));
};

export const getTrustGraphGrade = (score: number): string => {
  if (score >= 800) return 'A+';
  if (score >= 750) return 'A';
  if (score >= 700) return 'A-';
  if (score >= 650) return 'B+';
  if (score >= 600) return 'B';
  if (score >= 550) return 'B-';
  if (score >= 500) return 'C+';
  if (score >= 450) return 'C';
  if (score >= 400) return 'C-';
  if (score >= 350) return 'D';
  return 'F';
};

export const getTrustGraphTier = (score: number): string => {
  if (score >= 750) return 'Excellent';
  if (score >= 650) return 'Good';
  if (score >= 550) return 'Fair';
  return 'Poor';
};

export const getTrustGraphColor = (score: number): string => {
  if (score >= 750) return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
  if (score >= 650) return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
  if (score >= 550) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300';
  return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
};

export const getVaultEligibility = (score: number, vaultRisk: string): boolean => {
  switch (vaultRisk) {
    case 'Low':
      return score >= 600; // B or better
    case 'Medium':
      return score >= 650; // B+ or better
    case 'High':
      return score >= 700; // A- or better
    default:
      return true;
  }
};

export const getUserTrustGraphData = () => {
  // Mock data - in real app this would come from blockchain analysis
  const factors: TrustGraphFactors = {
    transactionHistory: 720,
    protocolInteraction: 680,
    liquidityProvision: 600,
    loanRepayment: 780,
    governanceParticipation: 520,
    timeInEcosystem: 650
  };
  
  const score = calculateTrustGraphScore(factors);
  
  return {
    score,
    factors,
    grade: getTrustGraphGrade(score),
    tier: getTrustGraphTier(score),
    color: getTrustGraphColor(score)
  };
};
