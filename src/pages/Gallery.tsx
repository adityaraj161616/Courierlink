
import { Card, CardContent } from '@/components/ui/card';

const Gallery = () => {
  const images = [
    {
      title: 'Modern Fleet',
      description: 'Our state-of-the-art delivery vehicles',
      category: 'Vehicles'
    },
    {
      title: 'Warehouse Operations',
      description: 'Efficient sorting and packaging facility',
      category: 'Facilities'
    },
    {
      title: 'Team at Work',
      description: 'Our dedicated courier professionals',
      category: 'Team'
    },
    {
      title: 'Technology Center',
      description: 'Advanced tracking and logistics systems',
      category: 'Technology'
    },
    {
      title: 'Customer Service',
      description: '24/7 support center operations',
      category: 'Service'
    },
    {
      title: 'International Hub',
      description: 'Global shipping coordination center',
      category: 'Facilities'
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look behind the scenes at CourierLink™. See our facilities, team, and technology in action.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center text-primary-600">
                    <div className="text-4xl mb-2">📸</div>
                    <div className="text-sm font-medium">{image.category}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                    <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
