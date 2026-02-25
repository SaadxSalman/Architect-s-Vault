use std::process::{Command, Stdio};
use std::io::Write;
use opencv::{prelude::*, videoio};

pub fn start_streaming() {
    // 1. Setup FFmpeg Command
    // This command takes raw RGB frames and outputs HLS segments to a public folder
    let mut child = Command::new("ffmpeg")
        .args([
            "-f", "rawvideo",
            "-pixel_format", "bgr24",
            "-video_size", "1280x720",
            "-i", "-", // Read from stdin
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-tune", "zerolatency",
            "-f", "hls",
            "-hls_time", "1", // 1-second segments for low latency
            "-hls_list_size", "3",
            "-hls_flags", "delete_segments",
            "../frontend-next/public/live/stream.m3u8"
        ])
        .stdin(Stdio::piped())
        .spawn()
        .expect("Failed to start FFmpeg");

    let mut stdin = child.stdin.take().expect("Failed to open stdin");

    // 2. Capture and Pipe Loop
    let mut cam = videoio::VideoCapture::from_file("rtsp://stream_url", videoio::CAP_ANY).unwrap();
    let mut frame = Mat::default();

    loop {
        if cam.read(&mut frame).unwrap() {
            // Here you would run your Vision Transformer logic/Drawing bounding boxes
            
            // Convert Mat to raw bytes
            let data = frame.data_bytes().unwrap();
            stdin.write_all(data).unwrap();
        }
    }
}