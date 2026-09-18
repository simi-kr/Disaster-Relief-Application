const escapeCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`;

export const downloadCsv = (filename, rows) => {
    const headers = Object.keys(rows[0] || {});
    const csv = [headers, ...rows.map(row => headers.map(header => row[header]))]
        .map(row => row.map(escapeCell).join(','))
        .join('\r\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
};

export const downloadPdf = (filename, title, rows) => {
    const lines = [title, ...rows.map(row => Object.values(row).join(' | '))].map(line => String(line).replace(/[()\\]/g, '\\$&').slice(0, 110));
    const content = `BT /F1 12 Tf 50 760 Td ${lines.map((line, index) => `${index ? '0 -18 Td ' : ''}(${line}) Tj`).join(' ')} ET`;
    const objects = [
        '<< /Type /Catalog /Pages 2 0 R >>',
        '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
        `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => { offsets[index + 1] = pdf.length; pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
    const xref = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n `).join('\n')}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
};