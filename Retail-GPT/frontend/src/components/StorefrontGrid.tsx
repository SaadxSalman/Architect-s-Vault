interface StorefrontProps {
  data: {
    userProfile: { aesthetic: string; colorPalette: string[]; keyVibe: string };
    storefrontItems: any[];
  };
}

export default function StorefrontGrid({ data }: StorefrontProps) {
  const { userProfile, storefrontItems } = data;

  // Visual Merchandiser logic: Adjust grid density based on aesthetic
  const isMinimalist = userProfile.aesthetic.toLowerCase().includes('minimal');
  const gridClass = isMinimalist ? 'gap-12 grid-cols-2' : 'gap-4 grid-cols-3';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: userProfile.colorPalette[0] + '20' }}>
        <h2 className="text-2xl font-semibold capitalize">Current Aesthetic: {userProfile.aesthetic}</h2>
        <p className="italic text-gray-600">"{userProfile.keyVibe}"</p>
      </div>

      <div className={`grid ${gridClass}`}>
        {storefrontItems.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-200">
              <img 
                src={`data:image/png;base64,${item.generatedImage}`} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-lg" style={{ color: userProfile.colorPalette[0] }}>
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {item.personalizedDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}