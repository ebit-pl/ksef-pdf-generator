import { createLabelText } from '../../../shared/PDF-functions';
export function generateDaneIdentyfikacyjneTPodmiot1Dto(daneIdentyfikacyjne) {
    return [
        createLabelText('NIP: ', daneIdentyfikacyjne.NIP),
        createLabelText('Nazwa: ', daneIdentyfikacyjne.Nazwa),
    ];
}
