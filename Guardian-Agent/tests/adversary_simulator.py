from scapy.all import IP, TCP, UDP, send, conf
import time
import random

TARGET_IP = "127.0.0.1"  # Target your local Guardian-Agent

def send_benign_traffic():
    """Simulates normal web browsing traffic."""
    print("🟢 Sending Benign Traffic...")
    for _ in range(5):
        pkt = IP(dst=TARGET_IP)/TCP(dport=443, flags="S")
        send(pkt, verbose=False)
        time.sleep(random.uniform(0.5, 2.0))

def simulate_port_scan():
    """Simulates a Reconnaissance/Port Scan."""
    print("🟡 Simulating Port Scan...")
    for port in [21, 22, 80, 443, 8080]:
        pkt = IP(dst=TARGET_IP)/TCP(dport=port, flags="S")
        send(pkt, verbose=False)

def simulate_syn_flood():
    """Simulates a DDoS SYN Flood."""
    print("🔴 Simulating SYN Flood (DDoS)...")
    for _ in range(100):
        # Spoofing source IP for higher realism
        spoofed_ip = f"10.0.0.{random.randint(1, 254)}"
        pkt = IP(src=spoofed_ip, dst=TARGET_IP)/TCP(dport=80, flags="S")
        send(pkt, verbose=False)

if __name__ == "__main__":
    while True:
        choice = input("Select: [1] Benign [2] Port Scan [3] DDoS [q] Quit: ")
        if choice == '1': send_benign_traffic()
        elif choice == '2': simulate_port_scan()
        elif choice == '3': simulate_syn_flood()
        elif choice == 'q': break