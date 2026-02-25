use aes_gcm::{Aes256Gcm, Key, Nonce, KeyInit, aead::Aead};
use anchor_client::solana_sdk::pubkey::Pubkey;
use rand::RngCore;

pub struct RegistrationPayload {
    pub gene_name: String,
    pub price: u64,
    pub raw_data: Vec<u8>,
}

pub async fn register_genomic_data(payload: RegistrationPayload) -> Result<(), Box<dyn std::error::Error>> {
    // --- STEP 1: ENCRYPTION ---
    let mut key_bytes = [0u8; 32];
    rand::thread_rng().fill_bytes(&mut key_bytes);
    let key = Key::<Aes256Gcm>::from_slice(&key_bytes);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(b"unique nonce"); // In prod, generate per file

    let encrypted_data = cipher.encrypt(nonce, payload.raw_data.as_ref())
        .expect("Encryption failed");

    // --- STEP 2: SIMULATED SHARD UPLOAD ---
    // In a real scenario, use an IPFS client here
    let ipfs_hash = "Qm...exampleHash"; 

    // --- STEP 3: SOLANA TRANSACTION ---
    // Call the 'register_data' function from your Anchor program
    // (Requires setting up anchor_client RequestBuilder)
    println!("Registering ownership on Solana for hash: {}", ipfs_hash);

    // --- STEP 4: WEAVIATE INDEXING ---
    let client = reqwest::Client::new();
    client.post("http://localhost:8080/v1/objects")
        .json(&serde_json::json!({
            "class": "GenomicData",
            "properties": {
                "geneName": payload.gene_name,
                "metadataHash": ipfs_hash,
                "pricePerQuery": payload.price,
                "ownerAddress": "SOLANA_WALLET_PUBKEY"
            }
        }))
        .send()
        .await?;

    Ok(())
}