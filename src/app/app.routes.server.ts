import {RenderMode, ServerRoute} from '@angular/ssr';
import {CategoryApi} from './shared/services/category-api';
import {inject} from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:category',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const categoryService = inject(CategoryApi);
      const names = categoryService.getCategories();
      return names.map((name) => ({category: name}));
    }
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Client,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },
  {
    path: 'order-success',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
