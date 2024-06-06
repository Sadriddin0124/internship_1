import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { CategoriesType } from "@/app/types/slider.types";

const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";

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
  const [image, setImage] = React.useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    name_en ? formData.append("name_en", name_en) : editItem?.name_en;
    name_ru ? formData.append("name_ru", name_ru) : editItem?.name_ru;
    if (image) {
      formData.append("images", image);
    } else {
      editItem?.image_src;
    }
    if (editItem) {
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
            <input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PostCategory;
