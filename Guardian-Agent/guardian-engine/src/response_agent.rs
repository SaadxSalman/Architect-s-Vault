// In guardian-engine/src/response_agent.rs
use std::process::Command;

pub fn quarantine_ip(ip: &str) -> std::io::Result<()> {
    Command::new("iptables")
        .args(["-A", "INPUT", "-s", ip, "-j", "DROP"])
        .status()?;
    println!("🛡️ Successfully quarantined: {}", ip);
    Ok(())
}