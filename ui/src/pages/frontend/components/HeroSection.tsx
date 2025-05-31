import { useState, useEffect } from 'react';
import img1 from '@/assets/images/home/car1.jpg'
import img2 from '@/assets/images/home/car2.webp'
import img3 from '@/assets/images/home/car3.jpeg'
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === 2 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNext = () => {
    setCurrentSlide(prev => (prev === 2 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide(prev => (prev === 0 ? 2 : prev - 1));
  };

  return (
    <div className="h-screen overflow-hidden -mt-24 relative text-white carousel">
      <div className="list">
        {/* Slide 1 */}
        <div 
          className={cn([
            "item absolute inset-[0_0_0_0] before:absolute before:inset-[0_0_0_0] before:content-[''] before:w-full before:h-full before:bg-[#0000006c]",
            currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          ])}
          style={{ transition: 'opacity 500ms ease-in-out' }}
        >
          <img src={img1} className='w-full h-full object-cover' />

          <div className="absolute top-1/5 sm:left-1/2 left-10 -translate-x-1 sm:-translate-x-1/2 max-w-7xl box-border text-shadow-[0_5px_10px_#0004]">
            <div className="font-bold tracking-[10px] dish">Clean</div>
            <div className="font-bold text-5xl leading-20 chief">All Foods</div>
            <div className="font-bold text-5xl leading-20 text-custom-primary type"></div>
            <div className="description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa ex voluptas expedita neque voluptatum sunt maxime iusto accusantium, temporibus consequuntur commodi non, quis, assumenda porro et quas voluptates aspernatur ut inventore autem quia. Laboriosam et beatae a eligendi. Recusandae, eos. A molestiae est sunt neque autem ut accusantium dolor reprehenderit!
            </div>
            <div className="grid gap-1.5 mt-5 grid-cols-[150px_150px] grid-rows-[40px] buttons">
              <button className='border-none bg-[#eee] tracking-[3px] font-serif font-medium text-black'>Order Now</button>
              <button className='tracking-[3px] font-serif font-medium bg-transparent text-white border-2 border-white border-solid hover:bg-custom-primary hover:text-white transition-colors'>Book A Table</button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div 
          className={cn([
            "item absolute inset-[0_0_0_0] before:absolute before:inset-[0_0_0_0] before:content-[''] before:w-full before:h-full before:bg-[#0000006c]",
            currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          ])}
          style={{ transition: 'opacity 500ms ease-in-out' }}
        >
          <img src={img2} className='w-full h-full object-cover' />

          <div className="absolute top-1/5 sm:left-1/2 left-10 -translate-x-1 sm:-translate-x-1/2 max-w-7xl box-border text-shadow-[0_5px_10px_#0004]">
            <div className="font-bold tracking-[10px] dish">Healthy</div>
            <div className="font-bold text-5xl leading-20 chief">Master Chief</div>
            <div className="font-bold text-5xl leading-20 text-custom-primary type">Resturant</div>
            <div className="description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa ex voluptas expedita neque voluptatum sunt maxime iusto accusantium, temporibus consequuntur commodi non, quis, assumenda porro et quas voluptates aspernatur ut inventore autem quia. Laboriosam et beatae a eligendi. Recusandae, eos. A molestiae est sunt neque autem ut accusantium dolor reprehenderit!
            </div>
            <div className="grid gap-1.5 mt-5 grid-cols-[150px_150px] grid-rows-[40px] buttons">
              <button className='border-none bg-[#eee] tracking-[3px] font-serif font-medium text-black'>Order Now</button>
              <button className='tracking-[3px] font-serif font-medium bg-transparent text-white border-2 border-white border-solid hover:bg-custom-primary hover:text-white transition-colors'>Book A Table</button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div 
          className={cn([
            "item absolute inset-[0_0_0_0] before:absolute before:inset-[0_0_0_0] before:content-[''] before:w-full before:h-full before:bg-[#0000006c]",
            currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          ])}
          style={{ transition: 'opacity 500ms ease-in-out' }}
        >
          <img src={img3} className='w-full h-full object-cover' />

          <div className="absolute top-1/5 sm:left-1/2 left-10 -translate-x-1 sm:-translate-x-1/2 max-w-7xl box-border text-shadow-[0_5px_10px_#0004]">
            <div className="font-bold tracking-[10px] dish">Vagetables</div>
            <div className="font-bold text-5xl leading-20 chief">Master Chief</div>
            <div className="font-bold text-5xl leading-20 text-custom-primary type">Pasta</div>
            <div className="description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa ex voluptas expedita neque voluptatum sunt maxime iusto accusantium, temporibus consequuntur commodi non, quis, assumenda porro et quas voluptates aspernatur ut inventore autem quia. Laboriosam et beatae a eligendi. Recusandae, eos. A molestiae est sunt neque autem ut accusantium dolor reprehenderit!
            </div>
            <div className="grid gap-1.5 mt-5 grid-cols-[150px_150px] grid-rows-[40px] buttons">
              <button className='border-none bg-[#eee] tracking-[3px] font-serif font-medium text-black'>Order Now</button>
              <button className='tracking-[3px] font-serif font-medium bg-transparent text-white border-2 border-white border-solid hover:bg-custom-primary hover:text-white transition-colors'>Book A Table</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons - kept exactly as you had them */}
      <div className='absolute z-[19] top-11/12 right-[52%] w-[300px] max-w-[30%] flex gap-[10px] items-center'>
        <button 
          onClick={goToPrev}
          className='w-10 h-10 rounded-full bg-[#eee4] border-none font-mono text-white font-bold duration-500 hover:bg-white hover:text-[#555]'
        >
          {"<"}
        </button>
        <button 
          onClick={goToNext}
          className='w-10 h-10 rounded-full bg-[#eee4] border-none font-mono text-white font-bold duration-500 hover:bg-white hover:text-[#555]'
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default HeroSection;