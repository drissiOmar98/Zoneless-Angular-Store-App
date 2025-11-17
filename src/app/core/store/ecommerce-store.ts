import {Product} from '../../shared/models/product';
import {patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SignInDialog} from '../../shared/components/sign-in-dialog/sign-in-dialog';
import {SignInParams, User} from '../../shared/models/user';
import {Router} from '@angular/router';

export type EcommerceState = {
  products: Product[];
  category: string;
  user: User | undefined;
}

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [
      {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 4.5,
      reviewCount: 342,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracker with heart rate monitoring and GPS functionality.',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4.3,
      reviewCount: 187,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      rating: 4.7,
      reviewCount: 89,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '4',
      name: 'MacBook Pro 16"',
      description: 'Apple M3 Max chip, 48GB RAM, 1TB SSD - Space Black',
      price: 3500,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 892,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '5',
      name: 'Rolex Submariner',
      description: 'Luxury diving watch with ceramic bezel and 300m water resistance',
      price: 9000,
      imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 156,
      inStock: false,
      category: 'luxury'
    },
    {
      id: '6',
      name: 'Samsung 85" QLED',
      description: '8K Quantum HDR Smart TV with Alexa Built-in',
      price: 3000,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 945,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '7',
      name: 'Hermès Birkin 30',
      description: 'Handcrafted Togo leather bag with palladium hardware',
      price: 12500.00,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop',
      rating: 5.0,
      reviewCount: 89,
      inStock: true,
      category: 'luxury'
    },
    {
      id: '8',
      name: 'Nespresso VertuoPlus',
      description: 'Premium coffee machine with centrifusion technology',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
      rating: 4.4,
      reviewCount: 892,
      inStock: true,
      category: 'kitchen'
    },
    {
      id: '9',
      name: 'Canon EOS R5',
      description: 'Full-frame mirrorless camera with 8K video capability',
      price: 3900,
      imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 734,
      inStock: true,
      category: 'photography'
    },
    {
      id: '10',
      name: 'Herman Miller Aeron Chair',
      description: 'Ergonomic office chair with posture-fit lumbar support',
      price: 1495.00,
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 856,
      inStock: true,
      category: 'furniture'
    },
    {
      id: '11',
      name: 'DJI Mavic 3 Pro Drone',
      description: 'Professional drone with Hasselblad camera and 46min flight time',
      price: 2199.00,
      imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 432,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '12',
      name: 'Patagonia Nano Puff Jacket',
      description: 'Lightweight insulated jacket made from recycled materials',
      price: 239.00,
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 2341,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '13',
      name: 'PlayStation 5',
      description: 'Next-gen gaming console with 4K/120fps and ray tracing',
      price: 499.99,
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 5678,
      inStock: false,
      category: 'gaming'
    },
    {
      id: '14',
      name: 'Ray-Ban Aviator Classic',
      description: 'Original aviator sunglasses with G-15 lenses',
      price: 153.00,
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 6543,
      inStock: true,
      category: 'sunglasses'
    },
    {
      id: '15',
      name: 'Nike Air Jordan 1 Retro',
      description: 'Classic basketball sneakers with original colorway and premium leather',
      price: 180.00,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 2347,
      inStock: true,
      category: 'sneakers'
    },
    {
      id: '16',
      name: 'Converse Chuck Taylor All Star',
      description: 'Classic canvas sneakers in various colors and patterns',
      price: 65.00,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop',
      rating: 4.4,
      reviewCount: 8923,
      inStock: true,
      category: 'sneakers'
    },
    {
      id: '17',
      name: 'Chanel Classic Flap Bag',
      description: 'Quilted lambskin medium flap bag with gold chain',
      price: 8800.00,
      imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 234,
      inStock: true,
      category: 'luxury'
    },
    {
      id: '18',
      name: 'Levi\'s 511 Slim Jeans',
      description: 'Classic slim-fit jeans in various washes and colors',
      price: 79.50,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop',
      rating: 4.4,
      reviewCount: 9876,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '19',
      name: 'Nike Air Force 1 \'07',
      description: 'Classic white leather sneakers with durable rubber sole',
      price: 110.00,
      imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 12456,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '20',
      name: 'SteelSeries Arctis Nova Pro Headset',
      description: 'Premium wireless gaming headset with active noise cancellation',
      price: 349.99,
      imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 2876,
      inStock: true,
      category: 'gaming'
    },
    {
      id: '21',
      name: 'Alienware Aurora R15 Gaming PC',
      description: 'High-performance gaming desktop with RTX 4090 and Intel Core i9',
      price: 3300,
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 1234,
      inStock: true,
      category: 'gaming'
    },
    {
      id: '22',
      name: 'West Elm Mid-Century Desk',
      description: 'Walnut wood desk with hairpin legs and cable management',
      price: 899.00,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
      rating: 4.4,
      reviewCount: 543,
      inStock: true,
      category: 'furniture'
    },
    {
      id: '23',
      name: 'Lululemon ABC Pant Classic',
      description: 'Warpsense fabric pants with anti-ball crushing design',
      price: 128.00,
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 4321,
      inStock: true,
      category: 'clothing'
    },

    ],
    category: 'all',
    user: undefined,
  } as EcommerceState),
  withComputed(({category, products}) => ({
    filteredProducts: computed(() =>
      category() === 'all'
        ? products()
        : products().filter(p => p.category === category().toLowerCase())
    ),
  })),
  withMethods((store,matDialog = inject(MatDialog), router =inject(Router)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, {category});
    }),
    proceedToCheckout: () => {
      matDialog.open(SignInDialog, {
        disableClose: true,
        data: {
          checkout: true
        }
      })
    },
    signIn: ({email, password, checkout, dialogId}: SignInParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
        }
      });
      matDialog.getDialogById(dialogId)?.close();
      if(checkout){
        router.navigate(['/checkout']);
      }
    },

    signOut: () => {
      patchState(store, { user: undefined});
    }

  })),
  withHooks({
    onInit: (store) => {
      console.log('EcommerceStore initialized', store);
    },
    onDestroy: (store) => {
      console.log('EcommerceStore destroyed', store);
      // Cleanup logic if needed
    }
  })


);
