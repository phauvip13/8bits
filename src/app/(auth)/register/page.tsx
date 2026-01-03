"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // Đảm bảo bạn có file này trong thư mục lib
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
    });

    if (error) {
      alert(error.message || "Có lỗi xảy ra khi đăng ký");
    } else {
      alert("Đăng ký thành công!");
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle className="mx-auto text-lg md:text-xl">
          Tạo tài khoản 8bits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Tên của bạn"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleRegister} 
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng ký ngay"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs md:text-sm">
        <p className="mx-auto">
          Đã có tài khoản? &nbsp;
          <Link href="/login" className="text-blue-500 font-medium">
            Đăng nhập
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
