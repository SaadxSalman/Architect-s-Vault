import React, { useEffect } from 'react';

export const MoleculeCanvas = ({ smiles }: { smiles: string }) => {
  useEffect(() => {
    // @ts-ignore - RDKit is usually loaded via script tag or dynamic import
    window.initRDKitModule().then((RDKit) => {
      const mol = RDKit.get_mol(smiles);
      const svg = mol.get_svg();
      document.getElementById('mol-container')!.innerHTML = svg;
    });
  }, [smiles]);

  return <div id="mol-container" className="p-4 bg-white rounded-lg shadow-inner" />;
};