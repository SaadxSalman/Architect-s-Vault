import { useAnchorProvider, useProgram } from '@/hooks/useSolana'; // Custom hooks for provider
import { BN } from '@coral-xyz/anchor';

export const AidDashboard = () => {
  const { program } = useProgram(); // Loads IDL and Program instance

  const handleReport = async () => {
    try {
      await program.methods
        .reportCrisis("Flood", 8)
        .accounts({
          // Anchor often infers these if using PDAs correctly
          authority: wallet.publicKey,
        })
        .rpc();
      alert("Crisis logged on Solana!");
    } catch (err) {
      console.error("Transaction failed", err);
    }
  };

  return <button onClick={handleReport}>Log Crisis On-Chain</button>;
};