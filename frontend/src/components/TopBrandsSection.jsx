import { Card, CardContent } from "@/components/ui/card";

const brands = [
    {
        id: 1,
        name: "Gucci",
        logo: "/gucci.svg",
    },
    {
        id: 2,
        name: "Ambush",
        logo: "/ambush.svg",
    },
    {
        id: 3,
        name: "Prada",
        logo: "/prada.svg",
    },
    {
        id: 4,
        name: "Chanel",
        logo: "/chanel.svg",
    },
    {
        id: 5,
        name: "Adidas",
        logo: "/adidas.svg",
    },
    {
        id: 6,
        name: "Vogue",
        logo: "/vogue.svg",
    },
    {
        id: 7,
        name: "Withings",
        logo: "/withings.svg",
    },
    {
        id: 8,
        name: "Fendi",
        logo: "/fendi.svg",
    },
];

export default function TopBrandsSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">TOP BRANDS</h2>
                </div>

                <div className="flex gap-8 justify-center items-center overflow-x-auto pb-6 scrollbar-hide">
                    {brands.map((brand) => (
                        <Card
                            key={brand.id}
                            className="flex-shrink-0 bg-white border-0 shadow-none hover:shadow-lg transition-all duration-300 rounded-xl"
                        >
                            <CardContent className="p-6 flex items-center justify-center w-32 h-20">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

