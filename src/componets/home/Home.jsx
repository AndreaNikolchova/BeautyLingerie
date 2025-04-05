const categories = [
{
        name: 'Bikini',
        imageSrc: '\\bikiniCategory.jpg',
        href:'/products/bikini'
       
    },
    {
      name: 'Underwear',
      imageSrc:'\\underwearCategory.jpg',
       href:'/products/underwear'
    },
    {
      name: 'Others',
      imageSrc:'\\others..png',
       href:'/products/others'
    }

  ]
  
  export default function Home() {
    if (!categories || Object.keys(categories).length === 0) {
        return <Loading/>;
      }
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {categories.map((category) => (
                <div key={category.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      alt={category.name}
                      src={category.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={category.href}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </a>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  