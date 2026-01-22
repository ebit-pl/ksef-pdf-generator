import { createHeader, generateTwoColumns } from '../../../shared/PDF-functions';
import { generatePodmiotAdres } from './PodmiotAdres';
import { generateDaneIdentyfikacyjne } from './PodmiotDaneIdentyfikacyjne';
export function generatePrzewoznik(przewoznik) {
    if (!przewoznik) {
        return [];
    }
    return [
        ...createHeader('Przewoźnik'),
        [
            generateTwoColumns(generateDaneIdentyfikacyjne(przewoznik.DaneIdentyfikacyjne), generatePodmiotAdres(przewoznik.AdresPrzewoznika, 'Adres przewoźnika', true, [0, 0, 0, 0]), [0, 0, 0, 8]),
        ],
    ];
}
