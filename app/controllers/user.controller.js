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
        return nuevoUsuario;
    } catch (error) {
        console.error(`Ha ocurrido un error: ${error}`);
        await transaccion.rollback();
        throw error;
    }
}

export const findUserById = async (id) => {
    try {
        // Buscar usuario por ID y obtener solo los datos específicos
        const usuario = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName'], // Atributos del usuario
            include: {
                model: Bootcamp,
                attributes: ['id', 'title', 'cue', 'description'], // Atributos del bootcamp
            },
        });

        if (!usuario) {
            throw new Error(`Usuario con id=${id} no encontrado`);
        }

        // Formatear la respuesta para incluir solo los datos requeridos
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

        return resultado;
    } catch (error) {
        console.error(`Ha ocurrido un error en findUserById: ${error.message}`);
        throw error;
    }
};

export const findAll = async () => {
    try {
        const encusuarios = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'], // Atributos del usuario
            include: {
                model: Bootcamp,
                attributes: ['id', 'title', 'cue', 'description'], // Atributos del bootcamp
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

        return resultado;
    } catch (error) {
        console.error(`Ha ocurrido un error en findAll: ${error}`);
        throw error;
    }
};
//Función para modificar las marcas
export const modificarMarca = async (id, marca) => {
    try {
        const marcaActualizar = await Marca.update(
            {
                nombre: marca
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return marcaActualizar;
    } catch (error) {
        console.error(`Ha ocurrido un error: ${error}`);
    }
}

//Eliminar marca
export const eliminarMarca = async (id) => {
    try {
        const marcaEliminada = await detalleMarca(id);
        const marcaAEliminar = await Marca.destroy({
            where: {
                id: id
            },
            returning: true,
            plain: true
        })
        return marcaEliminada;
    } catch (error) {
        console.error(`Ha ocurrido un error: ${error}`);
    }
}