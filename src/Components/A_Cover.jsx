import React from 'react'

function A_Cover({ backgroundImage, title, subtitle }) {
  return (
    
    <section
    className='relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] xl:h-[70vh]  bg-cover bg-cnter flex items-center justify-center'
    style={{
       backgroundImage: `url(${backgroundImage})`,
    }}
    >

        {/*Enter Title here if available*/}
        {title && (
          <h1 className='relative text-white text-xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center px-4'>
            {title}

        </h1>
        )}

        {/*Enter Subtitle if provided*/}
        {subtitle &&(
          <p className='sm:text-[16px] md:text-[18px] lg:text-[20px]'>
          {subtitle}
        </p>
          
        )}
    
        
        

    </section>
    
  );
};

export default A_Cover;

