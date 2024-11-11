import { Request, Response } from "express";
import prisma from "../db/prisma";

// Get all addresses for a specific customer
export const getAddressesForCustomer = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
      include: { addresses: true },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }
    res.status(200).json({ message: "ok", data: customer.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Create a new address for a customer
export const createAddress = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { full_address } = req.body;
  try {
    const customer = await prisma.customer.findUnique({
      where: { customer_id: Number(customer_id) },
    });
    if (!customer) {
      res.status(404).json({ message: "Pelanggan tidak ditemukan." });
    }
    const newAddress = await prisma.address.create({
      data: {
        full_address,
        customer_id: Number(customer_id),
      },
    });
    res.status(201).json({ message: "ok", data: newAddress });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server.", error: error });
  }
};

// Update an address for a customer
export const updateAddress = async (req: Request, res: Response) => {
  const { address_id } = req.params;
  const { full_address } = req.body;
  try {
    const address = await prisma.address.findUnique({
      where: { address_id: Number(address_id) },
    });
    if (!address) {
      res.status(404).json({ message: "Alamat tidak ditemukan." });
    }
    const updatedAddress = await prisma.address.update({
      where: { address_id: Number(address_id) },
      data: { full_address },
    });
    res.status(200).json({ message: "ok", data: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Delete an address for a customer
export const deleteAddress = async (req: Request, res: Response) => {
  const { address_id } = req.params;
  try {
    const address = await prisma.address.findUnique({
      where: { address_id: Number(address_id) },
    });
    if (!address) {
      res.status(404).json({ message: "Alamat tidak ditemukan." });
    }
    await prisma.address.delete({ where: { address_id: Number(address_id) } });
    res.status(204).send({ message: "delete" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
