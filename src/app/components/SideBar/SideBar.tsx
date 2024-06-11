import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

const SideBar = ({toggle, open}: {toggle: Dispatch<SetStateAction<boolean>>, open: boolean}) => {
  const pathname = usePathname().slice(0, 4);
  const links = [
    { name: "Categories", path: `${pathname}/category` },
    { name: "Cities", path: `${pathname}/cities` },
    { name: "Locations", path: `${pathname}/locations` },
    { name: "Brands", path: `${pathname}/brands` },
  ]
  return (
    <aside className={`${open ? "left-0" : " left-[-2000px]"} ease-in-out duration-500 w-[100%] h-[100%] min-h-[100vh] absolute top-0 flex`}>
      <div className="bg_main w-[300px] h-[100%] pt-[60px] mt-[64px] px-[20px] flex flex-col items-start gap-[20px] relative">
        <ul className="flex flex-col gap-[10px] w-[100%]">
            {
                links?.map((item,index)=> (
                    <li key={index} className=" transition-all hover:text-[20px] w-[100%]" onClick={()=>toggle(false)}>
                        <Link href={item?.path} className="w-[100%] h-[100%] block">{item?.name}</Link>
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
