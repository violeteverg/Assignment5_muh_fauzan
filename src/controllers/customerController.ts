import { Request, Response } from "express";
import prisma from "../db/prisma";

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: { contacts: true, addresses: true, orders: true },
    });
    res.status(200).json({ message: "ok", data: customers });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Get a customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
      include: { contacts: true, addresses: true, orders: true },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
  const { name, contacts, addresses } = req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        contacts: {
          create: contacts,
        },
        addresses: {
          create: addresses,
        },
      },
    });
    res.status(201).json({ message: "created", data: newCustomer });
  } catch (error) {
    console.log();
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error,
    });
  }
};

// Update customer
export const updateCustomer = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { name, contacts, addresses } = req.body;

  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
    });

    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { customer_id: Number(customer_id) },
      data: {
        name,
        contacts: {
          upsert: contacts.map((contact: any) => ({
            where: { contact_id: contact.contact_id },
            update: contact,
            create: contact,
          })),
        },
        addresses: {
          upsert: addresses.map((address: any) => ({
            where: { address_id: address.address_id },
            update: address,
            create: address,
          })),
        },
      },
    });

    res.status(200).json({
      message: "Pelanggan berhasil diperbarui",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Delete customer
export const deleteCustomer = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }
    await prisma.customer.delete({
      where: { customer_id: Number(customer_id) },
    });
    res.status(204).send({ message: "berhasil menghapus data pelanggan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
