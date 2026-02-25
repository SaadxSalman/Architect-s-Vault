use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use tokio;

#[derive(Deserialize)]
struct FilePayload {
    path: String,
    content: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = std::env::args().collect();
    
    // Check if the command is "write" and we have a JSON payload
    if args.len() > 2 && args[1] == "batch-write" {
        let payload: Vec<FilePayload> = serde_json::from_str(&args[2])?;
        
        let mut handles = vec![];

        for file in payload {
            // Spawn a concurrent thread for each file write
            let handle = tokio::spawn(async move {
                let path = Path::new(&file.path);
                
                // Create directories if they don't exist
                if let Some(parent) = path.parent() {
                    fs::create_dir_all(parent).unwrap();
                }

                match fs::write(path, &file.content) {
                    Ok(_) => println!("Successfully wrote: {}", file.path),
                    Err(e) => eprintln!("Failed to write {}: {}", file.path, e),
                }
            });
            handles.push(handle);
        }

        // Wait for all writes to finish
        for handle in handles {
            let _ = handle.await;
        }
    }

    Ok(())
}