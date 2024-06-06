"use client";
import PostCategory from "@/app/components/PostCategory/PostCategory";
import { CategoriesType } from "@/app/types/slider.types";
import { Button } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";
const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
const base_url2 = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
const Home = () => {
  const pathname = usePathname();
  const pathname2 = usePathname().split("/")[1];
  const router = useRouter();
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [editItem, setEditItem] = useState<CategoriesType>({
    id: "",
    name_en: "",
    name_ru: "",
    image_src: "",
  });
  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push(pathname);
    } else {
      router.push("/" + pathname2);
    }
    getData();
  }, [pathname, pathname2]);
  const getData = () => {
    fetch(`${base_url}/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const toggle = () => {
    setCategoryModal(false);
  };
  const editCategory = (item: CategoriesType) => {
    setEditItem(item);
    setCategoryModal(true);
    console.log(editItem);
  };
  const deleteCategory = (id: string | undefined) => {
    const token = localStorage.getItem("accessToken");

    fetch(`${base_url}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          toast.success(data?.message);
          getData()
        } else {
          toast.error(data?.message);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <PostCategory open={categoryModal} toggle={toggle} editItem={editItem} />
      <Button variant="outlined" onClick={() => setCategoryModal(true)}>
        Open Modal
      </Button>
      <table className="w-[100%] border">
        <thead className=" bg-purple-500 text-white">
          <tr>
            <th className="border">Engish</th>
            <th className="border">Russian</th>
            <th className="border">Images</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => (
            <tr key={index}>
              <th>{item?.name_en}</th>
              <th>{item?.name_ru}</th>
              <th>
                <Image
                  className="w-[70px] h-[50px]"
                  src={`${base_url2}${item?.image_src}`}
                  alt={item?.name_en}
                  width={400}
                  height={400}
                />
              </th>
              <th>
                <Button variant="contained" onClick={() => editCategory(item)}>
                  <EditIcon />
                </Button>
                <Button variant="contained" color="error" onClick={() => deleteCategory(item?.id)}>
                  <DeleteIcon />
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
