import cloudinary from 'cloudinary';


import { fileUpload } from '../../helpers/fileUpload';


cloudinary.v2.config(
    {
        cloud_name: 'dcnjl1zlw',
        api_key: '781532857836899',
        api_secret: 'A03RfJrSUMfNtWSw--c0vDHMrdg',
    }
);


describe('Pruebas en fileUpload', () => {
    test('debe de cargar un archivo y retornar el URL', async () => {
        const resp = await fetch('https://images.unsplash.com/photo-1548588627-f978862b85e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');


        // Borrar imagen por ID

        const segments = url!.split('/');
        const imageId = segments[segments?.length - 1].replace('.png', '');

        const { deleted } = await cloudinary.v2.api.delete_resources([imageId]);
        expect(deleted).toEqual({ [imageId]: "not_found" });

    });

    test('debe de retornar un error', async () => {

        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(undefined);

    });

});
