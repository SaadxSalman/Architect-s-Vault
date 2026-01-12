#![deny(clippy::all)]

use napi_derive::napi;
use aes_gcm::{Aes256Gcm, Key, Nonce, KeyInit};
use aes_gcm::aead::{Aead, OsRng};

#[napi]
pub fn encrypt_rust(data: String, key_str: String) -> String {
    let key = Key::<Aes256Gcm>::from_slice(key_str.as_bytes());
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(b"unique nonce"); // In production, use random nonces

    let ciphertext = cipher.encrypt(nonce, data.as_ref())
        .expect("encryption failure!");
    
    hex::encode(ciphertext)
}

#[napi]
pub fn decrypt_rust(hex_data: String, key_str: String) -> String {
    let key = Key::<Aes256Gcm>::from_slice(key_str.as_bytes());
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(b"unique nonce");
    
    let ciphertext = hex::decode(hex_data).expect("Decoding failed");
    let plaintext = cipher.decrypt(nonce, ciphertext.as_ref())
        .expect("decryption failure!");

    String::from_utf8(plaintext).unwrap()
}