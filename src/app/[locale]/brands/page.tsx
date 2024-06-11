"use client"
import { getBrand } from '@/app/actions/brands_action'
import Navbar from '@/app/components/Navbar/Navbar'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BrandsType } from "@/app/types/types";
import { base_url } from "@/app/actions/cities_action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Brands = () => {
    const [brands, setBrands] = useState<BrandsType[]>([])
    const pathname = usePathname().slice(4)
    useEffect(()=> {
        receiveBrands()
    },[])
    const receiveBrands = async() => {
        const res = await getBrand()
        console.log(res);
        setBrands(res?.data)
    }
    const editBrand = (item: BrandsType) => {
        
    }
    const removeBrand = (id: string | undefined) => {

    }
  return (
    <div className='pt-[80px]'>
      <Navbar title={pathname}/>
      <div className='flex flex-col gap-[20px] items-start px-[20px]'>
        <Button variant='contained'>Add Brand</Button>
        <div className='grid grid-cols-5 w-[100%] gap-[20px]'>
            {
                brands?.map((item,index)=> (
                    <Card sx={{ maxWidth: 400 }} key={index}>
              <CardMedia
                sx={{ height: 200 }}
                image={`${base_url}/uploads/images/${item?.image_src}`}
                title={item?.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>editBrand(item)}>
                  <EditIcon />
                </Button>
                <Button size="small" color="error" onClick={()=>removeBrand(item?.id)}>
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Brands
