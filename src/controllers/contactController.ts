import { Request, Response } from "express";
import prisma from "../db/prisma";

// Get all contacts for a specific customer
export const getContactsForCustomer = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
      include: { contacts: true },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }
    res.status(200).json({ message: "ok", data: customer.contacts });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Create a new contact for a customer
export const createContact = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { phone, email } = req.body;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }
    const newContact = await prisma.contact.create({
      data: {
        phone,
        email,
        customer_id: Number(customer_id),
      },
    });
    res.status(201).json({ message: "created", data: newContact });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Update a contact for a customer
export const updateContact = async (req: Request, res: Response) => {
  const { contact_id } = req.params;
  const { phone, email } = req.body;
  try {
    const contact = await prisma.contact.findUnique({
      where: { contact_id: Number(contact_id) },
    });
    if (!contact) {
      res.status(404).json({ message: "Kontak tidak ditemukan." });
    }
    const updatedContact = await prisma.contact.update({
      where: { contact_id: Number(contact_id) },
      data: { phone, email },
    });
    res.status(200).json({ message: "update", data: updatedContact });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Delete a contact for a customer
export const deleteContact = async (req: Request, res: Response) => {
  const { contact_id } = req.params;
  try {
    const contact = await prisma.contact.findUnique({
      where: { contact_id: Number(contact_id) },
    });
    if (!contact) {
      res.status(404).json({ message: "Kontak tidak ditemukan." });
    }
    await prisma.contact.delete({ where: { contact_id: Number(contact_id) } });
    res.status(204).send({ message: "delete" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
