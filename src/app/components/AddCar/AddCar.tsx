"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import {
  BrandsType,
  CarsType,
  CategoriesType,
  CitiesType,
  LocationsType,
  ModelsType,
} from "@/app/types/types";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import UploadImage from "@/assets/upload.png";
import { getCities } from "@/app/actions/cities_action";
import { base_url, getBrand } from "@/app/actions/brands_action";
import { getModels } from "@/app/actions/models_action";
import { getCategories } from "@/app/actions/category_actions";
import { getLocation } from "@/app/actions/locations_action";
import { getCar, postCar, updateCar } from "@/app/actions/cars_action";
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
const AddCar = ({
  open,
  toggle,
  editItem,
  setCarsData,
}: {
  open: boolean;
  toggle: () => void;
  editItem: CarsType | null;
  setCarsData: React.Dispatch<React.SetStateAction<CarsType[]>>;
}) => {
  const [color, setColor] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");
  const [seconds, setSeconds] = React.useState<string>("");
  const [max_speed, setMaxSpeed] = React.useState<string>("");
  const [max_people, setMaxPeople] = React.useState<string>("");
  const [transmission, setTransmission] = React.useState<string>("");
  const [motor, setMotor] = React.useState<string>("");
  const [drive_side, setDriveSide] = React.useState<string>("");
  const [petrol, setPetrol] = React.useState<string>("");
  const [limitperday, setLimitPerDay] = React.useState<string>("");
  const [deposit, setDeposit] = React.useState<string>("");
  const [premiumProtection, setPremiumProtection] = React.useState<string>("");
  const [priceAED, setPriceAED] = React.useState<string>("");
  const [priceUSD, setPriceUSD] = React.useState<string>("");
  const [priceAEDSale, setPriceAEDSale] = React.useState<string>("");
  const [priceUSDSale, setPriceUSDSale] = React.useState<string>("");
  const [brandId, setBrandId] = React.useState<string>("");
  const [modelId, setModelId] = React.useState<string>("");
  const [cityId, setCityId] = React.useState<string>("");
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [locationId, setLocationId] = React.useState<string>("");
  const [inclusive, setInclusive] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<File | undefined>();
  const [image2, setImage2] = React.useState<File | undefined>();
  const [image3, setImage3] = React.useState<File | undefined>();
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = React.useState<BrandsType[]>([]);
  const [models, setModels] = React.useState<ModelsType[]>([]);
  const [cities, setCities] = React.useState<CitiesType[]>([]);
  const [categories, setCategories] = React.useState<CategoriesType[]>([]);
  const [locations, setLocations] = React.useState<LocationsType[]>([]);
  React.useEffect(() => {
    getData();
  }, []);
  const getCars = async () => {
    const res = await getCar();
    setCarsData(res?.data);
  };
  const getData = async () => {
    const brand = await getBrand();
    setBrands(brand?.data);
    const models = await getModels();
    setModels(models?.data);
    const city = await getCities();
    setCities(city?.data?.data);
    const category = await getCategories();
    setCategories(category?.data?.data);
    const location = await getLocation();
    setLocations(location?.data);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    brandId ? formData.append("brand_id", brandId) : editItem?.brand_id;
    modelId ? formData.append("model_id", modelId) : editItem?.model_id;
    cityId ? formData.append("city_id", cityId) : editItem?.city_id;
    categoryId ? formData.append("category_id", categoryId) : editItem?.category_id;
    color ? formData.append("color", color) : editItem?.color;
    year ? formData.append("year", year) : editItem?.year;
    seconds ? formData.append("seconds", seconds) : editItem?.seconds;
    max_speed ? formData.append("max_speed", max_speed) : editItem?.max_speed;
    max_people ? formData.append("max_people", max_people) : editItem?.max_people;
    transmission ? formData.append("transmission", transmission) : editItem?.transmission;
    motor ? formData.append("motor", motor) : editItem?.motor;
    drive_side ? formData.append("drive_side", drive_side) : editItem?.drive_side;
    petrol ? formData.append("petrol", petrol) : editItem?.petrol;
    limitperday ? formData.append("limitperday", limitperday) : editItem?.limitperday;
    deposit ? formData.append("deposit", deposit) : editItem?.deposit;
    premiumProtection ? formData.append("premium_protection", premiumProtection) : editItem?.premium_protection;
    priceAED ? formData.append("price_in_aed", priceAED) : editItem?.price_in_aed;
    priceAEDSale ? formData.append("price_in_aed_sale", priceAEDSale) : editItem?.price_in_aed_sale;
    priceUSD ? formData.append("price_in_usd", priceUSD) : editItem?.price_in_usd;
    priceUSDSale ? formData.append("price_in_usd_sale", priceUSDSale) : editItem?.price_in_usd_sale;
    locationId ? formData.append("location_id", locationId) : editItem?.location_id;
    inclusive ? formData.append("inclusive", inclusive.toString()) : editItem?.inclusive;
    if (image && image2 && image3) {
      formData.append("images", image);
      formData.append("images", image2);
      formData.append("cover", image3);
    }
    if (editItem !== null) {
      const res = await updateCar(editItem?.id, formData);
      console.log(res);
      if (res?.success === true) {
        toast.success(res?.message);
        setLoading(false);
        toggle();
        getCars();
      }
    } else {
      const res = await postCar(formData);
      if (res?.success === true) {
        toast.success(res?.message);
        setLoading(false);
        toggle();
        getCars();
      }
    }
  };
  const [selectedImage, setSelectedImage] = React.useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImage2, setSelectedImage2] = React.useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImage3, setSelectedImage3] = React.useState<
    string | ArrayBuffer | null | Blob
  >(null);
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as Blob;
    const file2 = e.target.files?.[0];
    const reader = new FileReader();
    setImage(file2);
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleImageCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as Blob;
    const file2 = e.target.files?.[0];
    const reader = new FileReader();
    setImage3(file2);
    reader.onload = () => {
      setSelectedImage3(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleImageSelect2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as Blob;
    const file2 = e.target.files?.[0];
    const reader = new FileReader();
    setImage2(file2);
    reader.onload = () => {
      setSelectedImage2(reader.result);
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
          <h1 className="text-[24px] text-center">
            {editItem?.id ? "Edit City" : "Add City"}
          </h1>
          <form
            id="cars"
            className="h-[80vh] py-[10px] overflow-y-auto flex flex-col items-center gap-[2px]"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-[20px]">
              <div className="w-[100%] h-[50px] relative cursor-crosshair">
                <Image
                  src={
                    selectedImage?.toString()
                      ? selectedImage?.toString()
                      : editItem?.car_images
                      ? `${base_url}/uploads/images/${editItem?.car_images[1]?.image?.src}`
                      : UploadImage
                  }
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
              <div className="w-[100%] h-[50px] relative cursor-crosshair">
                <Image
                  src={
                    selectedImage2?.toString()
                      ? selectedImage2?.toString()
                      : editItem?.car_images[0]
                      ? `${base_url}/uploads/images/${editItem?.car_images[0]?.image?.src}`
                      : UploadImage
                  }
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
                  onChange={handleImageSelect2}
                  className=" absolute w-[100%] h-[100%] top-0 opacity-0 cursor-crosshair"
                />
              </div>
              <div className="w-[100%] h-[50px] relative cursor-crosshair">
                <Image
                  src={
                    selectedImage3
                      ? selectedImage3?.toString()
                      : editItem?.car_images[0]
                      ? `${base_url}/uploads/images/${editItem?.car_images[2]?.image?.src}`
                      : UploadImage
                  }
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
                  onChange={handleImageCover}
                  className=" absolute w-[100%] h-[100%] top-0 opacity-0 cursor-crosshair"
                />
              </div>
            </div>
            <select
              required
              onChange={(e) => setBrandId(e.target.value)}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
              value={brandId ? brandId : editItem?.brand_id}
            >
              <option value="" hidden>
                Select Brand
              </option>
              {brands?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.title}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setModelId(e.target.value)}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
              value={modelId ? modelId : editItem?.model_id}
            >
              <option value="" hidden>
                Select Model
              </option>
              {models?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setCityId(e.target.value)}
              value={cityId ? cityId : editItem?.city_id}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value="" hidden>
                Select City
              </option>
              {cities?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId ? categoryId : editItem?.category_id}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value="" hidden>
                Select Category
              </option>
              {categories?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.name_en}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setLocationId(e.target.value)}
              value={locationId ? locationId : editItem?.location_id}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value="" hidden>
                Select Location
              </option>
              {locations?.map((item, index) => {
                return <option value={item?.id} key={index}>
                  {item?.name}
                </option>
})}
            </select>
            <select
              required
              onChange={(e) => setInclusive(e.target.value == "1" ? true : false)}
              value={inclusive ? inclusive.toString() : editItem?.inclusive.toString()}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value={0}>
                False
              </option>
              <option value={1}>
                True
              </option>
            </select>
            <TextField
              id="standard-basic"
              variant="standard"
              label="Color"
              className="w-[100%]"
              onChange={(e) => setColor(e.target.value)}
              value={color ? color : editItem?.color}            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Year"
              className="w-[100%]"
              onChange={(e) => setYear(e.target.value)}
              value={year ? year : editItem?.year}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Seconds"
              className="w-[100%]"
              onChange={(e) => setSeconds(e.target.value)}
              value={seconds ? seconds : editItem?.seconds}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Max Speed"
              className="w-[100%]"
              onChange={(e) => setMaxSpeed(e.target.value)}
              value={max_speed ? max_speed : editItem?.max_speed}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Max People"
              className="w-[100%]"
              onChange={(e) => setMaxPeople(e.target.value)}
              value={max_speed ? max_speed : editItem?.max_speed}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Transmission"
              className="w-[100%]"
              onChange={(e) => setTransmission(e.target.value)}
              value={transmission ? transmission : editItem?.transmission}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Motor"
              className="w-[100%]"
              onChange={(e) => setMotor(e.target.value)}
              value={motor ? motor : editItem?.motor}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Drive Side"
              className="w-[100%]"
              onChange={(e) => setDriveSide(e.target.value)}
              value={drive_side ? drive_side : editItem?.drive_side}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Petrol"
              className="w-[100%]"
              onChange={(e) => setPetrol(e.target.value)}
              value={petrol ? petrol : editItem?.petrol}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Limit per day"
              className="w-[100%]"
              onChange={(e) => setLimitPerDay(e.target.value)}
              value={limitperday ? limitperday : editItem?.limitperday}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Deposit"
              className="w-[100%]"
              onChange={(e) => setDeposit(e.target.value)}
              value={deposit ? deposit : editItem?.deposit}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Premium Protection"
              className="w-[100%]"
              onChange={(e) => setPremiumProtection(e.target.value)}
              value={premiumProtection ? premiumProtection : editItem?.premium_protection}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in AED"
              className="w-[100%]"
              onChange={(e) => setPriceAED(e.target.value)}
              value={priceAED ? priceAED : editItem?.price_in_aed}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in AED Sale"
              className="w-[100%]"
              onChange={(e) => setPriceAEDSale(e.target.value)}
              value={priceAEDSale ? priceAEDSale : editItem?.price_in_aed_sale}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in USD"
              className="w-[100%]"
              onChange={(e) => setPriceUSD(e.target.value)}
              value={priceUSD ? priceUSD : editItem?.price_in_usd}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in USD Sale"
              className="w-[100%]"
              onChange={(e) => setPriceUSDSale(e.target.value)}
              value={priceUSDSale ? priceUSDSale : editItem?.price_in_usd_sale}
            />
          </form>
          <div className="flex gap-[10px] justify-center py-[20px]">
            <Button variant="outlined" onClick={toggle}>
              cancel
            </Button>
            <LoadingButton
              form="cars"
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
        </Box>
      </Modal>
    </div>
  );
};

export default AddCar;
