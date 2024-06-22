"use client"
import { getOneModel } from '@/app/actions/models_action';
import Navbar from '@/app/components/Navbar/Navbar';
import { ModelsType } from '@/app/types/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SingleModel = () => {
    const params = useParams();
  const { id } = params;
  const [model, setModel] = useState<ModelsType>()
  const receiveModel = async() => {
    const res = await getOneModel(id)
    console.log(res);
    setModel(res?.data);
  }
  useEffect(()=> {
    receiveModel()
  },[])
  return (
    <div className='pt-[80px]'>
      <Navbar title='Single Model'/>
      <div className='flex flex-col items-center gap-[20px]'>
        <h1 className='text-[30px] font-[600]'>{model?.name}</h1>
        <div className='w-[80%] border flex '>
          <h2 className='w-[25%] p-[20px] border'>Title:</h2>
          <h2 className='w-[25%] p-[20px] border'>{model?.brand_title}</h2>
          <h2 className='w-[25%] p-[20px] border'>Title:</h2>
          <h2 className='w-[25%] p-[20px] border'>{model?.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default SingleModel
