import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { BrandsType, ModelsType } from "@/app/types/types";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { getBrand } from "@/app/actions/brands_action";
import { getModels, postModels, updateModels } from "@/app/actions/models_action";
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
const AddModel = ({
  open,
  toggle,
  editItem,
  setModels
}: {
  open: boolean;
  toggle: () => void;
  editItem: ModelsType | null;
  setModels: React.Dispatch<React.SetStateAction<ModelsType[]>>
}) => {
  const [name, setName] = React.useState<string>("");
  const [brandId, setBrandId] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = React.useState<BrandsType[]>([])
  React.useEffect(()=> {
    getBrands()
  },[])
  const getBrands = async () => {
    const res = await getBrand()
    setBrands(res?.data)
  }
  const getModel = async () => {
    const res = await getModels()
    setModels(res?.data)
  }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    name ? formData.append("name", name) : editItem?.name;
    brandId ? formData.append("brand_id", brandId) : editItem?.brand_id;
    if (editItem?.id) {
        const res = await updateModels(editItem?.id, formData)
        if (res?.success === true) {
            toast.success(res?.message)
            setLoading(false)
            toggle()
            getModel()
        }
    }else {
        const res = await postModels(formData)
        if (res?.success === true) {
            toast.success(res?.message)
            setLoading(false)
            toggle()
            getModel()
        }
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
          <h1 className="text-[24px] text-center">{editItem?.id ? "Edit Brand" : "Add Brand"}</h1>
          <form
            className="flex flex-col items-center gap-[20px]"
            onSubmit={handleSubmit}
          >
            <TextField
              id="standard-basic"
              variant="standard"
              label="Name"
              className="w-[100%]"
              onChange={(e) => setName(e.target.value)}
              value={name ? name : editItem?.name}
            />
            <select className="w-[100%] border-b py-[5px]" value={brandId ? brandId : editItem?.brand_id} onChange={(e)=>setBrandId(e.target.value)}>
                {
                    brands?.map((item,index)=> {
                        return <option value={item?.id} key={index}>{item?.title}</option>
                    })
                }
            </select>
            <div className="flex gap-[10px]">
            <Button variant="outlined" onClick={toggle}>cancel</Button>
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
              </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddModel;
