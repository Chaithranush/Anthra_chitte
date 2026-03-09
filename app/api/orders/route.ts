import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(payload.userId) })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json(
      orders.map((o) => ({
        id: o._id.toString(),
        items: o.items,
        total: o.total,
        address: o.address,
        status: o.status,
        createdAt: o.createdAt,
      }))
    );
  } catch (err) {
    console.error("API /orders GET error:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { items, total, address } = body;

    if (!Array.isArray(items) || items.length === 0 || typeof total !== "number") {
      return NextResponse.json(
        { error: "Invalid order: items array and total required" },
        { status: 400 }
      );
    }

    const orderItems = items.map((i: Record<string, unknown>) => ({
      productId: i.productId ?? i.id,
      name: i.name,
      price: Number(i.price),
      quantity: Number(i.quantity),
      image: i.image,
      size: i.size,
      config: i.config,
    }));

    const orderAddress =
      address &&
      typeof address === "object" &&
      address.addressLine1 &&
      address.city &&
      address.state &&
      address.pincode &&
      address.phone
        ? {
            addressLine1: String(address.addressLine1),
            addressLine2: address.addressLine2 ? String(address.addressLine2) : undefined,
            city: String(address.city),
            state: String(address.state),
            pincode: String(address.pincode),
            phone: String(address.phone),
          }
        : undefined;

    await connectDB();

    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(payload.userId),
      items: orderItems,
      total,
      address: orderAddress,
      status: "pending",
    });

    return NextResponse.json({
      id: order._id.toString(),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    });
  } catch (err) {
    console.error("API /orders POST error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
