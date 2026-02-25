export const RewardButton = ({ decisionId }: { decisionId: string }) => {
  const sendFeedback = async (value: number) => {
    await fetch(`http://localhost:5000/api/decision/${decisionId}/reward`, {
      method: 'POST',
      body: JSON.stringify({ reward: value }),
    });
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => sendFeedback(1)} className="bg-green-600 px-2 rounded">👍 Good Move</button>
      <button onClick={() => sendFeedback(-1)} className="bg-red-600 px-2 rounded">👎 Bad Move</button>
    </div>
  );
};