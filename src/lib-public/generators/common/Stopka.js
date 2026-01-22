import { createHeader, createLabelText, createSection, createSubHeader, formatText, generateLine, generateQRCode, generateTwoColumns, getContentTable, getTable, verticalSpacing, } from '../../../shared/PDF-functions';
import { generateZalaczniki } from './Zalaczniki';
import FormatTyp from '../../../shared/enums/common.enum';
export function generateStopka(additionalData, stopka, naglowek, wz, zalacznik) {
    const wzty = generateWZ(wz);
    const rejestry = generateRejestry(stopka);
    const informacje = generateInformacje(stopka);
    const qrCode = generateQRCodeData(additionalData);
    const zalaczniki = !additionalData?.isMobile ? generateZalaczniki(zalacznik) : [];
    const result = [
        verticalSpacing(1),
        ...(wzty.length ? [generateLine()] : []),
        ...(wzty.length ? [generateTwoColumns(wzty, [])] : []),
        ...(rejestry.length || informacje.length ? [generateLine()] : []),
        ...rejestry,
        ...informacje,
        ...(zalaczniki.length ? zalaczniki : []),
        { stack: [...qrCode], unbreakable: true },
        createSection([
            {
                stack: createLabelText('Wytworzona w: ', naglowek?.SystemInfo),
                margin: [0, 8, 0, 0],
            },
        ], true, [0, 0, 0, 0]),
    ];
    return createSection(result, false);
}
function generateWZ(wz) {
    const result = [];
    const definedHeader = [{ name: '', title: 'Numer WZ', format: FormatTyp.Default }];
    const faWiersze = getTable(wz ?? []);
    const content = getContentTable([...definedHeader], faWiersze, '*');
    if (content.fieldsWithValue.length && content.content) {
        result.push(createSubHeader('Numery dokumentów magazynowych WZ', [0, 8, 0, 4]));
        result.push(content.content);
    }
    return result;
}
function generateRejestry(stopka) {
    const result = [];
    const definedHeader = [
        { name: 'PelnaNazwa', title: 'Pełna nazwa', format: FormatTyp.Default },
        { name: 'KRS', title: 'KRS', format: FormatTyp.Default },
        { name: 'REGON', title: 'REGON', format: FormatTyp.Default },
        { name: 'BDO', title: 'BDO', format: FormatTyp.Default },
    ];
    const faWiersze = getTable(stopka?.Rejestry ?? []);
    const content = getContentTable([...definedHeader], faWiersze, '*');
    if (content.fieldsWithValue.length && content.content) {
        result.push(createHeader('Rejestry'));
        result.push(content.content);
    }
    return result;
}
function generateInformacje(stopka) {
    const result = [];
    const definedHeader = [
        { name: 'StopkaFaktury', title: 'Stopka faktury', format: FormatTyp.Default },
    ];
    const faWiersze = getTable(stopka?.Informacje ?? []);
    const content = getContentTable([...definedHeader], faWiersze, '*');
    if (content.fieldsWithValue.length && content.content) {
        result.push(createHeader('Pozostałe informacje'));
        result.push(content.content);
    }
    return result;
}
function generateQRCodeData(additionalData) {
    const result = [];
    if (additionalData?.qrCode && additionalData.nrKSeF) {
        const qrCode = generateQRCode(additionalData.qrCode);
        result.push(createHeader('Sprawdź, czy Twoja faktura znajduje się w KSeF!'));
        if (qrCode) {
            result.push({
                columns: [
                    {
                        stack: [
                            qrCode,
                            {
                                stack: [formatText(additionalData.nrKSeF, FormatTyp.Default)],
                                width: 'auto',
                                alignment: 'center',
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                            },
                        ],
                        width: 150,
                    },
                    {
                        stack: [
                            formatText('Nie możesz zeskanować kodu z obrazka? Kliknij w link weryfikacyjny i przejdź do weryfikacji faktury!', FormatTyp.Value),
                            {
                                stack: [formatText(additionalData.qrCode, FormatTyp.Link)],
                                marginTop: 5,
                                link: additionalData.qrCode,
                            },
                        ],
                        margin: [10, (qrCode.fit ?? 120) / 2 - 30, 0, 0],
                        width: 'auto',
                    },
                ],
            });
        }
    }
    return createSection(result, true);
}
