"use client";
import { getModels } from "@/app/actions/models_action";
import Navbar from "@/app/components/Navbar/Navbar";
import { ModelsType } from "@/app/types/types";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import AddModel from "@/app/components/AddModel/AddModel";
import DeleteModel from "@/app/components/DeleteModel/DeleteModel";
const Models = () => {
  const pathname = usePathname().slice(4);
  const langPath = usePathname().slice(0,4);
  const [models, setModels] = useState<ModelsType[]>([]);
  const [addModels, setAddModels] = useState(false)
  const [deleteModels, setDeleteModels] = useState(false)
  const [editItem, setEditItem] = useState<ModelsType | null>(null)
  const [ID, setID] = useState<string | undefined>("")
  const receiveModels = async () => {
    const res = await getModels();
    setModels(res?.data);
  };
  useEffect(() => {
    receiveModels();
  }, []);
  const editModel = (item: ModelsType) => {
    setAddModels(true)
    setEditItem(item)
  };
  const removeModel = (id: string | undefined) => {
    setID(id)
    setDeleteModels(true)
  };
  const toggle = () => {
    setAddModels(false)
    setDeleteModels(false)
    setEditItem(null)
  }
  return (
    <div className="pt-[80px]">
      <Navbar title={pathname} />
      <AddModel open={addModels} toggle={toggle} setModels={setModels} editItem={editItem}/>
      <DeleteModel open={deleteModels} toggle={toggle} setModels={setModels} id={ID}/>
      <div className="flex flex-col items-start gap-[20px] px-[20px]">
        <Button variant="contained" onClick={()=>setAddModels(true)}>Add Model</Button>
        <table className="w-[100%] border">
          <thead className=" bg_main text-white">
            <tr>
              <th className="border py-[10px]">T/R</th>
              <th className="border py-[10px]">Brand Title</th>
              <th className="border py-[10px]">Name</th>
              <th className="border py-[10px]">Single page</th>
              <th className="border py-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models?.map((item, index) => (
              <tr key={index} className="group">
                <th className="border">{index + 1}</th>
                <th className="border">{item?.brand_title}</th>
                <th className="border">{item?.name}</th>
                <th className="border"><Link href={`${langPath}/models/${item?.id}`}><Button variant="outlined">View</Button></Link></th>
                <th className="border">
                  <Button
                    variant="contained"
                    onClick={() => editModel(item)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => removeModel(item?.id)}
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

export default Models;
