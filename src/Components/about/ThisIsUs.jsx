import React from 'react'

export default function ThisIsUs() {
  return (
    <section className="
    w-full 
    px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
    py-8 sm:py-12 md:py-16 lg:py-20
    flex flex-col md:flex-row 
    justify-center items-center 
    gap-6 sm:gap-8 lg:gap-12
    bg-white 
    mb-12 sm:mb-16 md:mb-20 lg:mb-[80px]
  ">

    {/*left side*/}
    <div className='w-[470px] h-[500px]'>
        <img src="/parahara.jpg" alt="parahara" 
        className='w-full h-full object-cover rounded-2xl'/>


    </div>

    {/*Right side content*/}
    <div className='w-[570px] h-[614] flex flex-col justify-start'>
        <h1 className='text-5xl font-semibold text-[#353738] mt-0 mb-2'>
            This Is Us
        </h1>

        {/*LINE */}
        <div
        className="my-6"
        style={{width:"150px", height: "5px", backgroundColor:"#000000"}}>

        </div>


        {/*pargrphs*/}
        <div className="
  w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-[550px]
">
  <p className="text-gray-700 mb-4 text-base sm:text-lg md:text-base leading-relaxed text-justify">
    At <b>Voyaz Travel</b>, a trusted inbound Destination Management Company in Sri Lanka, 
    we create unforgettable travel experiences for international visitors.
  </p>

  <p className="text-gray-700 mb-4 text-base sm:text-lg md:text-base leading-relaxed text-justify">
    With deep local expertise and a passion for sharing Sri Lanka's vibrant culture, 
    stunning landscapes, and hidden gems, we craft tailor-made tours that capture 
    the island's true spirit.
  </p>

  <p className="text-gray-700 mb-6 text-base sm:text-lg md:text-base leading-relaxed text-justify">
    From your arrival to departure, every detail is thoughtfully handled to ensure 
    a seamless, immersive, and enriching journey – helping you experience Sri Lanka 
    through the eyes of those who know it best.
  </p>
</div>


    </div>

    </section>
  )
}
