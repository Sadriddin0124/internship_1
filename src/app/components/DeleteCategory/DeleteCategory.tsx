import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCategories } from "@/app/[locale]/actions/actions";
import { CategoriesType } from "@/app/types/slider.types";
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
};
const DeleteCategory = ({
  open,
  toggle,
  id,
  load,
  setCategory,
}: {
  open: boolean;
  toggle: () => void;
  id: string | undefined;
  load: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCategory: React.Dispatch<React.SetStateAction<CategoriesType[]>>;
}) => {
  const getCategory = async () => {
    const res = await getCategories();
    setCategory(res?.data?.data);
  };
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false);
          toggle();
          getCategory();
        } else {
          toast.error(
            data?.message.length > 40
              ? "You can't delete this category"
              : data?.message
          );
          toggle()
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        load("");
        // toggle()
      });
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
          <h1>Do you want to delete?</h1>
          <form
            className="flex items-center gap-[20px]"
            onSubmit={handleSubmit}
          >
            <Button variant="contained">cancel</Button>
            <LoadingButton
              size="medium"
              type="submit"
              endIcon={<DeleteIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              color="error"
            >
              <span>delete</span>
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteCategory;
