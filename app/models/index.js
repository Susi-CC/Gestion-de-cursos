import User from './user.model.js';
import Bootcamp from './bootcamp.model.js';
import db from '../config/db.config.js';

export const index = async () => {
    try {
        User.belongsToMany(Bootcamp, { through: 'UserBootcamp', foreignKey: 'UserId' });
        Bootcamp.belongsToMany(User, { through: 'UserBootcamp', foreignKey: 'BootcampId' });

        await db.authenticate();
        console.log('La conexión a la Base de Datos fue exitosa.');

        await db.sync({ force: true });
        console.log('Las tablas se han creado correctamente.');
    } catch (error) {
        console.error(`Ha ocurrido un error al inicializar los modelos: ${error.message}`);
    }
};

export { User, Bootcamp };
