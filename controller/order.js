// controller/order.js
import Order from "../models/order.js";
import Cart from "../models/cart.js";

// controller/order.js
export const checkout = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ success: false, message: "Вы не авторизованы" });
        }

        const userId = req.session.user._id;

        // Находим корзину пользователя
        const cart = await Cart.findOne({ userId }).populate("items.foodId");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Корзина пуста" });
        }

        // Имитация оплаты
        const paymentSuccess = Math.random() > 0.1; // 90% успешной оплаты
        if (!paymentSuccess) {
            return res.status(400).json({ success: false, message: "Оплата не прошла" });
        }

        // Создаем новый заказ
        const order = new Order({
            userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
        });

        await order.save();

        // Очищаем корзину после оформления заказа
        await Cart.deleteOne({ userId });

        res.json({ success: true, message: "Заказ успешно оформлен", order });
    } catch (error) {
        console.error("Ошибка при оформлении заказа:", error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
};

// controller/order.js
export const getOrders = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ success: false, message: "Вы не авторизованы" });
        }

        const userId = req.session.user._id;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Ошибка при получении заказов:", error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
};