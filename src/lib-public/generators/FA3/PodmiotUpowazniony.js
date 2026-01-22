import { createHeader, createLabelText, hasValue } from '../../../shared/PDF-functions';
import { generatePodmiotAdres } from './PodmiotAdres';
import { generateDaneIdentyfikacyjneTPodmiot1Dto } from './PodmiotDaneIdentyfikacyjneTPodmiot1Dto';
import { generatePodmiotUpowaznionyDaneKontaktowe } from './PodmiotUpowaznionyDaneKontaktowe';
import { getRolaUpowaznionegoString } from '../../../shared/generators/common/functions';
export function generatePodmiotUpowazniony(podmiotUpowazniony) {
    if (!podmiotUpowazniony) {
        return [];
    }
    const result = createHeader('Podmiot upoważniony');
    if (hasValue(podmiotUpowazniony.RolaPU)) {
        result.push(createLabelText('Rola: ', getRolaUpowaznionegoString(podmiotUpowazniony.RolaPU, 3)));
    }
    if (hasValue(podmiotUpowazniony.NrEORI)) {
        result.push(createLabelText('Numer EORI: ', podmiotUpowazniony.NrEORI));
    }
    if (podmiotUpowazniony.DaneIdentyfikacyjne) {
        result.push(generateDaneIdentyfikacyjneTPodmiot1Dto(podmiotUpowazniony.DaneIdentyfikacyjne));
    }
    result.push([
        ...generatePodmiotAdres(podmiotUpowazniony.Adres),
        ...generatePodmiotAdres(podmiotUpowazniony.AdresKoresp, 'Adres korespondencyjny'),
        ...generatePodmiotUpowaznionyDaneKontaktowe(podmiotUpowazniony.DaneKontaktowe),
    ]);
    return result;
}
