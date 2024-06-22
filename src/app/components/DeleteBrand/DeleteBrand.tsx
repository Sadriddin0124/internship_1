import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBrand, getBrand } from "@/app/actions/brands_action";
import { BrandsType } from "@/app/types/types";
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
const DeleteBrand = ({
  open,
  toggle,
  id,
  setBrand,
}: {
  open: boolean;
  toggle: () => void;
  id: string | undefined;
  setBrand: React.Dispatch<React.SetStateAction<BrandsType[]>>;
}) => {
  const getBrands = async () => {
    const res = await getBrand();
    setBrand(res?.data);
  };
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await deleteBrand(id)
    if (res?.success === true) {
        setLoading(false)
        toast.success(res?.message)
        toggle()
        getBrands()
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

export default DeleteBrand;
