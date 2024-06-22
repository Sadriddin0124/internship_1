import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { CitiesType } from "@/app/types/types";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import UploadImage from "@/assets/upload.png"
import { getCities, postCity, updateCity } from "@/app/actions/cities_action";
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
const AddCity = ({
  open,
  toggle,
  editItem,
  setCities
}: {
  open: boolean;
  toggle: () => void;
  editItem: CitiesType | undefined;
  setCities: React.Dispatch<React.SetStateAction<CitiesType[]>>
}) => {
  const [name, setName] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [image, setImage] = React.useState<File | undefined>();
  const [loading, setLoading] = React.useState(false);
  const getCity = async () => {
    const res = await getCities()
    setCities(res?.data?.data)
  }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    name ? formData.append("name", name) : editItem?.name;
    name ? formData.append("text", text) : editItem?.text;
    if (image) {
      formData.append("images", image);
    } else {
      editItem?.image_src;
    }
    if (editItem?.id) {
        const res = await updateCity(editItem?.id, formData)
        console.log(res);
        if (res?.success === true) {
            toast.success(res?.message)
            setLoading(false)
            toggle()
            getCity()
        }
    }else {
        const res = await postCity(formData)
        if (res?.success === true) {
            toast.success(res?.message)
            setLoading(false)
            toggle()
            getCity()
        }
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
          <h1 className="text-[24px] text-center">{editItem?.id ? "Edit City" : "Add City"}</h1>
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
              defaultValue={editItem?.name}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Text"
              className="w-[100%]"
              onChange={(e) => setText(e.target.value)}
              defaultValue={editItem?.text}
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
              required={editItem?.id ? false : true}
                multiple
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className=" absolute w-[100%] h-[100%] top-0 opacity-0 cursor-crosshair"
              />
            </div>
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

export default AddCity;
