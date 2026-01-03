"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Đảm bảo bạn có file này trong components/ui
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
      alert(error.message || "Lỗi đăng ký");
    } else {
      alert("Đăng ký thành công! Đang chuyển hướng...");
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="mx-auto text-lg md:text-xl text-center">
            Tạo tài khoản 8bits (Email)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name">Họ và tên</label>
              <Input
                id="name"
                placeholder="Nguyễn Văn A"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Mật khẩu</label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button 
              className="w-full mt-2" 
              onClick={handleRegister} 
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng ký bằng Email"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs md:text-sm">
          <p className="mx-auto text-muted-foreground">
            Đã có tài khoản? &nbsp;
            <Link href="/login" className="text-blue-500 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
