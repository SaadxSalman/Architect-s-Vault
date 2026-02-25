import { Program, AnchorProvider, web3 } from "@project-serum/anchor";

export const registerOnChain = async (
  wallet: any, 
  metadataHash: string, 
  price: number
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(IDL, programId, provider);

  const dataAccount = web3.Keypair.generate();

  await program.methods
    .registerData(metadataHash, new BN(price))
    .accounts({
      dataAccount: dataAccount.publicKey,
      owner: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([dataAccount])
    .rpc();
    
  return dataAccount.publicKey.toBase58();
};