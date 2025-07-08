"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";


export default function RegisterPage() {
  const userId = useUserStore((state) => state.userId);
  const router = useRouter();
  const setUserId = useUserStore((state) => state.setUserId);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:4000/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Hola"+data +typeof data);

    if (res.ok) {
      toast.success("Registration successful. You can now log in.");

      setUserId(data);

      console.log("Mkid"+userId)

      await fetch(`http://localhost:4000/createShoppingCart/${data}`, {
        method: "GET",
      });

      router.push("/login");
    } else {
      toast.error(data.error || "An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username" className="mb-3">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-3">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password" className="mb-3">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="role" className="mb-3">
            Account Type
          </Label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1"
          >
            <option value="user">Client</option>
            <option value="artist">Artist</option>
          </select>
        </div>
        <Button type="submit" className="w-full bg-blue-600" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
