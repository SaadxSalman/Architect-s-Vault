import os
from flask import Flask, request, jsonify
import whisper
from moviepy.editor import VideoFileClip

app = Flask(__name__)
# Load the Whisper model (base is fast, medium/large is more accurate for Urdu/Hindi)
model = whisper.load_model("base")

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/process-media', methods=['POST'])
def process_media():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        # Check if it's a video file
        if file.filename.lower().endswith(('.mp4', '.mov', '.avi')):
            audio_path = file_path + ".mp3"
            video = VideoFileClip(file_path)
            video.audio.write_audiofile(audio_path)
            process_path = audio_path
        else:
            process_path = file_path

        # Perform Transcription
        # We specify 'task="transcribe"' to get the source text
        result = model.transcribe(process_path)

        # Cleanup files
        os.remove(file_path)
        if process_path.endswith(".mp3"): os.remove(process_path)

        return jsonify({
            "text": result['text'],
            "language": result['language'], # Detects if it's ur, hi, etc.
            "segments": result['segments']
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)