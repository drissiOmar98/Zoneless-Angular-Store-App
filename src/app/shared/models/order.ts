import {CartItem} from './cart-item';

export type Order = {
    id: string;
    userId: string;
    total: number;
    items: CartItem[];
    paymentStatus: 'success' | 'failure';
};
