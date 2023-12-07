import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    // Add an array of ObjectId references to Pokemon model
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
})
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string,any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const getUserPokemonsById = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate('pokemons');
        if (!user) {
            throw new Error('User not found');
        }
        return user.pokemons;
    } catch (error) {
        throw error;
    }
};