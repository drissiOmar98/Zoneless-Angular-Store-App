import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all'
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-grid/products-grid').then(m => m.ProductsGrid)
  },
  {
    path: 'product/:productId',
    loadComponent: () => import('./pages/view-product-details/view-product-details').then(m => m.ViewProductDetails)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist').then(m => m.MyWishlist)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart').then(m => m.ViewCart)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout)
  },
  {
    path: 'order-success',
    loadComponent: () => import('./pages/order-success/order-success').then(m => m.OrderSuccess)
  },
];
