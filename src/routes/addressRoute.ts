import { Router } from "express";
import { updateAddress, deleteAddress } from "../controllers/addressController";

const addressRouter = Router();

addressRouter.put("/addresses/:address_id", updateAddress);

addressRouter.delete("/addresses/:address_id", deleteAddress);

export default addressRouter;
