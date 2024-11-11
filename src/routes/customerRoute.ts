import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../controllers/customerController";
import {
  createAddress,
  getAddressesForCustomer,
} from "../controllers/addressController";
import {
  createContact,
  getContactsForCustomer,
} from "../controllers/contactController";
import {
  createOrderForCustomer,
  getOrdersByCustomer,
} from "../controllers/orderController";

const customerRouter = express.Router();

customerRouter.get("/customers", getAllCustomers);

customerRouter.get("/customers/:customer_id", getCustomerById);

customerRouter.post("/customers", createCustomer);

customerRouter.put("/customers/:customer_id", updateCustomer);

customerRouter.delete("/customers/:customer_id", deleteCustomer);

customerRouter.get(
  "/customers/:customer_id/addresses",
  getAddressesForCustomer
);

customerRouter.post("/customers/:customer_id/addresses", createAddress);

customerRouter.get("/customers/:customer_id/contacts", getContactsForCustomer);

customerRouter.post("/customers/:customer_id/contacts", createContact);

customerRouter.get("/customers/:customer_id/orders", getOrdersByCustomer);

customerRouter.post("/customers/:customer_id/orders", createOrderForCustomer);

export default customerRouter;
