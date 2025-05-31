import { useEffect, useRef, useState } from 'react';
import { ChefHat, Globe, Utensils, Store } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatisticsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    { 
      value: 123, 
      title: 'Outlets Worldwide', 
      description: 'Serving communities across the globe',
      icon: <Store className="w-8 h-8 mx-auto text-custom-primary mb-3" />
    },
    { 
      value: 100, 
      title: 'Professional Chefs', 
      description: 'Culinary experts crafting perfection',
      icon: <ChefHat className="w-8 h-8 mx-auto text-custom-primary mb-3" />
    },
    { 
      value: 300, 
      title: 'Unique Menu Items', 
      description: 'Diverse flavors for every palate',
      icon: <Utensils className="w-8 h-8 mx-auto text-custom-primary mb-3" />
    },
    { 
      value: 30, 
      title: 'Countries', 
      description: 'Bringing taste worldwide',
      icon: <Globe className="w-8 h-8 mx-auto text-custom-primary mb-3" />
    },
  ];

  const [displayValues, setDisplayValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 2000; // Animation duration in ms
    const startTime = performance.now();

    const updateCounters = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      setDisplayValues(prev => 
        prev.map((_, index) => 
          Math.floor(progress * stats[index].value)
        )
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        // Ensure final values are exact
        setDisplayValues(stats.map(stat => stat.value));
      }
    };

    requestAnimationFrame(updateCounters);
  };

  return (
    <div className="w-full mx-auto max-w-5xl relative py-20">
      <div className="mb-10">
        <h4 className="font-bold text-3xl tracking-[10px] text-center">Our Global Reach</h4>
      </div>
      
      <div 
        ref={sectionRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              {stat.icon}
              <CardTitle className="text-4xl font-bold text-custom-primary">
                {displayValues[index].toLocaleString()}+
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h5 className="text-lg font-semibold mb-2">{stat.title}</h5>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;