# backend-ai/utils/pdf_generator.py
from fpdf import FPDF

class DiagnosticPDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'OncoSense-A.I. Diagnostic Report', 0, 1, 'C')

    def add_section(self, title, content):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, 0, 1)
        self.set_font('Arial', '', 11)
        self.multi_cell(0, 10, content)
        self.ln()

def export_report(filename, report_data):
    pdf = DiagnosticPDF()
    pdf.add_page()
    pdf.add_section("Patient Summary", report_data['history'])
    pdf.add_section("Pathology Analysis", report_data['path_findings'])
    pdf.output(filename)