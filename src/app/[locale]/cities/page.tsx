"use client";
import { base_url, getCities } from "@/app/actions/cities_action";
import Navbar from "@/app/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CitiesType } from "@/app/types/types";
import AddCity from "@/app/components/AddCity/AddCity";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCity from "@/app/components/DeleteCity/DeleteCity";
const emptyItem = {
  name: "",
  text: "",
  slug: "",
  created_at: ""
}
const Cities = () => {
  const pathname = usePathname().slice(4);
  useEffect(() => {
    receiveCities();
  }, []);
  const [cities, setCities] = useState<CitiesType[]>([]);
  const [editItem, setEditItem] = useState<CitiesType>(emptyItem)
  const receiveCities = async () => {
    const res = await getCities();
    console.log(res);
    setCities(res?.data?.data);
  };
  const [addCity, setAddCity] = useState(false)
  const [ID, setID] = useState<string | undefined>("")
  const toggle = () => {
    setAddCity(false)
    setDeleteModal(false)
    setEditItem(emptyItem)
  }
  const editCity = (item: CitiesType) => {
    setEditItem(item)
    setAddCity(true)
  }
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const removeCity = (id: string | undefined) => {
    setID(id)
    setDeleteModal(true)
  }
  return (
    <div className="pt-[80px]">
      <Navbar title={pathname} />
      <AddCity open={addCity} toggle={toggle} editItem={editItem} setCities={setCities}/>
      <DeleteCity open={deleteModal} toggle={toggle} id={ID} setCities={setCities}/>
      <div className="w-[100%] flex justify-center flex-col items-start gap-[20px] px-[20px] py-[50px]">
        <Button variant="contained" onClick={()=>setAddCity(!addCity)}>Add City</Button>
        <div className="w-[100%] grid grid-cols-5 gap-[20px]">
          {cities?.map((item, index) => (
            <Card sx={{ maxWidth: 400 }} key={index}>
              <CardMedia
                sx={{ height: 200 }}
                image={`${base_url}/uploads/images/${item?.image_src}`}
                title={item?.slug}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.text}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>editCity(item)}><EditIcon/></Button>
                <Button size="small" color="error" onClick={()=>removeCity(item?.id)}><DeleteIcon/></Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
