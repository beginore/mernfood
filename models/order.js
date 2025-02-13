import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
            name: String,
            variant: String,
            quantity: Number,
            price: Number,
            image: String,
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Оплачено" }, // Статус заказа
    createdAt: { type: Date, default: Date.now }, // Дата создания заказа
});

export default mongoose.model("Order", OrderSchema);