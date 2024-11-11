import { Router } from "express";
import { deleteOrder, updateOrder } from "../controllers/orderController";

const orderRouter = Router();

orderRouter.put("/orders/:order_id", updateOrder);

orderRouter.delete("/orders/:order_id", deleteOrder);
export default orderRouter;
