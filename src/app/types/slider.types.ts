import { StaticImageData } from "next/image"
import { ReactNode } from "react"

export interface CategoriesType {
    id?: string;
    name_en: string
    name_ru: string
    image_src?: ReactNode
}