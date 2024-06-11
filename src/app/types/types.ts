import { StaticImageData } from "next/image"
import { ReactNode } from "react"

export interface CategoriesType {
    id?: string;
    name_en: string
    name_ru: string
    image_src?: ReactNode
}

export interface CitiesType {
    id?: string;
    name: string
    slug: string
    text: string
    image_src?: ReactNode,
    created_at: string
}
export interface LocationsType {
    id?: string;
    name: string
    slug: string
    text: string
    image_src?: ReactNode,
    created_at: string
}
