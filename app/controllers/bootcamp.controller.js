import Bootcamp from '../models/bootcamp.model.js';
import User from '../models/user.model.js';
import db from '../config/db.config.js';

export const createBootcamp = async (titulo, Cue, descripcion) => {
    const transaccion = await db.transaction();
    try {
        const nuevoBootcamp = await Bootcamp.create(
            {
                title: titulo,
                cue: Cue,
                description: descripcion
            },
            { transaction: transaccion }
        )
        await transaccion.commit();
        console.log('Bootcamp creado:', nuevoBootcamp.dataValues);
        return nuevoBootcamp;
    } catch (error) {
        console.error(`Ha ocurrido un error: ${error}`);
        await transaccion.rollback();
        throw error;
    }
}

export const addUser = async (userId, bootcampId) => {
    const transaccion = await db.transaction();
    try {
        const usuario = await User.findByPk(userId);
        if (!usuario) {
            throw new Error(`Usuario con id=${userId} no encontrado`);
        }

        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            throw new Error(`Bootcamp con id=${bootcampId} no encontrado`);
        }

        await bootcamp.addUser(usuario, { transaction: transaccion });
        await transaccion.commit();
        console.log(`Agregado el usuario id=${userId} al bootcamp id=${bootcampId}`);
        return bootcamp;
    } catch (error) {
        console.error(`Ha ocurrido un error: ${error}`);
        await transaccion.rollback();
        throw error;
    }
};


export const findById = async (bootcampId) => {
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId, {
            attributes: ['id', 'title', 'cue', 'description'],
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'email'],
            }],
        });

        if (!bootcamp) {
            throw new Error(`Bootcamp con id=${bootcampId} no encontrado`);
        }

        const resultado = {
            bootcampId: bootcamp.id,
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description,
            users: bootcamp.Users.map((usuario) => ({
                userId: usuario.id,
                firstName: usuario.firstName,
                lastName: usuario.lastName,
                email: usuario.email,
            })),
        };
        console.log('Bootcamp encontrado:', resultado);
        return resultado;
    } catch (error) {
        console.error(`Ha ocurrido un error en findBootcampById: ${error.message}`);
        throw error;
    }
}

export const findAllBootcamps = async () => {
    try {
        const bootcamps = await Bootcamp.findAll({
            attributes: ['id', 'title', 'cue', 'description'],
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'email'],
            }],
        });
        const resultado = bootcamps.map((bootcamp) => ({
            bootcampId: bootcamp.id,
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description,
            users: bootcamp.Users.map((usuario) => ({
                userId: usuario.id,
                firstName: usuario.firstName,
                lastName: usuario.lastName,
                email: usuario.email,
            })),
        }));
        console.log('Todos los bootcamps:', resultado);
        return resultado;
    } catch (error) {
        console.error(`Ha ocurrido un error en findAllBootcamps: ${error.message}`);
        throw error;
    }
};
