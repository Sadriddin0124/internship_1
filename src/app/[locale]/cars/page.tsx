"use client";
import { getCar } from "@/app/actions/cars_action";
import Navbar from "@/app/components/Navbar/Navbar";
import { CarsType } from "@/app/types/types";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCar from "@/app/components/AddCar/AddCar";
import DeleteCar from "@/app/components/DeleteCar/DeleteCar";
const Cars = () => {
  const pathname = usePathname().slice(4);
  const [carsData, setCarsData] = useState<CarsType[]>([])
  const [addCar, setAddCar] = useState(false)
  const [deleteCar, setDeleteCar] = useState(false)
  const [editItem, setEditItem] = useState<CarsType | null>(null)
  const [ID, setID] = useState<string | undefined>("")
  useEffect(()=> {
    receiveCars()
  },[])
  const receiveCars = async() => {
    const res = await getCar()
    setCarsData(res?.data);
  }
  const editCar = (item: CarsType) => {
    setAddCar(true)
    setEditItem(item)
  }
  const removeCar = (id: string | undefined) => {
    setID(id)
    setDeleteCar(true)
  }
  const toggle = () => {
    setAddCar(false)
    setEditItem(null)
    setDeleteCar(false)
  }
  return (
    <div className="pt-[80px]">
      <Navbar title={pathname} />
      <AddCar open={addCar} toggle={toggle} editItem={editItem} setCarsData={setCarsData}/>
      <DeleteCar open={deleteCar} toggle={toggle} setCars={setCarsData} id={ID}/>
      <div className="flex flex-col gap-[20px] items-start px-[20px]">
        <Button variant="contained" onClick={()=>setAddCar(true)}>Add Car</Button>
        <table className="w-[100%] border">
          <thead className=" bg_main text-white">
            <tr>
              <th className="border py-[10px]">T/R</th>
              <th className="border py-[10px]">Brand Title</th>
              <th className="border py-[10px]">Category EN/RU</th>
              <th className="border py-[10px]">City</th>
              <th className="border py-[10px]">Color</th>
              <th className="border py-[10px]">Model</th>
              <th className="border py-[10px]">Year</th>
              <th className="border py-[10px]">Price</th>
              <th className="border py-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {carsData?.map((item, index) => (
              <tr key={index} className="group">
                <th className="border">{index + 1}</th>
                <th className="border">{item?.brand?.title}</th>
                <th className="border">{item?.category?.name_en}/{item?.category?.name_ru}</th>
                <th className="border">{item?.city?.name}</th>
                <th className="border">{item?.color}</th>
                <th className="border">{item?.model?.name}</th>
                <th className="border">{item?.year}</th>
                <th className="border">{item?.price_in_usd}</th>
                <th className="border">
                  <Button
                    variant="contained"
                    onClick={() => editCar(item)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => removeCar(item?.id)}
                    color="error"
                    variant="contained"
                  ><DeleteIcon/></Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
