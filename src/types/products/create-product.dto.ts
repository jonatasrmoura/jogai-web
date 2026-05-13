import z from "zod";
import { createProductSchema } from "../../components/forms/new-product-form/new-product-schema";

export type CreateProductDTO = z.infer<typeof createProductSchema>;
