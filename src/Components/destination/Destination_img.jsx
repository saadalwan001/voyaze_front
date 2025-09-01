import React from 'react';

const destinations = [
  { id: 1, title: 'Anuradhapura', image: '/anuradapura.jpg' },
  { id: 2, title: 'Yala National Park', image: '/des_yala.jpg'},
  { id: 3, title: 'Bentota', image: '/Bentota.jpg' },
  { id: 4, title: 'Sigiriya', image: '/Sigiriya.jpg' },
  { id: 5, title: 'Udawalawe National Park', image: '/udawalawe.jpg' },
  { id: 6, title: 'Dambulla', image: '/Dambulla.jpg' },
  { id: 7, title: 'Galle', image: '/galle.jpg' },
  { id: 8, title: 'Elle', image: '/elle.jpg' },
  { id: 9, title: 'Colombo', image: '/colombo.jpg' },
  { id: 10, title: 'Nuwara Eliya', image: '/nuwara_eliya.jpg' },
  { id: 11, title: 'Jaffna', image: '/jaffna.jpg' },
  { id: 12, title: 'Arugam Bay', image: '/arugambay.jpg' },
  { id: 13, title: 'Kandy', image: '/Kandy.jpeg' },
  { id: 14, title: 'Mirissa', image: '/mirrisa.jpeg' },
  { id: 15, title: 'Unawatuna', image: '/unawatuna.jpeg' },
  { id: 16, title: 'Tangalle', image: '/tangalle.jpeg' },
  { id: 17, title: 'Negombo', image: '/negombo.jpeg' },
  { id: 18, title: 'Kalpitiya', image: '/kalpitiya.jpeg' },
  { id: 19, title: 'Beruwela', image: '/Beruwela.jpeg' },
  { id: 20, title: 'Hikkaduwa', image: '/hikkaduwa.jpeg' },
  { id: 21, title: 'Trincomalee', image: '/trincomalee.jpeg' },
  { id: 22, title: 'Batticaloa', image: '/Batticalo.jpeg' },
  { id: 23, title: 'Pasikudah', image: '/pasikuda.jpeg' },
  { id: 24, title: 'Nilavali', image: '/Nilavali.jpeg' },
  { id: 25, title: 'Habarana', image: '/Habarana.jpeg' },
  { id: 26, title: 'Mannar', image: '/Mannar.jpeg' },
  { id: 27, title: 'Point Pedro', image: '/PointPedro.jpeg' },
  { id: 28, title: 'Polonnaruwa', image: '/Polonnaruwa.jpeg' },
  { id: 29, title: 'Rawana Falls', image: '/RavanaFalls.jpeg' },
  { id: 30, title: 'Mihintale', image: '/Mihinthala.jpeg' },
  { id: 31, title: 'Ridigala', image: '/Ridigala.jpeg' },
  { id: 32, title: 'Riverston', image: '/Riverstone.jpeg' },
  { id: 33, title: 'Ravana Cave', image:'/RavanaCave.jpeg' },
  { id: 34, title: 'Seetha Amman Temple', image:'/SeethaTemple.jpeg' },
  { id: 35, title: 'Hakgala Botanical Garden', image:'/BotanicalGarden.jpeg' },
  { id: 36, title: 'Divurumpola Temple', image:'/DivurumpolaTemple.jpeg' },
  { id: 37, title: 'Rumassala Hill', image:'/RumasalHill.jpeg' },








];

const DesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-lg md:text-xl text-gray-500 mb-2">
        Explore the Beauty of the Island Paradise
      </h3>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Top Destinations in Sri Lanka
      </h2>
      <div className="w-20 h-1 mx-auto bg-[#313d44] mb-6 rounded"></div>
      <p className="max-w-3xl mx-auto text-gray-600 mb-12">
        Discover Sri Lanka's most breath taking locations – from serene beaches and misty hill country to ancient cities and wildlife escapes. Perfect spots for every kind of traveler.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-[25px]">
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
            className={`relative h-[400px] rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2  ${
              (index % 4 === 0 || index % 4 === 2) ? 'mt-0 md:-mt-8' : ''
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-200"
              style={{ backgroundImage: `url(${dest.image})` }}
            ></div>
            <div className="absolute bottom-0 w-full  bg-opacity-50 text-white font-medium text-2xl md:text-1xl py-2">
              {dest.title}
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default DesSection;
