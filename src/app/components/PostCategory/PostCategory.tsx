import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { CategoriesType } from "@/app/types/slider.types";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import UploadImage from "@/assets/upload.png"
const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
const base_url2 = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const PostCategory = ({
  open,
  toggle,
  editItem,
}: {
  open: boolean;
  toggle: () => void;
  editItem: CategoriesType | undefined;
}) => {
  const [name_en, setName_en] = React.useState<string>("");
  const [name_ru, setName_ru] = React.useState<string>("");
  const [image, setImage] = React.useState<File | undefined>();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    name_en ? formData.append("name_en", name_en) : editItem?.name_en;
    name_ru ? formData.append("name_ru", name_ru) : editItem?.name_ru;
    if (image) {
      formData.append("images", image);
    } else {
      editItem?.image_src;
    }
    if (editItem?.id) {
      fetch(`${base_url}/categories/${editItem?.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success === true) {
            toast.success(data?.message);
            window.location.reload();
          } else {
            toast.error(data?.message);
          }
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`${base_url}/categories`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success === true) {
            toast.success(data?.message);
            window.location.reload();
          } else {
            toast.error(data?.message);
          }
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [selectedImage, setSelectedImage] = React.useState<
    string | ArrayBuffer | null
  >(null);
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as Blob;
    const file2 = e.target.files?.[0]
    const reader = new FileReader();
    setImage(file2)
    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="flex flex-col items-center gap-[20px]"
            onSubmit={handleSubmit}
          >
            <TextField
              id="standard-basic"
              variant="standard"
              label="Name_En"
              className="w-[100%]"
              onChange={(e) => setName_en(e.target.value)}
              defaultValue={editItem?.name_en}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Name_Ru"
              className="w-[100%]"
              onChange={(e) => setName_ru(e.target.value)}
              defaultValue={editItem?.name_ru}
            />
            <div className="w-[100%] h-[150px] relative cursor-crosshair">
              <Image
                src={selectedImage?.toString() ? selectedImage?.toString() : editItem?.image_src ? base_url2 + editItem?.image_src : UploadImage}
                alt="image"
                width={500}
                height={500}
                className="w-[100%] h-[100%] object-contain"
              />
              <input
                multiple
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className=" absolute w-[100%] h-[100%] top-0 opacity-0 cursor-crosshair"
              />
            </div>
            <LoadingButton
              size="small"
              type="submit"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PostCategory;
