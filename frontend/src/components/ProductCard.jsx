import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => (
  <Link to={`/product/${product._id}`} className="outline-none group">
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg border-transparent hover:border-border">
      <CardContent className="p-0">
        <div className="overflow-hidden aspect-[4/3]">
          <img
            src={product.image || `https://placehold.co/400x300/EBD4CB/86685D?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 border-t">
          <h3 className="text-base font-semibold text-foreground truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</p>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default ProductCard;