import dotenv from 'dotenv';
import db from './app/config/db.config.js'; // Configuración de la base de datos
import { index, User, Bootcamp } from './app/models/index.js';
import { createUser, findUserById, findAll, updateUserById, deleteUserById } from './app/controllers/user.controller.js';
import { createBootcamp, addUser, findById, findAllBootcamps } from './app/controllers/bootcamp.controller.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const seedData = async () => {
    try {
        await index();

        const user1 = await createUser('Mateo', 'Díaz', 'mateo.diaz@correo.com');
        const user2 = await createUser('Santiago', 'Mejías', 'santiago.mejias@correo.com');
        const user3 = await createUser('Lucas', 'Rojas', 'lucas.rojas@correo.com');
        const user4 = await createUser('Facundo', 'Fernandez', 'facundo.fernandez@correo.com');

        const bootcamp1 = await createBootcamp('Introduciendo El Bootcamp De React.', 10, 'React es la librería más usada en JavaScript para el desarrollo de interfaces.');
        const bootcamp2 = await createBootcamp('Bootcamp Desarrollo Web Full Stack', 12, 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.');
        const bootcamp3 = await createBootcamp('Bootcamp Big Data, Inteligencia Artificial & Machine Learning.', 18, 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzadosde Artificial Intelligence y Machine Learning.');

        await addUser(user1.id, bootcamp1.id);
        await addUser(user2.id, bootcamp1.id);
        await addUser(user1.id, bootcamp2.id);
        await addUser(user1.id, bootcamp3.id);
        await addUser(user2.id, bootcamp3.id);
        await addUser(user3.id, bootcamp3.id);

        await findById(1);
        await findAllBootcamps();
        await findUserById(1);
        await findAll();

        await updateUserById(1, 'Pedro', 'Sánchez', null);
        await deleteUserById(1);

    } catch (error) {
        console.error('Error al inicializar datos:', error);
    }
};
db.sync({ force: false })
    .then(async () => {
        console.log('Base de datos sincronizada');
        await seedData();
        console.log(`Servidor listo para realizar pruebas en el puerto ${PORT}`);
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });
