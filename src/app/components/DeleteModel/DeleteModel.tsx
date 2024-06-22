import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCategories } from "@/app/actions/category_actions";
import { CitiesType, LocationsType, ModelsType } from "@/app/types/types";
import { deleteLocation, getLocation } from "@/app/actions/locations_action";
import { deleteModels, getModels } from "@/app/actions/models_action";
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
const DeleteModel = ({
  open,
  toggle,
  id,
  setModels,
}: {
  open: boolean;
  toggle: () => void;
  id: string | undefined;
  setModels: React.Dispatch<React.SetStateAction<ModelsType[]>>;
}) => {
  const getModel = async () => {
    const res = await getModels();
    setModels(res?.data);
  };
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await deleteModels(id)
    if (res?.success === true) {
        setLoading(false)
        toast.success(res?.message)
        toggle()
        getModel()
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

export default DeleteModel;
