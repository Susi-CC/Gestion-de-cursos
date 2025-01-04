import express from 'express';
import { index, User, Bootcamp } from './app/models/index.js';
import { findUserById } from './app/controllers/user.controller.js';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Inicializar la base de datos y relaciones
const initializeDatabase = async () => {
    try {
        await index();

        // Crear usuarios
        const user1 = await User.create({ firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com' });
        const user2 = await User.create({ firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com' });
        const user3 = await User.create({ firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com' });

        console.log(`Usuarios creados: ${user1.id}, ${user2.id}, ${user3.id}`);

        // Crear bootcamps
        const bootcamp1 = await Bootcamp.create({ title: 'React Bootcamp', cue: 10, description: 'Aprende React.js' });
        const bootcamp2 = await Bootcamp.create({ title: 'Web Development', cue: 8, description: 'Desarrollo Full Stack' });

        console.log(`Bootcamps creados: ${bootcamp1.id}, ${bootcamp2.id}`);

        // Asociar usuarios a bootcamps
        await bootcamp1.addUser(user1);
        await bootcamp1.addUser(user2);
        await bootcamp2.addUser(user3);

        console.log('Usuarios asociados a los bootcamps.');
    } catch (error) {
        console.error('Error al inicializar datos:', error);
    }
};

// Cambiar la ruta para que sea compatible con /users/:id/bootcamps
app.get('/users/:id/bootcamps', async (req, res) => {
    try {
        const userId = req.params.id;
        const userWithBootcamps = await findUserById(userId);

        if (!userWithBootcamps) {
            return res.status(404).json({ error: `Usuario con id=${userId} no encontrado` });
        }

        res.status(200).json(userWithBootcamps);
    } catch (error) {
        console.error(`Error al buscar el usuario con id=${req.params.id}:`, error.message);
        res.status(500).json({ error: error.message });
    }
});


// Iniciar el servidor
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    await initializeDatabase(); // Crear datos iniciales
});
