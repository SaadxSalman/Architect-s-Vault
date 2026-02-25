import { Canvas } from '@react-three/fiber';
import { DigitalHuman } from '../components/Avatar/DigitalHuman';
import { PersonaClient } from '../components/PersonaClient'; // The logic we built earlier

export default function PersonaPage() {
  return (
    <main className="relative h-screen w-full bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      
      {/* 1. Background Layer: The 3D Avatar */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} />
          <DigitalHuman expression="happy" influence={0.7} />
        </Canvas>
      </div>

      {/* 2. Top Left: Project Branding */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-white text-2xl font-bold tracking-tighter">
          PERSONA<span className="text-blue-500 underline underline-offset-4">AGENT</span>
        </h1>
        <p className="text-slate-400 text-xs font-mono">v1.0.0 // User: {saadsalmanakram}</p>
      </div>

      {/* 3. Top Right: Vision Agent (Webcam Overlay) */}
      <div className="absolute top-6 right-6 z-20 border-2 border-blue-500/30 rounded-xl overflow-hidden shadow-2xl bg-black w-64">
        <div className="bg-blue-500/10 px-3 py-1 text-[10px] text-blue-400 font-mono flex justify-between">
          <span>LIVE_VISION_FEED</span>
          <span className="animate-pulse">● REC</span>
        </div>
        <PersonaClient /> {/* This component contains the <video> tag */}
      </div>

      {/* 4. Bottom Center: Chat & Analysis Data */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl">
          <div className="flex gap-4 items-end">
            <input 
              type="text" 
              placeholder="Ask the Persona anything..." 
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Send
            </button>
          </div>
          
          {/* Real-time Analysis Tags */}
          <div className="mt-4 flex gap-2">
            <span className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">EMOTION: JOY</span>
            <span className="text-[10px] px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30">GAZE: STABLE</span>
          </div>
        </div>
      </div>

    </main>
  );
}