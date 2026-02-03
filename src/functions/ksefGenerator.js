const { app } = require('@azure/functions');
const { generatePDF } = require('../../index'); // Twoja istniejąca logika

app.http('generatePdf', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const xmlData = await request.text();
            // Tutaj wywołujesz swoją logikę generowania PDF
            // const pdfBuffer = await generatePDF(xmlData);

            return {
                status: 200,
                body: "PDF content", // Tutaj wstaw buffer/stream PDF
                headers: {
                    'Content-Type': 'application/pdf'
                }
            };
        } catch (error) {
            return { status: 500, body: `Error: ${error.message}` };
        }
    }
});