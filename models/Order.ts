import mongoose, { Schema, model, models } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  config?: Record<string, unknown>;
}

export interface IOrderAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  address?: IOrderAddress;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    size: { type: String },
    config: { type: Schema.Types.Mixed },
  },
  { _id: false }
);

const OrderAddressSchema = new Schema(
  {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    address: { type: OrderAddressSchema },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1, createdAt: -1 });

export const Order = models.Order ?? model<IOrder>("Order", OrderSchema);
