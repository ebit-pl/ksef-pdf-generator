import { createHeader, generateTwoColumns } from '../../../shared/PDF-functions';
import { generatePodmiotAdres } from './PodmiotAdres';
import { generateDaneIdentyfikacyjneTPodmiot2Dto } from './PodmiotDaneIdentyfikacyjneTPodmiot2Dto';
export function generatePrzewoznik(przewoznik) {
    if (!przewoznik) {
        return [];
    }
    return [
        ...createHeader('Przewoźnik'),
        [
            generateTwoColumns(generateDaneIdentyfikacyjneTPodmiot2Dto(przewoznik.DaneIdentyfikacyjne), generatePodmiotAdres(przewoznik.AdresPrzewoznika, 'Adres przewoźnika', true, [0, 0, 0, 0]), [0, 0, 0, 8]),
        ],
    ];
}
