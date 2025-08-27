import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// A reusable component for each grid item to keep the code clean
const BentoGridItem = ({ to, className, imageSrc, altText, title, titleClassName }) => {
  // Animation for the image to scale on hover and reveal on load
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }, // A smoother ease
    },
  };

  // Animation for the text overlay to slide in
  const textVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <Link to={to} className="block h-full group relative overflow-hidden rounded-lg">
        <motion.img
          src={imageSrc}
          alt={altText}
          variants={imageVariants}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full overflow-hidden">
            <motion.h3
              variants={textVariants}
              className={`font-bold text-white ${titleClassName}`}
            >
              {title}
            </motion.h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BentoGrid = ({ products = [] }) => {
  const getProduct = (index) => products[index] || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <BentoGridItem
        to={`/product/${getProduct(0)._id}`}
        className="md:col-span-2 md:row-span-2"
        imageSrc={getProduct(0).image || 'https://placehold.co/600x600/F3EAD8/A2673B?text=Pottery'}
        altText={getProduct(0).name || 'Featured Product'}
        title={getProduct(0).name || 'Handmade Pottery'}
        titleClassName="text-2xl"
      />
      <BentoGridItem
        to={`/product/${getProduct(1)._id}`}
        imageSrc={getProduct(1).image || 'https://placehold.co/300x300/D1E2C4/4B5D4B?text=Textiles'}
        altText={getProduct(1).name || 'Category'}
        title={getProduct(1).name || 'Textiles'}
        titleClassName="text-lg"
      />
      <BentoGridItem
        to={`/product/${getProduct(2)._id}`}
        imageSrc={getProduct(2).image || 'https://placehold.co/300x300/E8D8C9/8C6D52?text=Jewelry'}
        altText={getProduct(2).name || 'Category'}
        title={getProduct(2).name || 'Jewelry'}
        titleClassName="text-lg"
      />
      <BentoGridItem
        to={`/product/${getProduct(3)._id}`}
        className="md:col-span-2"
        imageSrc={getProduct(3).image || 'https://placehold.co/600x300/F0E5DE/A67B5B?text=Decor'}
        altText={getProduct(3).name || 'Category'}
        title={getProduct(3).name || 'Home Decor'}
        titleClassName="text-2xl"
      />
    </div>
  );
};

export default BentoGrid;