// routes/adminRoutes.js
import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import Food from "../models/food.js";

const router = express.Router();

// Получить все товары (для админ-панели)
router.get("/foods", isAdmin, async (req, res) => {
    try {
        const foods = await Food.find();
        res.render("admin/foods", { foods });
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
});

// Форма добавления нового товара
router.get("/foods/new", isAdmin, (req, res) => {
    res.render("admin/newFood");
});

// Добавить новый товар
router.post("/foods", isAdmin, async (req, res) => {
    try {
        const { name, variants, prices, category, image, description } = req.body;
        const newFood = new Food({ name, variants: variants.split(','), prices: JSON.parse(prices), category, image, description });
        await newFood.save();
        res.redirect("/admin/foods");
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
});

// Форма редактирования товара
router.get("/foods/:id/edit", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);
        res.render("admin/editFood", { food });
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
});

// Обновить товар
router.put("/foods/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, variants, prices, category, image, description } = req.body;
        const updatedFood = await Food.findByIdAndUpdate(id, { name, variants: variants.split(','), prices: JSON.parse(prices), category, image, description }, { new: true });
        res.redirect("/admin/foods");
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
});

// Удалить товар
router.delete("/foods/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Food.findByIdAndDelete(id);
        res.redirect("/admin/foods");
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
});

export default router;