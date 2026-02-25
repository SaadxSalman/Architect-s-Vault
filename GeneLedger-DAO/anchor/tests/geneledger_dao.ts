import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GeneledgerDao } from "../target/types/geneledger_dao";
import { expect } from "chai";

describe("geneledger-dao", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.GeneledgerDao as Program<GeneledgerDao>;

  it("Registers genomic data successfully", async () => {
    // Generate a new account for the data record
    const dataAccount = anchor.web3.Keypair.generate();
    
    const metadataHash = "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"; // Example IPFS Hash
    const price = new anchor.BN(50000000); // 0.05 SOL in Lamports

    // Execute the transaction
    await program.methods
      .registerData(metadataHash, price)
      .accounts({
        dataAccount: dataAccount.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([dataAccount])
      .rpc();

    // Fetch the account back to verify the data
    const account = await program.account.dataRecord.fetch(dataAccount.publicKey);

    expect(account.owner.toBase58()).to.equal(provider.wallet.publicKey.toBase58());
    expect(account.metadataHash).to.equal(metadataHash);
    expect(account.price.toNumber()).to.equal(price.toNumber());
    
    console.log("✅ Data successfully registered on-chain!");
  });
});