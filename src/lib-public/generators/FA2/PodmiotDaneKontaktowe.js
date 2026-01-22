import { createLabelText, getTable } from '../../../shared/PDF-functions';
export function generateDaneKontaktowe(daneKontaktowe) {
    return getTable(daneKontaktowe)?.map((daneKontaktowe) => {
        return [
            createLabelText('E-mail: ', daneKontaktowe.Email),
            createLabelText('Tel.: ', daneKontaktowe.Telefon),
        ];
    });
}
