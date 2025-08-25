import React from 'react'

 function Scroll() {
  return (
    <section
    className='relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] xl:h-[70vh] bg-cover bg-center flex items-center justify-center mb-[80px]'
    style={{
        background:"url('/tour.jpg')"
    }}
    >
        <div className='relative font-bold text-center px-4  text-white'>
          <h1
          className='text-xl sm:text-5xl md:text-6xl lg:text-7xl  px-4 pb-3 text-fa tour-heading'
          >
            Explore The Worlds
            </h1>  
            <p className='sm:text-[16px] md:text-[18px] lg:text-[20px]'>
          People Don't Take Trips, Trips Take People
        </p>
        </div>

    </section>

  )
};

export default Scroll;
