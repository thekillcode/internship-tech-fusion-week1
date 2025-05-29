import { HeroSection } from "./components";
import chef from '@/assets/images/home/about.webp'
import dish from '@/assets/images/home/dash_white.png'
import dish1 from '@/assets/images/home/dish1.jpeg'
import dish2 from '@/assets/images/home/dash4.jpg'
import dish3 from '@/assets/images/home/dish3.jpeg'
import dish4 from '@/assets/images/home/dish4.jpg'
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Badge } from "@/components/ui/badge";
const HomePage = () => {
  return (
    <main className="flex-auto">
      <HeroSection />
      <div className="w-full mx-auto max-w-5xl relative py-20">
        <div className="mb-10">
          <h4 className="font-bold text-3xl tracking-[10px]">Best Seller </h4>
        </div>
        <div >
          <Carousel plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 group">
                <div className="h-full">
                  <Card className="p-0 h-full overflow-hidden relative">
                    <CardContent className="flex aspect-square p-0">
                      <img
                        src={dish1}
                        className="w-full h-full object-cover  group-hover:scale-105 transition-all"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-custom-primary/70 rounded-b-2xl p-4 transition-transform duration-300 transform translate-y-[60px] group-hover:translate-y-0 overflow-hidden">
                        <div className="pb-2">
                          <Badge className="text-md">$ 112</Badge>
                        </div>
                        <h4 className="text-white font-semibold text-shadow-lg pb-3">Chicken</h4>
                        <p className="text-sm text-white font-medium line-clamp-2">
                          A chicken nugget is a food product consisting of a small piece950s by finding a way to make a coating adhere, chicken nuggets have become a very popular fast food restaurant item, and are widely sold frozen for home use.
                        </p>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 group">
                <div className="h-full">
                  <Card className="p-0 h-full overflow-hidden relative">
                    <CardContent className="flex aspect-square p-0">
                      <img
                        src={dish2}
                        className="w-full h-full object-cover  group-hover:scale-105 transition-all"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-custom-primary/70 rounded-b-2xl p-4 transition-transform duration-300 transform translate-y-[60px] group-hover:translate-y-0 overflow-hidden">
                        <div className="pb-2">
                          <Badge className="text-md">$ 78</Badge>
                        </div>
                        <h4 className="text-white font-semibold text-shadow-lg pb-3">Rice</h4>
                        <p className="text-sm text-white font-medium line-clamp-2">
                          A chicken nugget is a food product consisting of a small piece950s by finding a way to make a coating adhere, chicken nuggets have become a very popular fast food restaurant item, and are widely sold frozen for home use.
                        </p>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 group">
                <div className="h-full">
                  <Card className="p-0 h-full overflow-hidden relative">
                    <CardContent className="flex aspect-square p-0">
                      <img
                        src={dish3}
                        className="w-full h-full object-cover  group-hover:scale-105 transition-all"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-custom-primary/70 rounded-b-2xl p-4 transition-transform duration-300 transform translate-y-[60px] group-hover:translate-y-0 overflow-hidden">
                        <div className="pb-2">
                          <Badge className="text-md">$ 38</Badge>
                        </div>
                        <h4 className="text-white font-semibold text-shadow-lg pb-3">Macaroni</h4>
                        <p className="text-sm text-white font-medium line-clamp-2">
                          A chicken nugget is a food product consisting of a small piece950s by finding a way to make a coating adhere, chicken nuggets have become a very popular fast food restaurant item, and are widely sold frozen for home use.
                        </p>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 group">
                <div className="h-full">
                  <Card className="p-0 h-full overflow-hidden relative">
                    <CardContent className="flex aspect-square p-0">
                      <img
                        src={dish4}
                        className="w-full h-full object-cover  group-hover:scale-105 transition-all"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-custom-primary/70 rounded-b-2xl p-4 transition-transform duration-300 transform translate-y-[60px] group-hover:translate-y-0 overflow-hidden">
                        <div className="pb-2">
                          <Badge className="text-md">$ 19</Badge>
                        </div>
                        <h4 className="text-white font-semibold text-shadow-lg pb-3">Lazania</h4>
                        <p className="text-sm text-white font-medium line-clamp-2">
                          A chicken nugget is a food product consisting of a small piece950s by finding a way to make a coating adhere, chicken nuggets have become a very popular fast food restaurant item, and are widely sold frozen for home use.
                        </p>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
      </div>
      <div className="w-full mx-auto max-w-5xl relative">
        <div className="grid grid-cols-2 py-10">
          <div className="rounded-l-4xl overflow-hidden shadow-2xl p-10 box-border">
            <p className="text-custom-primary mb-8 font-semibold">Discover Your Test</p>
            <h4 className="text-5xl font-bold tracking-widest mb-8">We Provide Good Food For Your Family!</h4>
            <p className="pr-10">Ut enim acgsd minim veniam, quxcis nostrud exercitation ullamco laboris nisi ufsit aliquip ex ea commodo consequat is aute irure m, quis nostrud exer.</p>
          </div>
          <div className="rounded-r-4xl overflow-hidden shadow-2xl">
            <img src={chef} className="w-full h-full" />
          </div>
        </div>
        <div className="absolute w-30 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-spin-slow">
          <img src={dish} className="w-full h-full" />
        </div>
      </div>

    </main>
  );
}

export default HomePage;