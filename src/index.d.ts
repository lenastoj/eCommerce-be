import User from '@models/user.model';
import Cart from '@models/cart.model';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: User;
    cart?: Cart;
  }
}
