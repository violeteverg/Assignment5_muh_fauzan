import { Router } from "express";
import customerRouter from "./customerRoute";
import addressRouter from "./addressRoute";
import contactRouter from "./contactRoute";
import orderRouter from "./orderRoute";

const router = Router();

router.use("/api", customerRouter);
router.use("/api", addressRouter);
router.use("/api", contactRouter);
router.use("/api", orderRouter);

export default router;
