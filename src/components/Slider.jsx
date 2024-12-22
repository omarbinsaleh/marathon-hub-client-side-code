import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Slider = ({sliders}) => {
   const navigate = useNavigate();

   console.log(sliders);

   return (
      <section className='relative mb-10'>
         <div className="carousel w-full scroll-smooth cursor-pointer">
            {
               sliders?.map((slider, index) => {
                  return <div onClick={() => navigate(`/campaigns/${slider._id}`)} key={slider._id} id={`item${index + 1}`} className="carousel-item w-full h-[500px]  bg-center bg-cover " style={{ backgroundImage: `url(${slider.imageUrl})` }}>
                     <div className="w-full h-full bg-white/70 flex flex-col items-center justify-center gap-5">
                        <div className="text-center max-w-[900px] px-3 space-y-5">
                           <h1 className="text-3xl sm:text-4xl font-bold">{slider.title}</h1>
                           <p>{slider?.description.slice(0, 200)}...</p>
                           <Link className='btn bg-primary text-white border border-blue-500 rounded-md hover:bg-blue-600' to={`/campaigns/${slider._id}`}>See Campaign's Details</Link>
                        </div>
                     </div>
                  </div>
               })
            }
         </div>
         <div className="flex w-full justify-center gap-2 py-2 absolute z-10 bottom-0">
            {sliders?.map((item, index) => <a key={index} href={`#item${index + 1}`} className="btn btn-xs">{index + 1}</a>)}
         </div>
      </section>
   )
}

export default Slider