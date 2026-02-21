import { Activity, Upload } from 'lucide-react';

interface ModalProps {
  uploading: boolean;
  onClose: () => void;
  onUpload: () => void;
}

export default function PrescriptionModal({ uploading, onClose, onUpload }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="text-center">
          <div className="bg-sky-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="text-sky-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Rx Required</h3>
          <p className="text-slate-500 text-sm mt-2">Professional verification is needed.</p>
          <div className="mt-8 border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:border-sky-400 cursor-pointer transition-all group relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={onUpload} 
            />
            <Upload className="mx-auto text-slate-300 group-hover:text-sky-500 transition mb-3" size={40} />
            <p className="text-sm font-bold text-slate-500">{uploading ? 'Processing...' : 'Upload Prescription'}</p>
          </div>
          <button onClick={onClose} className="mt-8 text-slate-400 text-xs font-bold uppercase">Cancel</button>
        </div>
      </div>
    </div>
  );
}