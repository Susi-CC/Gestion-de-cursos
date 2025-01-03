import { index, User, Bootcamp } from './app/models/index.js';

const seedData = async () => {
    try {
        // Inicializar modelos y relaciones
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

// Ejecutar la función para inicializar datos
seedData();
