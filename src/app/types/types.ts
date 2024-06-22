import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface CategoriesType {
  id?: string;
  name_en: string;
  name_ru: string;
  image_src?: ReactNode;
}

export interface CitiesType {
  id?: string;
  name: string;
  slug: string;
  text: string;
  image_src?: ReactNode;
  created_at: string;
}
export interface LocationsType {
  id?: string;
  name: string;
  slug: string;
  text: string;
  image_src?: ReactNode;
  created_at: string;
}

export interface BrandsType {
  id?: string;
  title: string;
  image_src?: ReactNode;
  created_at: string;
}

export interface CarImagesType {
  car_id: string;
  is_main: boolean;
  image: {
    src: string;
  };
  created_at: string;
}
export interface ModelsType {
  id: string;
  brand_id: string;
  brand_title: string;
  created_at: string;
  name: string;
  slug: string;
}

export interface CarsType {
  id?: string;
  brand_id: string;
  model_id: string;
  city_id: string;
  color: string;
  year: string;
  seconds: string;
  max_speed: string;
  max_people: number;
  transmission: string;
  motor: string;
  drive_side: string;
  petrol: string;
  limitperday: string;
  deposit: string;
  premium_protection: string;
  price_in_aed: string;
  price_in_usd: string;
  location_id: string;
  category_id: string;
  created_at: string;
  price_in_aed_sale: string;
  price_in_usd_sale: string;
  inclusive: boolean;
  car_images: CarImagesType[];
  three_days_price: string;
  two_days_price: string;
  four_days_price: string;
  city: CitiesType;
  location: LocationsType;
  category: CategoriesType;
  brand: BrandsType;
  model: ModelsType
}
