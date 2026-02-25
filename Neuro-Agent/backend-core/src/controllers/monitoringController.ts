export const checkDeclineTrend = (history: any[]) => {
  if (history.length < 2) return "Baseline established.";

  const latest = history[history.length - 1];
  const previous = history[history.length - 2];

  // Logic: If gait stability decreases by > 15% in 6 months
  const gaitDecline = (previous.gaitScore - latest.gaitScore) / previous.gaitScore;

  if (gaitDecline > 0.15) {
    return "ALERT: Significant gait instability detected. Immediate clinical review recommended.";
  }
  
  return "Stable";
};