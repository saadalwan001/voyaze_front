 import { PlaneTakeoff, Clock, Wallet, MapPin } from 'lucide-react';

const features = [
  {
    icon: <PlaneTakeoff size={70} className="text-[#03567F] w-64px h-64px" />,
    title: 'Tailor-Made Travel',
    title02: 'Plans',
    description: 'Personalized itineraries designed uniquely for your style and travel goals.',
  },
  {
    icon: <Clock size={70} className="text-[#03567F] w-64px h-64px" />,
    title: 'Round-the-Clock',
    title02: 'Support',
    description: 'Available 24/7 to ensure a smooth and safe journey.',
  },
  {
    icon: <Wallet size={70} className="text-[#03567F] w-64px h-64px" />,
    title: 'Flexible Travel',
    title02: 'Options',
    description: 'Travel freely with plans that adapt to your changing needs.',
  },
  {
    icon: <MapPin size={70} className="text-[#03567F] w-64px h-64px" />,
    title: 'Local Expertise',
    description: 'Insider knowledge offering authentic experiences across Sri Lanka’s highlights.',
  },
];

const FeatureSection = () => {
  return (
   <section className="bg-white py-10 mb-[80px]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row md:divide-x-[1px] divide-blue-950">
      {features.map((feature, index) => (
        <div key={index} className="flex-1 text-center mb-10 md:mb-0">
          <div className="flex justify-center mb-5">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-5">
            {feature.title}<br />{feature.title02}
          </h3>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default FeatureSection;
