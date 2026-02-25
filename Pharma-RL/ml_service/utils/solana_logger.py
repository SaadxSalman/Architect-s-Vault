from solana.rpc.api import Client
from solders.keypair import Keypair
from anchorpy import Program, Provider, Wallet

async def log_to_solana(smiles, reward):
    # Connect to Devnet
    client = Client("https://api.devnet.solana.com")
    wallet = Wallet(Keypair.from_base58_string("YOUR_PRIVATE_KEY"))
    provider = Provider(client, wallet)
    
    # Load your compiled Anchor Program
    program = await Program.at("PROGRAM_ID", provider)
    
    # Send transaction
    await program.rpc["log_molecule"](
        smiles, 
        int(reward * 100), # Store as integer for on-chain precision
        ctx={"accounts": {"molecule_record": record_pda, "user": wallet.public_key}}
    )
    print(f"✅ Molecule {smiles} logged to Solana!")