import React from 'react'

export default function Classes() {
    const Institutes = [
        {
            name:'Sasip Institute',
            town:'Colombo'
        },
        {
            name:'Royal Institute',
            town:'Kandy'
        },
        {
            name:'Horizon College',
            town:'Galle'
        },
        {
            name:'Lyceum College',
            town:'Negombo'
        }
    ]

  return (
    <div className='grid justify-between grid-cols-3 gap-5 m-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0'>
        {Institutes.map((_,i) => {
            return(
                <div key={`${i}`} className='p-4 m-4 bg-white rounded-md shadow-md w-60 h-72'>
            <div className='flex flex-col items-center'>
            <img 
                src='/images/institute.png'
                className='self-center m-4 mt-8'
            />
            <div className='mt-10 border-t-4 '>
                <p className='flex text-2xl font-semibold'>{_.name}</p>
                <p className='flex text-xl'>{_.town}</p>
            </div>
            </div>
           
        </div>
            )
        })}
    </div>
  )
}
