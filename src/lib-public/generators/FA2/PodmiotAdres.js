import { createHeader, createSubHeader } from '../../../shared/PDF-functions';
import { generateAdres } from './Adres';
export function generatePodmiotAdres(podmiotAdres, headerTitle = 'Adres', isSubheader = false, headerMargin) {
    if (!podmiotAdres) {
        return [];
    }
    return [
        ...(isSubheader ? createSubHeader(headerTitle, headerMargin) : createHeader(headerTitle, headerMargin)),
        ...generateAdres(podmiotAdres),
    ];
}
