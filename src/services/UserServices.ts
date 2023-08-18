import User from "../models/UserModel";
import createHttpError from 'http-errors'


export const getAllUsersService = async () => {
    const users = await User.find({}, { password: 0 });
    const count = await User.countDocuments();
    return { users, count };
}

export const addUserService = async (user: any) => {
    const newUser = await User.create(user)
    return newUser
}

export const getUserByIdService = async (id: string) => {

    const user = await User.findById(id, { password: 0 });

    if (!user) {
        throw new createHttpError.NotFound('User not found')
    }
    return user;
}