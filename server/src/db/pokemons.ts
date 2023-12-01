import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type1: { type: String, required: true },
    type2: { type: String, required: false },
    number: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
});

export const PokemonModel = mongoose.model('Pokemon', PokemonSchema);

export const getPokemons = () => PokemonModel.find();
export const getPokemonByName = (name: string) => PokemonModel.findOne({ name });
export const getPokemonById = (id: string) => PokemonModel.findById(id);
export const createPokemon = (values: Record<string, any>) => new PokemonModel(values).save().then((pokemon) => pokemon.toObject());
export const deletePokemonById = (id: string) => PokemonModel.findOneAndDelete({ _id: id });
export const updatePokemonById = (id: string, values: Record<string, any>) => PokemonModel.findByIdAndUpdate(id, values);