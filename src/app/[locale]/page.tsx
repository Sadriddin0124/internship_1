"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import AuthBg from "@/assets/auth_bg.jpg";
import Image from "next/image";
const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
export default function OutlinedCard() {
  const [number, setNumber] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const router = useRouter();
  const pathname = usePathname().split("/")[1];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      phone_number: number,
      password: password,
    };
    fetch(`${base_url}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "accessToken",
          data?.data?.tokens?.accessToken?.token
        );
        if (data?.success === true) {
          toast.success(data?.message);
          router.push(`/${pathname}/category`);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
      });
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center relative">
      <Image
        src={AuthBg}
        alt="AuthBg"
        width={1000}
        height={1000}
        className=" absolute w-[100%] h-[100%] object-cover z-[-1]"
      />
      <div className="px-[20px] py-[50px] flex flex-col items-center gap-[10px] bg-[#ffffff25] w-[400px] min-h-[200px] backdrop-blur-lg">
        <h1 className="text-[30px] text-white">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[20px]"
        >
          <TextField
            id="standard-basic"
            variant="standard"
            label="Phone number"
            onChange={(e) => setNumber(e?.target?.value)}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            label="Password"
            onChange={(e) => setPassword(e?.target?.value)}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
