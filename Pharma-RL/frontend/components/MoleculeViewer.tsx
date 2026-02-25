// frontend/components/MoleculeViewer.tsx
import { useEffect, useRef } from 'react';

export default function MoleculeViewer({ data }: { data: string }) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && viewerRef.current) {
      // @ts-ignore - 3Dmol is often loaded via script or global
      const $3Dmol = window.$3Dmol; 
      const viewer = $3Dmol.createViewer(viewerRef.current, { backgroundColor: "black" });
      
      // 'data' here should be a PDB or SDF string
      viewer.addModel(data, "sdf"); 
      viewer.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
      viewer.zoomTo();
      viewer.render();
    }
  }, [data]);

  return <div ref={viewerRef} className="w-full h-[400px] rounded-lg border border-slate-700" />;
}