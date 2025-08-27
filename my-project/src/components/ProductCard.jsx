import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => (
  <Card className="overflow-hidden group border-none shadow-none rounded-lg">
    <Link to={`/product/${product._id}`} className="outline-none">
      <div className="overflow-hidden aspect-square bg-secondary rounded-lg relative">
        <img
          src={product.image || `https://placehold.co/400x400/EBD4CB/86685D?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 hover:bg-secondary">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </Link>
    <CardContent className="p-2 pt-4">
      <Link to={`/product/${product._id}`} className="outline-none">
        <h3 className="text-sm font-semibold text-foreground truncate">{product.name}</h3>
      </Link>
      <div className="flex items-center justify-between mt-2">
        <p className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</p>
      </div>
    </CardContent>
  </Card>
);

export default ProductCard;