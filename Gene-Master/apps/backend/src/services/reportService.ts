import PDFDocument from 'pdfkit';
import crypto from 'crypto';

export const generatePrivacyReport = (resultData: any, agentKeys: { privateKey: string }) => {
  const doc = new PDFDocument();
  
  // 1. Add Report Header
  doc.fontSize(20).text('Gene-Master: Privacy-Preserving Research Report', { align: 'center' });
  doc.moveDown();
  
  // 2. Insert Result Summary
  doc.fontSize(12).text(`Genes Analyzed: ${resultData.genes.join(', ')}`);
  doc.text(`Privacy Budget Used (Epsilon): ${resultData.epsilon}`);
  doc.text(`Statistical Significance: ${resultData.pValue}`);
  
  // 3. Cryptographic Signature
  const dataToSign = JSON.stringify(resultData);
  const signature = crypto.sign("sha256", Buffer.from(dataToSign), {
    key: agentKeys.privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  }).toString('hex');
  
  doc.moveDown();
  doc.fontSize(10).fillColor('gray').text('Digital Certificate of Privacy', { underline: true });
  doc.text(`Agent Signature: ${signature}`);
  doc.text(`Timestamp: ${new Date().toISOString()}`);

  return doc;
};