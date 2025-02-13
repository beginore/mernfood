import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: String,
    variants: [String],
    prices: Object,
    category: String,
    image: String,
    description: String
});

const Food = mongoose.model("Food", foodSchema);

export default Food; 