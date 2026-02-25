use pcap::Capture;

pub fn start_sniffing() {
    let device = pcap::Device::lookup().expect("No device found").expect("Error looking up device");
    println!("Sniffing on device: {}", device.name);

    let mut cap = Capture::from_device(device)
        .unwrap()
        .promisc(true)
        .snaplen(65535)
        .open()
        .unwrap();

    while let Ok(packet) = cap.next_packet() {
        // Here you would pass packet.data to your Gemma-3 model
        // and LanceDB for vector comparison.
        println!("Captured packet with length: {}", packet.header.len);
    }
}