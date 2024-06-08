"use client";
import PostCategory from "@/app/components/PostCategory/PostCategory";
import { CategoriesType } from "@/app/types/slider.types";
import { Button } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteCategory from "@/app/components/DeleteCategory/DeleteCategory";
import { getCategories } from "../actions/actions";
import Navbar from "@/app/components/Navbar/Navbar";
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
    if (!accessToken) {
      router.push("/" + pathname2);
    } else {
      router.push(pathname);
    }
    getData();
  }, [pathname, pathname2]);
  const getData = async () => {
    const res = await getCategories();
    setCategories(res?.data?.data);
  };
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const toggle = () => {
    setCategoryModal(false);
    setDeleteModal(false);
    setEditItem({
      id: "",
      name_en: "",
      name_ru: "",
      image_src: "",
    });
    setLoading("");
  };
  const editCategory = (item: CategoriesType) => {
    setEditItem(item);
    setCategoryModal(true);
    console.log(editItem);
  };
  const [loading, setLoading] = React.useState<string | undefined>("");
  const deleteCategory = (id: string | undefined) => {
    setLoading(id);
    setDeleteModal(true);
    setDeleteID(id);
  };
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string | undefined>("");
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="p-[20px] flex flex-col items-start gap-[20px]">
        <DeleteCategory
          open={deleteModal}
          toggle={toggle}
          id={deleteID}
          load={setLoading}
          setCategory={setCategories}
        />
        <PostCategory
          open={categoryModal}
          toggle={toggle}
          editItem={editItem}
          setCategory={setCategories}
        />
        <Button variant="outlined" onClick={() => setCategoryModal(true)}>
          Add Category
        </Button>
        <table className="w-[100%] border">
          <thead className=" bg-purple-500 text-white">
            <tr>
              <th className="border py-[10px]">T/R</th>
              <th className="border py-[10px]">English</th>
              <th className="border py-[10px]">Russian</th>
              <th className="border py-[10px]">Images</th>
              <th className="border py-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => (
              <tr key={index}>
                <th className="border">{index + 1}</th>
                <th className="border">{item?.name_en}</th>
                <th className="border">{item?.name_ru}</th>
                <th className="border">
                  <Image
                    className="w-[70px] object-contain h-[50px]"
                    src={`${base_url2}${item?.image_src}`}
                    alt={item?.name_en}
                    width={400}
                    height={400}
                  />
                </th>
                <th className="border">
                  <Button
                    variant="contained"
                    onClick={() => editCategory(item)}
                  >
                    <EditIcon />
                  </Button>
                  <LoadingButton
                    onClick={() => deleteCategory(item?.id)}
                    color="error"
                    size="large"
                    type="submit"
                    endIcon={<DeleteIcon className="text-[24px]" />}
                    loading={loading === item?.id ? true : false}
                    loadingPosition="end"
                    variant="contained"
                  ></LoadingButton>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
