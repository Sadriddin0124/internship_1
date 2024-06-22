import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { BiCategory } from "react-icons/bi";
import { PiCity } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoCarSportOutline } from "react-icons/io5";
import { HiCubeTransparent } from "react-icons/hi2";

const SideBar = ({toggle, open}: {toggle: Dispatch<SetStateAction<boolean>>, open: boolean}) => {
  const pathname = usePathname().slice(0, 4);
  const pathname2 = usePathname()
  const links = [
    { name: "Categories", path: `${pathname}category`, icon: <BiCategory size={20}/>},
    { name: "Cities", path: `${pathname}cities`, icon: <PiCity size={20}/>},
    { name: "Locations", path: `${pathname}locations`, icon: <IoLocationOutline size={20}/>},
    { name: "Brands", path: `${pathname}brands`, icon: <IoPricetagsOutline size={20}/>},
    { name: "Cars", path: `${pathname}cars`, icon: <IoCarSportOutline size={20}/>},
    { name: "Models", path: `${pathname}models`, icon: <HiCubeTransparent size={20}/>},
  ]
  return (
    <aside className={`${open ? "left-0" : " left-[-2000px]"} ease-in-out duration-500 w-[100%] h-[100%] min-h-[100vh] absolute top-0 flex`}>
      <div className="bg_main w-[300px] h-[100%] pt-[60px] px-[10px] flex flex-col items-start gap-[20px] relative">
        <ul className="flex flex-col gap-[5px] w-[100%]">
            {
                links?.map((item,index)=> (
                    <li key={index} className={`${pathname2 == item?.path ? "bg-[#ffffff2c]" : ""} transition-all rounded-md hover:bg-[#ffffff2c] w-[100%]`} onClick={()=>toggle(false)}>
                        <Link href={item?.path} className="p-[10px] flex items-center gap-[10px] w-[100%] h-[100%]">{item?.icon} {item?.name}</Link>
                    </li>
                ))
            }
        </ul>
      </div>
        <div className="w-[90%] h-[100%]" onClick={()=>toggle(false)}></div>
    </aside>
  );
};

export default SideBar;
