"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CitiesType, LocationsType } from "@/app/types/types";
import { base_url } from "@/app/actions/cities_action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "@/app/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import { getLocation } from "@/app/actions/locations_action";
import AddLocation from "@/app/components/AddLocation/AddLocation";
import DeleteLocation from "@/app/components/DeleteLocation/DeleteLocation";
const emptyItem = {
  name: "",
  text: "",
  slug: "",
  created_at: "",
};
const Locations = () => {
  const [location, setLocation] = useState<CitiesType[]>([]);
  const pathname = usePathname().slice(4);
  useEffect(() => {
    receiveLocation();
  }, []);
  const receiveLocation = async () => {
    const res = await getLocation();
    setLocation(res?.data);
    console.log(res);
  };
  const [editItem, setEditItem] = useState(emptyItem)
  const [addLocation, setAddLocation] = useState(false)
  const toggle = () => {
    setAddLocation(false)
    setDeleteLocations(false)
    setEditItem(emptyItem)
  }
  const editLocation = (item: LocationsType) => {
    setEditItem(item)
    setAddLocation(true)
  }
  const [ID, setID] = useState<string | undefined>("")
  const [deleteLocations, setDeleteLocations] = useState(false)
  const removeLocation = (id: string | undefined) => {
    setID(id)
    setDeleteLocations(true)
  }
  return (
    <div className="pt-[80px]">
      <Navbar title={pathname} />
      <DeleteLocation open={deleteLocations} toggle={toggle} id={ID} setLocation={setLocation}/>
      <AddLocation open={addLocation} toggle={toggle} editItem={editItem} setLocation={setLocation}/>
      <div className="w-[100%] px-[20px] flex flex-col items-start gap-[20px] mt-[20px]">
        <Button variant="contained" onClick={()=>setAddLocation(true)}>Add Location</Button>
        <div className="w-[100%] grid grid-cols-5 gap-[20px]">
          {location?.map((item, index) => (
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
                <Button size="small" onClick={()=>editLocation(item)}>
                  <EditIcon />
                </Button>
                <Button size="small" color="error" onClick={()=>removeLocation(item?.id)}>
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
