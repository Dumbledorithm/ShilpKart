import React from 'react';
import { Sparkles } from 'lucide-react'; // Import an icon for the separator

const Marquee = ({ items }) => {
  const marqueeItems = [...items, ...items];

  return (
    // The main container now creates the fade effect
    <div className="relative w-full overflow-hidden bg-background group">
      {/* The scrolling content */}
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-8 text-lg font-semibold text-muted-foreground">
              {item}
            </span>
            <Sparkles className="h-5 w-5 text-primary/50" />
          </div>
        ))}
      </div>
      {/* Left-side gradient overlay */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"></div>
      {/* Right-side gradient overlay */}
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"></div>
    </div>
  );
};

export default Marquee;