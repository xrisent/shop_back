import { Color } from 'src/color/entities/color.entity';
import { Product } from 'src/product/entities/product.entity';
import { Size } from 'src/size/entities/size.entity';

export class CartItem {
  product: Product;
  color: Color;
  size: Size;
  quantity: number;
}
