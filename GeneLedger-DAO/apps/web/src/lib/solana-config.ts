import { PublicKey } from '@solana/web3.js';
import idl from '../idl/geneledger_dao.json';

// This ID is now automatically synced by your deploy script
export const PROGRAM_ID = new PublicKey(idl.metadata.address);

export const getProgram = (provider: any) => {
  // @ts-ignore
  return new Program(idl, PROGRAM_ID, provider);
};