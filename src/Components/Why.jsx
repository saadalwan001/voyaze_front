import React from 'react';

const WhySriLanka = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-end px-4 md:px-16 w-[8] mb-[80px] "
      style={{ backgroundImage: "url('/beach.jpeg') " }}
    >
      
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 max-w-lg min-h-[450px] w-full md:w-[800px] text-center">
        <h2 className="text-[40px]  text-[#474747] mt-10 mb-6">Why Sri Lanka?</h2>

        <div className="w-20 h-[3px] bg-[#3e3e41] mx-auto rounded-full mb-6 "></div>

        <p className="text-gray-700 text-sm leading-relaxed h-48 text-[16px]">
          A land of breathtaking contrasts—Sri Lanka offers serene beaches, misty hills, rich heritage, and vibrant wildlife all in one compact island. Whether you seek adventure, relaxation, or cultural discovery, this tropical gem promises unforgettable memories at every turn.
        </p>
      </div>
      
    </section>
  );
};

export default WhySriLanka;
