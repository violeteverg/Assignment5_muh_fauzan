import { Request, Response } from "express";
import prisma from "../db/prisma";

// Get all orders for a specific customer
export const getOrdersByCustomer = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }

    const orders = await prisma.order.findMany({
      where: { customer_id: Number(customer_id) },
    });
    res.status(200).json({ message: "ok", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Create a new order for a specific customer
export const createOrderForCustomer = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { total_amount, products } = req.body;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }

    const newOrder = await prisma.order.create({
      data: {
        total_amount,
        customer_id: Number(customer_id),
        products: JSON.stringify(products),
        status: "pending",
        order_date: new Date(),
      },
    });
    res.status(201).json({ message: "create", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const { status, total_amount, products } = req.body;
  try {
    const order = await prisma.order.findUnique({
      where: { order_id: Number(order_id) },
    });
    if (!order) {
      res.status(404).json({ message: "Pesanan tidak ditemukan." });
    }

    const updatedOrder = await prisma.order.update({
      where: { order_id: Number(order_id) },
      data: {
        status: status || order.status,
        total_amount: total_amount || order.total_amount,
        products: products ? JSON.stringify(products) : order.products,
      },
    });
    res.status(200).json({ message: "update", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { order_id: Number(order_id) },
    });
    if (!order) {
      res.status(404).json({ message: "Pesanan tidak ditemukan." });
    }
    await prisma.order.delete({ where: { order_id: Number(order_id) } });
    res.status(204).json({ message: "delete" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
