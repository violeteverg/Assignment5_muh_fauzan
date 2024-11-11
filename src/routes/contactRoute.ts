import { Router } from "express";
import { deleteContact, updateContact } from "../controllers/contactController";

const contactRouter = Router();

contactRouter.put("/contacts/:contact_id", updateContact);

contactRouter.delete("/contacts/:contact_id", deleteContact);

export default contactRouter;
