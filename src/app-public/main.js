import { generateInvoice, generatePDFUPO } from '../lib-public';
const inputInvoice = document.getElementById('xmlInput');
const inputUPO = document.getElementById('xmlInputUPO');
inputInvoice.addEventListener('change', async () => {
    const file = inputInvoice.files?.[0];
    if (!file) {
        return;
    }
    const additionalData = {
        nrKSeF: '5555555555-20250808-9231003CA67B-BE',
        qrCode: 'https://qr-test.ksef.mf.gov.pl/invoice/5265877635/26-10-2025/HS5E1zrA8WVjDNq_xMVIN5SD6nyRymmQ-BcYHReUAa0',
    };
    generateInvoice(file, additionalData, 'blob').then((data) => {
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
inputUPO.addEventListener('change', async () => {
    const file = inputUPO.files?.[0];
    if (!file) {
        return;
    }
    generatePDFUPO(file).then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
