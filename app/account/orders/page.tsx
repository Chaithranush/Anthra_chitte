"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { getAuthCookie } from "@/lib/cookies";
import { ArrowLeft, Package, LogOut, User, Mail, MapPin } from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  config?: Record<string, unknown>;
}

interface OrderAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  address?: OrderAddress;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const token = useAuthStore((s) => s.token);
  const userName = useAuthStore((s) => s.userName);
  const userEmail = useAuthStore((s) => s.userEmail);
  const logout = useAuthStore((s) => s.logout);
  const hydrateFromCookie = useAuthStore((s) => s.hydrateFromCookie);
  const router = useRouter();
  const cookieData = typeof document !== "undefined" ? getAuthCookie() : null;
  const displayName = userName ?? cookieData?.name ?? "Account";
  const displayEmail = userEmail ?? cookieData?.email ?? "";

  useEffect(() => {
    hydrateFromCookie();
  }, [hydrateFromCookie]);

  useEffect(() => {
    const hasCookieAuth = !!getAuthCookie();
    if (!isLoggedIn && !hasCookieAuth) {
      router.replace("/login?redirect=/account/orders");
      return;
    }
    if (!token && !hasCookieAuth) return;

    const authToken = token ?? getAuthCookie()?.token;
    if (!authToken) return;
    fetch("/api/orders", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [isLoggedIn, token, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8" role="main">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>
          <Button variant="ghost" size="sm" onClick={() => { logout(); router.push("/"); }}>
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Profile</h2>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="font-semibold text-foreground text-lg truncate">
                {displayName}
              </p>
              {displayEmail && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground truncate">
                  <Mail className="h-4 w-4 shrink-0" />
                  {displayEmail}
                </p>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">
          Recent orders
        </h1>

        {loading ? (
          <p className="text-muted-foreground">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="w-16 h-16 text-muted-foreground opacity-50 mb-4" />
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <Button asChild>
              <Link href="/">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span
                    className={`text-sm font-medium capitalize ${
                      order.status === "pending"
                        ? "text-amber-600"
                        : order.status === "delivered"
                        ? "text-green-600"
                        : "text-foreground"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="relative w-14 h-14 shrink-0 rounded overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {order.address && (
                  <div className="px-4 pb-4">
                    <p className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>
                        {order.address.addressLine1}
                        {order.address.addressLine2 && `, ${order.address.addressLine2}`}
                        {`, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`}
                        {` • ${order.address.phone}`}
                      </span>
                    </p>
                  </div>
                )}
                <div className="p-4 border-t border-border flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-semibold text-primary">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
