"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from "next/navigation";
const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api"
export default function OutlinedCard() {
  const [number,setNumber] = React.useState<string>("")
  const [password,setPassword] = React.useState<string>("")
  const router = useRouter()
  const pathname = usePathname().split("/")[1]
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      phone_number: number,
      password: password
    }
    fetch(`${base_url}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res)=> res.json()).then((data)=> {
      localStorage.setItem("accessToken", data?.data?.tokens?.accessToken?.token);
      if (data?.success === true) {
        toast.success(data?.message)
        router.push(`/${pathname}/home`)
      }else {
        toast.error(data?.message)
      }
    }).catch((err)=> {
      console.log(err);
      toast.error(err?.message)
    })
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <Box sx={{ minWidth: 275 }}>
        <Card
          variant="outlined"
          className="p-[20px] flex flex-col items-center gap-[10px]"
        >
            <h1>Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[20px]">
            <TextField
              id="standard-basic"
              variant="standard"
              label="Phone number"
              onChange={(e)=>setNumber(e?.target?.value)}
              />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Password"
              onChange={(e)=>setPassword(e?.target?.value)}
            />
            <Button variant="outlined" type="submit">Login</Button>
          </form>
        </Card>
      </Box>
    </div>
  );
}
