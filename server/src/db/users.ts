import mongoose from "mongoose";
import { PokemonSchema, getPokemonById } from "./pokemons";
import cron from "node-cron";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String, default: "../../../pokefront/public/images/profile-picture.jpeg" },
    rolls: { type: Number, default: 10 },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
});

export const UserModel = mongoose.model('User', UserSchema);

cron.schedule("0 */2 * * *", async () => {
    try {
      // Find all users
      const users = await UserModel.find();
  
      // Update the rolls field for each user
      const updatePromises = users.map(async (user) => {
        const updatedUser = await UserModel.findByIdAndUpdate(
          user._id,
          { $inc: { rolls: 1 } }, // Increment rolls by 1
          { new: true } // Return the updated document
        );
        return updatedUser;
      });
  
      // Wait for all updates to complete
      await Promise.all(updatePromises);
  
      console.log("Rolls updated for all users");
    } catch (error) {
      console.error("Error updating rolls:", error);
    }
  });

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
        const promises = user.pokemons.map(async (pokemonId) => {
            return await getPokemonById(pokemonId._id.toString());
        });

        const pokemons = await Promise.all(promises);

        return pokemons;
    } catch (error) {
        throw error;
    }
};
