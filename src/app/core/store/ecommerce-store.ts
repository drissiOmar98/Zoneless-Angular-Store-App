import {Product} from '../../shared/models/product';
import {patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SignInDialog} from '../../shared/components/sign-in-dialog/sign-in-dialog';
import {SignInParams, SignUpParams, User} from '../../shared/models/user';
import {Router} from '@angular/router';
import {Toaster} from '../../shared/services/toaster';
import {Order} from '../../shared/models/order';
import {CartStore} from './cart.store';
import {withStorageSync} from '@angular-architects/ngrx-toolkit';
import {AddReviewParams, UserReview} from '../../shared/models/user-review';
import {produce} from 'immer';
import {SeoManager} from '../../shared/services/seo-manager';

export type EcommerceState = {
  products: Product[];
  category: string;
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean
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
        category: 'electronics',
        reviews: [
          {
            id: 'rev1-1',
            productId: '1',
            userName: 'Michael Chen',
            userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            title: 'Excellent sound quality!',
            comment: 'The noise cancellation is amazing. Battery life lasts me all week.',
            reviewDate: new Date('2024-01-15')
          },
          {
            id: 'rev1-2',
            productId: '1',
            userName: 'Sarah Johnson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 4,
            title: 'Great headphones',
            comment: 'Comfortable for long sessions. Sound is crisp and clear.',
            reviewDate: new Date('2024-01-20')
          },
          {
            id: 'rev1-3',
            productId: '1',
            userName: 'David Kim',
            userImageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
            rating: 4,
            title: 'Solid choice',
            comment: 'Good value for money. Connects easily to all my devices.',
            reviewDate: new Date('2024-02-05')
          }
        ]
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
        category: 'electronics',
        reviews: [
          {
            id: 'rev2-1',
            productId: '2',
            userName: 'Emma Wilson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
            rating: 5,
            title: 'Game changer for workouts',
            comment: 'Accurate heart rate monitoring and GPS tracking. Love the sleep analysis.',
            reviewDate: new Date('2024-01-18')
          },
          {
            id: 'rev2-2',
            productId: '2',
            userName: 'James Rodriguez',
            userImageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
            rating: 4,
            title: 'Great fitness companion',
            comment: 'Battery lasts 5 days with normal use. App is intuitive and easy to use.',
            reviewDate: new Date('2024-02-10')
          }
        ]
      },
      {
        id: '3',
        name: 'Professional Camera',
        description: 'Mirrorless camera with 24MP sensor and 4K video recording',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
        rating: 4.7,
        reviewCount: 256,
        inStock: true,
        category: 'photography',
        reviews: [
          {
            id: 'rev3-1',
            productId: '3',
            userName: 'Alex Thompson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
            rating: 5,
            title: 'Professional quality',
            comment: 'Image quality is outstanding. 4K video is crisp and detailed.',
            reviewDate: new Date('2024-01-22')
          },
          {
            id: 'rev3-2',
            productId: '3',
            userName: 'Lisa Park',
            userImageUrl: 'https://randomuser.me/api/portraits/women/51.jpg',
            rating: 5,
            title: 'Worth every penny',
            comment: 'Upgraded from an older model. The autofocus system is incredible.',
            reviewDate: new Date('2024-02-12')
          },
          {
            id: 'rev3-3',
            productId: '3',
            userName: 'Robert Chen',
            userImageUrl: 'https://randomuser.me/api/portraits/men/71.jpg',
            rating: 4,
            title: 'Excellent camera',
            comment: 'Great for both photos and video. Lens selection is fantastic.',
            reviewDate: new Date('2024-02-28')
          }
        ]
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
        category: 'electronics',
        reviews: [
          {
            id: 'rev4-1',
            productId: '4',
            userName: 'Daniel Miller',
            userImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
            rating: 5,
            title: 'Absolute beast',
            comment: 'Handles 4K video editing without breaking a sweat. Battery life is incredible.',
            reviewDate: new Date('2024-01-25')
          },
          {
            id: 'rev4-2',
            productId: '4',
            userName: 'Sophia Williams',
            userImageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
            rating: 5,
            title: 'Perfect for development',
            comment: 'Compiles code in seconds. The display is gorgeous for long coding sessions.',
            reviewDate: new Date('2024-02-15')
          }
        ]
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
        category: 'luxury',
        reviews: [
          {
            id: 'rev5-1',
            productId: '5',
            userName: 'William Taylor',
            userImageUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
            rating: 5,
            title: 'Timeless classic',
            comment: 'The craftsmanship is exceptional. Gets compliments everywhere I go.',
            reviewDate: new Date('2024-01-30')
          },
          {
            id: 'rev5-2',
            productId: '5',
            userName: 'Olivia Martin',
            userImageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
            rating: 5,
            title: 'Investment piece',
            comment: 'Beautiful watch that holds its value. Perfect for any occasion.',
            reviewDate: new Date('2024-02-18')
          }
        ]
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
        category: 'electronics',
        reviews: [
          {
            id: 'rev6-1',
            productId: '6',
            userName: 'Kevin Brown',
            userImageUrl: 'https://randomuser.me/api/portraits/men/38.jpg',
            rating: 5,
            title: 'Picture quality is stunning',
            comment: 'Movies feel like being in a theater. The colors are incredibly vibrant.',
            reviewDate: new Date('2024-02-05')
          },
          {
            id: 'rev6-2',
            productId: '6',
            userName: 'Amanda Lee',
            userImageUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
            rating: 4,
            title: 'Impressive TV',
            comment: 'Great for gaming and movies. Smart features work seamlessly.',
            reviewDate: new Date('2024-02-22')
          }
        ]
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
        category: 'luxury',
        reviews: [
          {
            id: 'rev7-1',
            productId: '7',
            userName: 'Jennifer Adams',
            userImageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
            rating: 5,
            title: 'Absolute perfection',
            comment: 'The leather quality is unmatched. A true investment piece that will last forever.',
            reviewDate: new Date('2024-02-08')
          },
          {
            id: 'rev7-2',
            productId: '7',
            userName: 'Michelle Roberts',
            userImageUrl: 'https://randomuser.me/api/portraits/women/72.jpg',
            rating: 5,
            title: 'Dream bag achieved',
            comment: 'Worth the wait and investment. Craftsmanship is beyond compare.',
            reviewDate: new Date('2024-02-25')
          }
        ]
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
        category: 'kitchen',
        reviews: [
          {
            id: 'rev8-1',
            productId: '8',
            userName: 'Thomas Wilson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
            rating: 5,
            title: 'Coffee shop quality at home',
            comment: 'Makes perfect coffee every time. Easy to clean and maintain.',
            reviewDate: new Date('2024-02-12')
          },
          {
            id: 'rev8-2',
            productId: '8',
            userName: 'Rachel Green',
            userImageUrl: 'https://randomuser.me/api/portraits/women/38.jpg',
            rating: 4,
            title: 'Great machine',
            comment: 'Love the variety of coffee options. Fast and convenient.',
            reviewDate: new Date('2024-02-28')
          }
        ]
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
        category: 'photography',
        reviews: [
          {
            id: 'rev9-1',
            productId: '9',
            userName: 'Mark Johnson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
            rating: 5,
            title: 'Professional workhorse',
            comment: '8K video is incredible. Autofocus system is the best I have ever used.',
            reviewDate: new Date('2024-02-15')
          },
          {
            id: 'rev9-2',
            productId: '9',
            userName: 'Jessica Wong',
            userImageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
            rating: 5,
            title: 'Worth the upgrade',
            comment: 'Upgraded from DSLR. The electronic viewfinder and IBIS are game changers.',
            reviewDate: new Date('2024-03-01')
          }
        ]
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
        category: 'furniture',
        reviews: [
          {
            id: 'rev10-1',
            productId: '10',
            userName: 'Brian Davis',
            userImageUrl: 'https://randomuser.me/api/portraits/men/49.jpg',
            rating: 5,
            title: 'Back pain disappeared',
            comment: 'Worth every penny. My back pain is gone after working 8+ hours daily.',
            reviewDate: new Date('2024-02-18')
          },
          {
            id: 'rev10-2',
            productId: '10',
            userName: 'Nancy Cooper',
            userImageUrl: 'https://randomuser.me/api/portraits/women/56.jpg',
            rating: 4,
            title: 'Excellent comfort',
            comment: 'Highly adjustable and comfortable. Great for long work sessions.',
            reviewDate: new Date('2024-03-05')
          }
        ]
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
        category: 'electronics',
        reviews: [
          {
            id: 'rev11-1',
            productId: '11',
            userName: 'Chris Evans',
            userImageUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
            rating: 5,
            title: 'Professional aerial footage',
            comment: 'Camera quality is exceptional. Flight time is impressive.',
            reviewDate: new Date('2024-02-20')
          }
        ]
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
        category: 'clothing',
        reviews: [
          {
            id: 'rev12-1',
            productId: '12',
            userName: 'Taylor Scott',
            userImageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
            rating: 5,
            title: 'Perfect for outdoor activities',
            comment: 'Lightweight but warm. Great for hiking and casual wear.',
            reviewDate: new Date('2024-02-22')
          }
        ]
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
        category: 'gaming',
        reviews: [
          {
            id: 'rev13-1',
            productId: '13',
            userName: 'Mike Rodriguez',
            userImageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
            rating: 5,
            title: 'Next-level gaming',
            comment: 'Graphics are incredible. Load times are dramatically improved.',
            reviewDate: new Date('2024-02-25')
          }
        ]
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
        category: 'sunglasses',
        reviews: [
          {
            id: 'rev14-1',
            productId: '14',
            userName: 'Jason Miller',
            userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
            rating: 5,
            title: 'Timeless classic',
            comment: 'Perfect fit and lens quality. Get compliments every time I wear them.',
            reviewDate: new Date('2024-02-10')
          },
          {
            id: 'rev14-2',
            productId: '14',
            userName: 'Samantha Brown',
            userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
            rating: 5,
            title: 'Best sunglasses ever',
            comment: 'Worth every penny. Crystal clear vision and super durable.',
            reviewDate: new Date('2024-02-28')
          },
          {
            id: 'rev14-3',
            productId: '14',
            userName: 'Carlos Gomez',
            userImageUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
            rating: 4,
            title: 'Great quality',
            comment: 'Comfortable and stylish. Perfect for driving.',
            reviewDate: new Date('2024-03-05')
          }
        ]
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
        category: 'sneakers',
        reviews: [
          {
            id: 'rev15-1',
            productId: '15',
            userName: 'Marcus Thompson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
            rating: 5,
            title: 'Iconic sneakers',
            comment: 'Perfect retro look. Leather quality is amazing and they are very comfortable.',
            reviewDate: new Date('2024-02-15')
          },
          {
            id: 'rev15-2',
            productId: '15',
            userName: 'Aisha Johnson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
            rating: 5,
            title: 'Love these!',
            comment: 'True to size and great for casual wear. Gets lots of compliments.',
            reviewDate: new Date('2024-03-01')
          },
          {
            id: 'rev15-3',
            productId: '15',
            userName: 'Kevin Lewis',
            userImageUrl: 'https://randomuser.me/api/portraits/men/51.jpg',
            rating: 4,
            title: 'Great sneakers',
            comment: 'Comfortable and stylish. Would recommend going half size up.',
            reviewDate: new Date('2024-03-08')
          }
        ]
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
        category: 'sneakers',
        reviews: [
          {
            id: 'rev16-1',
            productId: '16',
            userName: 'Emma Davis',
            userImageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
            rating: 5,
            title: 'Classic and comfortable',
            comment: 'Perfect everyday sneakers. Goes with everything in my wardrobe.',
            reviewDate: new Date('2024-02-12')
          },
          {
            id: 'rev16-2',
            productId: '16',
            userName: 'Ryan Wilson',
            userImageUrl: 'https://randomuser.me/api/portraits/men/35.jpg',
            rating: 4,
            title: 'Great value',
            comment: 'Affordable and durable. Perfect for casual wear.',
            reviewDate: new Date('2024-02-25')
          },
          {
            id: 'rev16-3',
            productId: '16',
            userName: 'Sophie Martin',
            userImageUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
            rating: 4,
            title: 'Timeless design',
            comment: 'Love the classic look. Need to break them in but then they are perfect.',
            reviewDate: new Date('2024-03-03')
          }
        ]
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
        category: 'luxury',
        reviews: [
          {
            id: 'rev17-1',
            productId: '17',
            userName: 'Victoria Chen',
            userImageUrl: 'https://randomuser.me/api/portraits/women/62.jpg',
            rating: 5,
            title: 'Dream bag',
            comment: 'The craftsmanship is impeccable. The lambskin is buttery soft and beautiful.',
            reviewDate: new Date('2024-02-18')
          },
          {
            id: 'rev17-2',
            productId: '17',
            userName: 'Isabella Rossi',
            userImageUrl: 'https://randomuser.me/api/portraits/women/59.jpg',
            rating: 5,
            title: 'Worth the investment',
            comment: 'Timeless piece that will never go out of style. Perfect size for everyday.',
            reviewDate: new Date('2024-03-02')
          }
        ]
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
        category: 'clothing',
        reviews: [
          {
            id: 'rev18-1',
            productId: '18',
            userName: 'Daniel Park',
            userImageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
            rating: 5,
            title: 'Perfect fit',
            comment: 'Best fitting jeans I have ever owned. True to size and comfortable.',
            reviewDate: new Date('2024-02-20')
          },
          {
            id: 'rev18-2',
            productId: '18',
            userName: 'Megan Taylor',
            userImageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
            rating: 4,
            title: 'Great quality',
            comment: 'Durable denim that holds up well. Multiple washes and still looks great.',
            reviewDate: new Date('2024-03-04')
          },
          {
            id: 'rev18-3',
            productId: '18',
            userName: 'Alex Kim',
            userImageUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
            rating: 4,
            title: 'Solid jeans',
            comment: 'Good value for the price. Slim fit is perfect, not too tight.',
            reviewDate: new Date('2024-03-10')
          }
        ]
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
        category: 'sneakers',
        reviews: [
          {
            id: 'rev19-1',
            productId: '19',
            userName: 'Jordan Lee',
            userImageUrl: 'https://randomuser.me/api/portraits/men/26.jpg',
            rating: 5,
            title: 'All-time classic',
            comment: 'Clean white sneakers that go with everything. Comfortable for all-day wear.',
            reviewDate: new Date('2024-02-22')
          },
          {
            id: 'rev19-2',
            productId: '19',
            userName: 'Tyler Morgan',
            userImageUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
            rating: 5,
            title: 'Must-have sneakers',
            comment: 'Perfect for casual and dressy occasions. Leather cleans easily.',
            reviewDate: new Date('2024-03-06')
          },
          {
            id: 'rev19-3',
            productId: '19',
            userName: 'Chloe Adams',
            userImageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
            rating: 4,
            title: 'Great sneakers',
            comment: 'True to size. Need to break them in but then they are super comfortable.',
            reviewDate: new Date('2024-03-12')
          }
        ]
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
        category: 'gaming',
        reviews: [
          {
            id: 'rev20-1',
            productId: '20',
            userName: 'GamerPro99',
            userImageUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
            rating: 5,
            title: 'Best gaming headset',
            comment: 'Crystal clear audio and mic quality. Battery lasts for days of gaming.',
            reviewDate: new Date('2024-02-25')
          },
          {
            id: 'rev20-2',
            productId: '20',
            userName: 'Sarah Streams',
            userImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            rating: 4,
            title: 'Excellent for streaming',
            comment: 'Great sound isolation and comfortable for long streaming sessions.',
            reviewDate: new Date('2024-03-08')
          },
          {
            id: 'rev20-3',
            productId: '20',
            userName: 'Mike Gaming',
            userImageUrl: 'https://randomuser.me/api/portraits/men/58.jpg',
            rating: 4,
            title: 'Premium quality',
            comment: 'Sound positioning is perfect for competitive gaming. Very comfortable.',
            reviewDate: new Date('2024-03-14')
          }
        ]
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
        category: 'gaming',
        reviews: [
          {
            id: 'rev21-1',
            productId: '21',
            userName: 'PC Master',
            userImageUrl: 'https://randomuser.me/api/portraits/men/39.jpg',
            rating: 5,
            title: 'Absolute monster',
            comment: 'Runs everything at max settings. Cool and quiet even under heavy load.',
            reviewDate: new Date('2024-02-28')
          },
          {
            id: 'rev21-2',
            productId: '21',
            userName: 'Jennifer Tech',
            userImageUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
            rating: 5,
            title: 'Worth every dollar',
            comment: 'Perfect for 4K gaming and video editing. Everything loads instantly.',
            reviewDate: new Date('2024-03-10')
          },
          {
            id: 'rev21-3',
            productId: '21',
            userName: 'David Builder',
            userImageUrl: 'https://randomuser.me/api/portraits/men/61.jpg',
            rating: 4,
            title: 'Excellent performance',
            comment: 'Great build quality. Easy to upgrade components when needed.',
            reviewDate: new Date('2024-03-16')
          }
        ]
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
        category: 'furniture',
        reviews: [
          {
            id: 'rev22-1',
            productId: '22',
            userName: 'Home Office Pro',
            userImageUrl: 'https://randomuser.me/api/portraits/women/42.jpg',
            rating: 5,
            title: 'Beautiful and functional',
            comment: 'Sturdy construction and beautiful walnut finish. Perfect size for my office.',
            reviewDate: new Date('2024-03-01')
          },
          {
            id: 'rev22-2',
            productId: '22',
            userName: 'Design Enthusiast',
            userImageUrl: 'https://randomuser.me/api/portraits/men/47.jpg',
            rating: 4,
            title: 'Great mid-century design',
            comment: 'Love the hairpin legs. Cable management system keeps everything tidy.',
            reviewDate: new Date('2024-03-12')
          },
          {
            id: 'rev22-3',
            productId: '22',
            userName: 'Remote Worker',
            userImageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
            rating: 4,
            title: 'Perfect home office desk',
            comment: 'Spacious enough for dual monitors and still has room for paperwork.',
            reviewDate: new Date('2024-03-18')
          }
        ]
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
        category: 'clothing',
        reviews: [
          {
            id: 'rev23-1',
            productId: '23',
            userName: 'John Active',
            userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            title: 'Most comfortable pants',
            comment: 'Wear these for work, travel, and workouts. Stretchy but still professional.',
            reviewDate: new Date('2024-03-03')
          },
          {
            id: 'rev23-2',
            productId: '23',
            userName: 'Office Comfort',
            userImageUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
            rating: 5,
            title: 'Game changer',
            comment: 'Look like dress pants but feel like sweatpants. Perfect for long work days.',
            reviewDate: new Date('2024-03-14')
          },
          {
            id: 'rev23-3',
            productId: '23',
            userName: 'Tech Worker',
            userImageUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
            rating: 4,
            title: 'Worth the price',
            comment: 'High quality fabric that holds up well. ABC design really works!',
            reviewDate: new Date('2024-03-20')
          }
        ]
      },
      {
        id: '24',
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        rating: 4.7,
        reviewCount: 89,
        inStock: true,
        category: 'clothing',
        reviews: [
          {
            id: 'rev24-1',
            productId: '24',
            userName: 'Eco Shopper',
            userImageUrl: 'https://randomuser.me/api/portraits/women/53.jpg',
            rating: 5,
            title: 'Soft and sustainable',
            comment: 'Love that it is organic cotton. Very soft and holds its shape after washing.',
            reviewDate: new Date('2024-03-05')
          },
          {
            id: 'rev24-2',
            productId: '24',
            userName: 'Minimalist Style',
            userImageUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
            rating: 4,
            title: 'Great basic tee',
            comment: 'Perfect fit and good quality for the price. Have multiple colors.',
            reviewDate: new Date('2024-03-16')
          },
          {
            id: 'rev24-3',
            productId: '24',
            userName: 'Comfort Seeker',
            userImageUrl: 'https://randomuser.me/api/portraits/women/57.jpg',
            rating: 5,
            title: 'Everyday essential',
            comment: 'Most comfortable t-shirt I own. Perfect for layering or wearing alone.',
            reviewDate: new Date('2024-03-22')
          }
        ]
      },
      {
        id: '25',
        name: 'Leather Crossbody Bag',
        description: 'Compact genuine leather crossbody bag with adjustable strap',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
        rating: 4.8,
        reviewCount: 215,
        inStock: true,
        category: 'luxury',
        reviews: [
          {
            id: 'rev25-1',
            productId: '25',
            userName: 'Fashion Traveler',
            userImageUrl: 'https://randomuser.me/api/portraits/women/46.jpg',
            rating: 5,
            title: 'Perfect travel bag',
            comment: 'Fits phone, wallet, keys, and small essentials. Leather is high quality.',
            reviewDate: new Date('2024-03-07')
          },
          {
            id: 'rev25-2',
            productId: '25',
            userName: 'Leather Lover',
            userImageUrl: 'https://randomuser.me/api/portraits/women/60.jpg',
            rating: 5,
            title: 'Beautiful leather',
            comment: 'Genuine leather that smells amazing. Adjustable strap is very convenient.',
            reviewDate: new Date('2024-03-18')
          },
          {
            id: 'rev25-3',
            productId: '25',
            userName: 'Practical Shopper',
            userImageUrl: 'https://randomuser.me/api/portraits/women/64.jpg',
            rating: 4,
            title: 'Great everyday bag',
            comment: 'Perfect size for running errands. Hands-free and secure.',
            reviewDate: new Date('2024-03-24')
          }
        ]
      },
      {
        id: '26',
        name: 'Tablet',
        description: '10-inch tablet with 128GB storage and stylus support',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        rating: 4.6,
        reviewCount: 489,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'rev26-1',
            productId: '26',
            userName: 'Tech Student',
            userImageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
            rating: 5,
            title: 'Perfect for school',
            comment: 'Great for taking notes with stylus and watching lectures. Battery lasts all day.',
            reviewDate: new Date('2024-03-08')
          },
          {
            id: 'rev26-2',
            productId: '26',
            userName: 'Digital Artist',
            userImageUrl: 'https://randomuser.me/api/portraits/men/43.jpg',
            rating: 4,
            title: 'Great for drawing',
            comment: 'Stylus is very responsive. Good screen quality for the price.',
            reviewDate: new Date('2024-03-19')
          },
          {
            id: 'rev26-3',
            productId: '26',
            userName: 'Casual User',
            userImageUrl: 'https://randomuser.me/api/portraits/women/52.jpg',
            rating: 4,
            title: 'Good tablet',
            comment: 'Perfect for streaming and light work. Fast enough for everyday tasks.',
            reviewDate: new Date('2024-03-25')
          }
        ]
      },
      {
        id: '27',
        name: 'Floor Mirror',
        description: 'Full-length standing mirror with wooden frame',
        price: 159.99,
        imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500',
        rating: 4.7,
        reviewCount: 198,
        inStock: true,
        category: 'furniture',
        reviews: [
          {
            id: 'rev27-1',
            productId: '27',
            userName: 'Home Decorator',
            userImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5,
            title: 'Beautiful mirror',
            comment: 'Wooden frame is high quality. Mirror is very clear without distortion.',
            reviewDate: new Date('2024-03-10')
          },
          {
            id: 'rev27-2',
            productId: '27',
            userName: 'Apartment Living',
            userImageUrl: 'https://randomuser.me/api/portraits/men/48.jpg',
            rating: 4,
            title: 'Great for small spaces',
            comment: 'Perfect size for my bedroom. Makes the room look bigger.',
            reviewDate: new Date('2024-03-21')
          },
          {
            id: 'rev27-3',
            productId: '27',
            userName: 'Fashion Blogger',
            userImageUrl: 'https://randomuser.me/api/portraits/women/58.jpg',
            rating: 5,
            title: 'Perfect for outfit checks',
            comment: 'Love the full-length view. Wood frame matches my decor perfectly.',
            reviewDate: new Date('2024-03-27')
          }
        ]
      },
      {
        id: '28',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        rating: 4.4,
        reviewCount: 164,
        inStock: false,
        category: 'electronics',
        reviews: [
          {
            id: 'rev28-1',
            productId: '28',
            userName: 'Office Worker',
            userImageUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
            rating: 4,
            title: 'Comfortable mouse',
            comment: 'Ergonomic design helps with wrist strain during long work days.',
            reviewDate: new Date('2024-03-12')
          },
          {
            id: 'rev28-2',
            productId: '28',
            userName: 'Gamer Lite',
            userImageUrl: 'https://randomuser.me/api/portraits/men/59.jpg',
            rating: 4,
            title: 'Good for casual use',
            comment: 'Precise tracking and long battery life. Good for everyday computing.',
            reviewDate: new Date('2024-03-23')
          },
          {
            id: 'rev28-3',
            productId: '28',
            userName: 'Student User',
            userImageUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
            rating: 5,
            title: 'Great value',
            comment: 'Works perfectly for my laptop. No lag and comfortable to use.',
            reviewDate: new Date('2024-03-29')
          }
        ]
      },
      {
        id: '29',
        name: 'Table Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature',
        price: 54.99,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        rating: 4.9,
        reviewCount: 534,
        inStock: true,
        category: 'furniture',
        reviews: [
          {
            id: 'rev29-1',
            productId: '29',
            userName: 'Night Reader',
            userImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
            rating: 5,
            title: 'Perfect lighting',
            comment: 'Adjustable color temperature is amazing for reading at night.',
            reviewDate: new Date('2024-03-14')
          },
          {
            id: 'rev29-2',
            productId: '29',
            userName: 'Home Office',
            userImageUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
            rating: 5,
            title: 'Reduces eye strain',
            comment: 'Different brightness levels help reduce eye strain during long work sessions.',
            reviewDate: new Date('2024-03-25')
          },
          {
            id: 'rev29-3',
            productId: '29',
            userName: 'Design Lover',
            userImageUrl: 'https://randomuser.me/api/portraits/women/61.jpg',
            rating: 4,
            title: 'Sleek design',
            comment: 'Modern look that fits my desk perfectly. Touch controls are intuitive.',
            reviewDate: new Date('2024-03-31')
          }
        ]
      },
      {
        id: '30',
        name: 'Sneakers',
        description: 'Casual canvas sneakers with cushioned insole',
        price: 69.99,
        imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
        rating: 4.5,
        reviewCount: 445,
        inStock: false,
        category: 'sneakers',
        reviews: [
          {
            id: 'rev30-1',
            productId: '30',
            userName: 'Weekend Walker',
            userImageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
            rating: 5,
            title: 'Comfortable all day',
            comment: 'Cushioned insole makes these perfect for walking all day.',
            reviewDate: new Date('2024-03-16')
          },
          {
            id: 'rev30-2',
            productId: '30',
            userName: 'Casual Style',
            userImageUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
            rating: 4,
            title: 'Great casual sneakers',
            comment: 'Go with jeans, shorts, or casual pants. True to size.',
            reviewDate: new Date('2024-03-27')
          },
          {
            id: 'rev30-3',
            productId: '30',
            userName: 'Value Shopper',
            userImageUrl: 'https://randomuser.me/api/portraits/men/63.jpg',
            rating: 4,
            title: 'Good quality',
            comment: 'Durable canvas and comfortable fit. Good value for the price.',
            reviewDate: new Date('2024-04-02')
          }
        ]
      },
      {
        id: '31',
        name: 'Coffee Maker',
        description: 'Programmable drip coffee maker with thermal carafe',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        rating: 4.5,
        reviewCount: 412,
        inStock: true,
        category: 'kitchen',
        reviews: [
          {
            id: 'rev31-1',
            productId: '31',
            userName: 'Coffee Addict',
            userImageUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
            rating: 5,
            title: 'Perfect morning coffee',
            comment: 'Programmable timer means fresh coffee when I wake up. Thermal carafe keeps it hot.',
            reviewDate: new Date('2024-03-18')
          },
          {
            id: 'rev31-2',
            productId: '31',
            userName: 'Family Brewer',
            userImageUrl: 'https://randomuser.me/api/portraits/women/54.jpg',
            rating: 4,
            title: 'Great for families',
            comment: 'Makes enough coffee for the whole family. Easy to clean and use.',
            reviewDate: new Date('2024-03-29')
          },
          {
            id: 'rev31-3',
            productId: '31',
            userName: 'Office Use',
            userImageUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
            rating: 4,
            title: 'Reliable machine',
            comment: 'Perfect for small office. Consistent brew quality every time.',
            reviewDate: new Date('2024-04-04')
          }
        ]
      },
      {
        id: '32',
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with active noise cancellation',
        price: 159.99,
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        rating: 4.5,
        reviewCount: 678,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'rev32-1',
            productId: '32',
            userName: 'Commuter',
            userImageUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
            rating: 5,
            title: 'Perfect for travel',
            comment: 'Noise cancellation blocks out subway and plane noise completely.',
            reviewDate: new Date('2024-03-20')
          },
          {
            id: 'rev32-2',
            productId: '32',
            userName: 'Workout Enthusiast',
            userImageUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
            rating: 4,
            title: 'Great for workouts',
            comment: 'Secure fit and sweat resistant. Battery lasts through long gym sessions.',
            reviewDate: new Date('2024-03-31')
          },
          {
            id: 'rev32-3',
            productId: '32',
            userName: 'Music Lover',
            userImageUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
            rating: 5,
            title: 'Amazing sound quality',
            comment: 'Crystal clear audio with deep bass. Case charges quickly.',
            reviewDate: new Date('2024-04-06')
          }
        ]
      },
      {
        id: '33',
        name: 'Formal Shirt',
        description: 'Slim-fit dress shirt in premium cotton blend',
        price: 54.99,
        imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        rating: 4.5,
        reviewCount: 312,
        inStock: true,
        category: 'clothing',
        reviews: [
          {
            id: 'rev33-1',
            productId: '33',
            userName: 'Office Professional',
            userImageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
            rating: 5,
            title: 'Perfect office shirt',
            comment: 'Slim fit looks professional without being too tight. Wrinkle resistant.',
            reviewDate: new Date('2024-03-22')
          },
          {
            id: 'rev33-2',
            productId: '33',
            userName: 'Wedding Guest',
            userImageUrl: 'https://randomuser.me/api/portraits/men/57.jpg',
            rating: 4,
            title: 'Great for formal events',
            comment: 'Wore this to a wedding and received many compliments. Comfortable all day.',
            reviewDate: new Date('2024-04-02')
          },
          {
            id: 'rev33-3',
            productId: '33',
            userName: 'Business Traveler',
            userImageUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
            rating: 4,
            title: 'Travel friendly',
            comment: 'Packs well without wrinkling. Good quality fabric for the price.',
            reviewDate: new Date('2024-04-08')
          }
        ]
      },
      {
        id: '34',
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket with a modern fit',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
        rating: 4.6,
        reviewCount: 203,
        inStock: true,
        category: 'clothing',
        reviews: [
          {
            id: 'rev34-1',
            productId: '34',
            userName: 'Style Icon',
            userImageUrl: 'https://randomuser.me/api/portraits/women/36.jpg',
            rating: 5,
            title: 'Versatile jacket',
            comment: 'Perfect for layering. Goes with dresses, jeans, or over sweaters.',
            reviewDate: new Date('2024-03-24')
          },
          {
            id: 'rev34-2',
            productId: '34',
            userName: 'Seasonal Wear',
            userImageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
            rating: 4,
            title: 'Great spring/fall jacket',
            comment: 'Perfect weight for transitional weather. Modern fit is flattering.',
            reviewDate: new Date('2024-04-04')
          },
          {
            id: 'rev34-3',
            productId: '34',
            userName: 'Denim Collector',
            userImageUrl: 'https://randomuser.me/api/portraits/women/66.jpg',
            rating: 5,
            title: 'Classic piece',
            comment: 'High quality denim that will last for years. True to size.',
            reviewDate: new Date('2024-04-10')
          }
        ]
      },
      {
        id: '35',
        name: 'Silver Necklace',
        description: 'Sterling silver pendant necklace with delicate chain',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
        rating: 4.9,
        reviewCount: 287,
        inStock: true,
        category: 'luxury',
        reviews: [
          {
            id: 'rev35-1',
            productId: '35',
            userName: 'Jewelry Lover',
            userImageUrl: 'https://randomuser.me/api/portraits/women/37.jpg',
            rating: 5,
            title: 'Beautiful necklace',
            comment: 'Delicate and elegant. Wear it every day and it hasn\'t tarnished.',
            reviewDate: new Date('2024-03-26')
          },
          {
            id: 'rev35-2',
            productId: '35',
            userName: 'Gift Giver',
            userImageUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
            rating: 5,
            title: 'Perfect gift',
            comment: 'Bought this for my wife and she loves it. Comes in a nice gift box.',
            reviewDate: new Date('2024-04-06')
          },
          {
            id: 'rev35-3',
            productId: '35',
            userName: 'Minimalist Jewelry',
            userImageUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
            rating: 5,
            title: 'Everyday elegance',
            comment: 'Simple yet beautiful. Goes with everything in my wardrobe.',
            reviewDate: new Date('2024-04-12')
          }
        ]
      },


    ],
    category: 'all',
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),
  //withStorageSync({ key: ' Modern Store' , select: ({user}) => ({user})}),
  withComputed(({category, products,selectedProductId}) => ({
    filteredProducts: computed(() =>
      category() === 'all'
        ? products()
        : products().filter(p => p.category === category().toLowerCase())
    ),
    selectedProduct: computed(()=> products().find((p)=> p.id === selectedProductId())),

  })),
  withMethods((store,matDialog = inject(MatDialog), router =inject(Router), toaster = inject(Toaster), cartStore = inject(CartStore), seoManager =inject(SeoManager)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, {category});
    }),
    setProductId: signalMethod<string>((productId: string) => {
      patchState(store, {selectedProductId: productId});
    }),
    setProductSeoTags: signalMethod<Product | undefined>((product) => {
      if (!product) return;
      seoManager.updateSeoTags({
        title: product.name,
        description: product.description,
        image: product.imageUrl,
        type: 'product',
      });
    }),
    setProductsListSeoTags: signalMethod<string | undefined>((category) => {
      const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';
      const description= category ? `Browse our collection of ${category} products` : `Browse our collection of products`;
      seoManager.updateSeoTags({
        title: categoryName,
        description
      });
    }),
    proceedToCheckout: () => {
      if (!store.user()) {
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true
          }
        });
        return;
      }
      router.navigate(['/checkout']);
    },
    placeOrder: async () => {
      patchState(store, {loading: true});
      const user = store.user();
      if(!user){
        toaster.error('Please login before placing order');
        patchState(store, {loading: false});
        return;
      }

      const order: Order = {
        id: crypto.randomUUID(),
        userId: user.id,
        total: Math.round(cartStore
          .items()
          .reduce((acc, item) => acc + item.quantity * item.price, 0)),
        items: cartStore.items(),
        paymentStatus: 'success',
      };

      await new Promise((resolve) => setTimeout(resolve,1000));
      patchState(store, {loading: false});
      cartStore.resetCart();
      router.navigate(['order-success'])


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
    },
    signUp: ({email, password, name, checkout, dialogId}: SignUpParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
        }
      });
      matDialog.getDialogById(dialogId)?.close();
      if (checkout) {
        router.navigate(['/checkout']);
      }
    },
    showWriteReview: () => {
      patchState(store, {writeReview: true});
    },
    hideWriteReview: () => {
      patchState(store, {writeReview: false});
    },
    addReview: async ( {title, comment, rating}: AddReviewParams) => {
      patchState(store, {loading: true});
      const product = store.products().find((p) => p.id === store.selectedProductId());
      if(!product){
        toaster.error('Product not found');
        patchState(store, {loading: false});
        return;
      }

      const review: UserReview = {
        id: crypto.randomUUID(),
        title,
        comment,
        rating,
        productId: product.id,
        userName: store.user()?.name || '',
        userImageUrl: store.user()?.imageUrl || '',
        reviewDate: new Date(),
      };

      const updatedProducts = produce(store.products(), (draft) => {
        const index = draft.findIndex((p) => p.id === product.id);
        draft[index].reviews.push(review);
        draft[index].rating =
          Math.round(
            (draft[index].reviews.reduce((acc,r) => acc + r.rating, 0) /
                draft[index].reviews.length) * 10,
          ) / 10;
        draft[index].reviewCount= draft[index].reviews.length;
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, {loading: false, products: updatedProducts, writeReview: false});
    },



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
