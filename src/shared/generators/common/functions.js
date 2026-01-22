import { FA1RolaPodmiotu3, FA2RolaPodmiotu3, FA3RolaPodmiotu3, FormaPlatnosci, RodzajTransportu, TRolaPodmiotuUpowaznionegoFA1, TRolaPodmiotuUpowaznionegoFA2, TRolaPodmiotuUpowaznionegoFA3, TypLadunku, TypRachunkowWlasnych, } from '../../consts/const';
export function getRolaString(rola, FA) {
    if (!rola || !rola._text) {
        return '';
    }
    switch (FA) {
        case 1:
            return FA1RolaPodmiotu3[rola._text];
        case 2:
            return FA2RolaPodmiotu3[rola._text];
        case 3:
            return FA3RolaPodmiotu3[rola._text];
    }
}
export function getRolaUpowaznionegoString(rola, FA) {
    if (!rola || !rola._text) {
        return '';
    }
    switch (FA) {
        case 1:
            return TRolaPodmiotuUpowaznionegoFA1[rola._text].split('-')[0] ?? '';
        case 2:
            return TRolaPodmiotuUpowaznionegoFA2[rola._text].split('-')[0] ?? '';
        case 3:
            return TRolaPodmiotuUpowaznionegoFA3[rola._text].split('-')[0] ?? '';
    }
}
export function getFormaPlatnosciString(formaPlatnosci) {
    if (!formaPlatnosci || !formaPlatnosci._text) {
        return '';
    }
    return FormaPlatnosci[formaPlatnosci._text] ?? '';
}
export function getRodzajTransportuString(rodzajTransportu) {
    if (!rodzajTransportu || !rodzajTransportu._text) {
        return '';
    }
    return RodzajTransportu[rodzajTransportu._text] ?? '';
}
export function getOpisTransportuString(opisTransportu) {
    if (!opisTransportu || !opisTransportu._text) {
        return '';
    }
    return TypLadunku[opisTransportu._text] ?? '';
}
export function getTypRachunkowWlasnych(typRachonkowWlasnych) {
    if (!typRachonkowWlasnych || !typRachonkowWlasnych._text) {
        return '';
    }
    return TypRachunkowWlasnych[typRachonkowWlasnych._text] ?? '';
}
export function formatDateTime(data, withoutSeconds, withoutTime) {
    if (!data) {
        return '';
    }
    const dateTime = new Date(data);
    if (isNaN(dateTime.getTime())) {
        return data;
    }
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    if (withoutTime) {
        return `${day}.${month}.${year}`;
    }
    else if (withoutSeconds) {
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
export function getDateTimeWithoutSeconds(isoDate) {
    if (!isoDate?._text) {
        return '';
    }
    return formatDateTime(isoDate._text, true);
}
export function formatTime(data, withoutSeconds) {
    if (!data) {
        return '';
    }
    const dateTime = new Date(data);
    if (isNaN(dateTime.getTime())) {
        return data;
    }
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    if (withoutSeconds) {
        return `${hours}:${minutes}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}
