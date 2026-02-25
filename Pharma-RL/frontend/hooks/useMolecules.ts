// frontend/hooks/useMolecules.ts
import { Connection, PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";

export const fetchMolecules = async () => {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  // The IDL is generated when you run 'anchor build' in the blockchain folder
  const idl = await fetch('/idl.json').json(); 
  const programId = new PublicKey("YOUR_PROGRAM_ID");
  
  const provider = new AnchorProvider(connection, (window as any).solana, {});
  const program = new Program(idl as Idl, programId, provider);

  // Fetch all accounts of type 'MoleculeData'
  const accounts = await program.account.moleculeData.all();
  return accounts.map(acc => acc.account);
};

export function useMolecules() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const getCandidates = async () => {
    const provider = new AnchorProvider(connection, wallet as any, {});
    const idl = await (await fetch('/idl.json')).json();
    const program = new Program(idl, "YOUR_PROGRAM_ID", provider);
    
    // Fetch all accounts created by the pharma_log program
    return await program.account.moleculeData.all();
  };

  return { getCandidates };
}