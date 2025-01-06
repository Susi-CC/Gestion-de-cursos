// Importar módulos necesarios
import dotenv from 'dotenv';
import db from './app/config/db.config.js'; // Configuración de la base de datos
import { index, User, Bootcamp } from './app/models/index.js';
import { createUser, findUserById, findAll, updateUserById, deleteUserById } from './app/controllers/user.controller.js';
import { createBootcamp, addUser, findById, findAllBootcamps } from './app/controllers/bootcamp.controller.js';

// Configurar dotenv para variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3000;

// Inicializar y sembrar datos de prueba
const seedData = async () => {
    try {
        // Inicializar modelos y relaciones
        await index();

        // Crear usuarios
        const user1 = await createUser('Mateo', 'Díaz', 'mateo.diaz@correo.com');
        const user2 = await createUser('Santiago', 'Mejías', 'santiago.mejias@correo.com');
        const user3 = await createUser('Lucas', 'Rojas', 'lucas.rojas@correo.com');

        console.log(`Usuarios creados: ${user1.id}, ${user2.id}, ${user3.id}`);

        // Crear bootcamps
        const bootcamp1 = await createBootcamp('React Bootcamp', 10, 'Aprende React.js');
        const bootcamp2 = await createBootcamp('Web Development', 8, 'Desarrollo Full Stack');

        console.log(`Bootcamps creados: ${bootcamp1.id}, ${bootcamp2.id}`);

        // Asociar usuarios a bootcamps
        await addUser(user1.id, bootcamp1.id);
        await addUser(user2.id, bootcamp1.id);
        await addUser(user3.id, bootcamp2.id);

        console.log('Usuarios asociados a los bootcamps.');

        // Probar funciones adicionales
        const bootcampById = await findById(bootcamp1.id);
        console.log('Bootcamp encontrado por ID:', bootcampById);

        const allBootcamps = await findAllBootcamps();
        console.log('Todos los bootcamps:', allBootcamps);

        const userById = await findUserById(user1.id);
        console.log('Usuario encontrado por ID:', userById);

        const allUsers = await findAll();
        console.log('Todos los usuarios:', allUsers);

        const updatedUser = await updateUserById(user1.id, 'Pedro', 'Sánchez', null);
        console.log('Usuario actualizado:', updatedUser);

        const deletedUser = await deleteUserById(user3.id);
        console.log('Usuario eliminado:', deletedUser);
    } catch (error) {
        console.error('Error al inicializar datos:', error);
    }
};

// Sincronización de la base de datos y arranque del servidor
db.sync({ force: false })
  .then(async () => {
    console.log('Base de datos sincronizada');
    await seedData();
    console.log(`Servidor listo para realizar pruebas en el puerto ${PORT}`);
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
