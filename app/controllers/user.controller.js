import Bootcamp from '../models/bootcamp.model.js';
import User from '../models/user.model.js';
import db from '../config/db.config.js';

export const createUser = async (nombre, apellido, correo) => {
    const transaccion = await db.transaction();
    try {
        const nuevoUsuario = await User.create(
            {
                lastName: apellido,
                firstName: nombre,
                email: correo
            },
            { transaction: transaccion }
        )
        await transaccion.commit();
        console.log('Usuario creado:', nuevoUsuario.dataValues);
        return nuevoUsuario;
    } catch (error) {
        console.error(`Ha ocurrido un error: ${error}`);
        await transaccion.rollback();
        throw error;
    }
}

export const findUserById = async (id) => {
    try {
        const usuario = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName'],
            include: {
                model: Bootcamp,
                attributes: ['id', 'title', 'cue', 'description'],
            },
        });

        if (!usuario) {
            throw new Error(`Usuario con id=${id} no encontrado`);
        }

        const resultado = {
            userId: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            bootcamps: usuario.Bootcamps.map((bootcamp) => ({
                bootcampId: bootcamp.id,
                title: bootcamp.title,
                cue: bootcamp.cue,
                description: bootcamp.description,
            })),
        };
        console.log('Usuario encontrado:', resultado);
        return resultado;
    } catch (error) {
        console.error(`Ha ocurrido un error en findUserById: ${error.message}`);
        throw error;
    }
};

export const findAll = async () => {
    try {
        const usuarios = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            include: {
                model: Bootcamp,
                attributes: ['id', 'title', 'cue', 'description'],
            },
        });
        const resultado = usuarios.map((usuario) => ({
            userId: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            bootcamps: usuario.Bootcamps.map((bootcamp) => ({
                bootcampId: bootcamp.id,
                title: bootcamp.title,
                cue: bootcamp.cue,
                description: bootcamp.description,
            })),
        }));
        console.log('Todos los usuarios:', resultado);
        return resultado;
    } catch (error) {
        console.error(`Ha ocurrido un error en findAll: ${error}`);
        throw error;
    }
};

export const updateUserById = async (id, nombre, apellido, correo) => {

    try {
        const usuarioOriginal = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'email']
        });
        console.log('Usuario original:', usuarioOriginal.dataValues);
        const camposAActualizar = {};
        if (nombre) camposAActualizar.firstName = nombre;
        if (apellido) camposAActualizar.lastName = apellido;
        if (correo) camposAActualizar.email = correo;

        if (Object.keys(camposAActualizar).length === 0) {
            throw new Error('No se proporcionaron campos para actualizar.');
        }

        const [affectedRows] = await User.update(
            camposAActualizar, 
            {
                where: { id: id },
            }
        );

        if (affectedRows === 0) {
            throw new Error(`Usuario con id=${id} no encontrado.`);
        }

        const usuarioActualizar = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'email']
        });
        console.log('Usuario actualizado:', usuarioActualizar.dataValues);
        return usuarioActualizar; 
    } catch (error) {
        console.error(`Ha ocurrido un error en updateUserById: ${error.message}`);
        throw error;
    }
};


export const deleteUserById = async (id) => {
    try {
        const usuarioEliminado = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'email']
        }
        );

        await User.destroy({
            where: {
                id: id
            },
            returning: true,
            plain: true
        })
        console.log('Usuario eliminado:', usuarioEliminado.dataValues);
        return usuarioEliminado;
    } catch (error) {
        console.error(`Ha ocurrido un error en deleteUserById: ${error}`);
        throw error;
    }
}
