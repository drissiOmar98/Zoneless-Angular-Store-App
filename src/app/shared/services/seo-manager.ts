import {DOCUMENT, inject, Injectable, REQUEST} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {SeoData} from '../models/seo-data';
import {Router} from '@angular/router';

/**
 * Centralized SEO manager for Angular applications with SSR support.
 *
 * This service is responsible for:
 * - Updating the document title and meta description
 * - Generating canonical URLs
 * - Setting Open Graph (OG) meta tags for social sharing
 * - Supporting both Server-Side Rendering (SSR) and client-side rendering
 */
@Injectable({
  providedIn: 'root',
})
export class SeoManager {

   /** Angular service for managing the document title */
  title = inject(Title);

  /**
   * Angular service for managing meta tags.
   */
  meta = inject(Meta);

   /**
   * SSR request object.
   * Available only during server-side rendering.
   * Marked as optional to avoid errors in the browser.
   */
  request = inject(REQUEST, {optional: true});

  /** Reference to the DOM document (works in both SSR and browser) */
  document = inject(DOCUMENT);
  router = inject(Router);

  /**
   * Global site name appended to every page title.
   */
  private readonly siteName = "Modern Store";

   /** Fallback image used when no SEO image is provided */
  private readonly defaultImage = "https://dummyimage.com/600x400/ffffff/000000.png&text=Modern+Store";

  /**
   * Updates all SEO-related metadata for the current page.
   *
   * This method is SSR-safe and correctly resolves:
   * - Page title
   * - Meta description
   * - Canonical URL
   * - Open Graph (OG) tags
   *
   * @param seoData Page-specific SEO configuration
   */
  updateSeoTags(seoData: SeoData){

    /* ----------------------------
     * Title & basic meta tags
     * ---------------------------- */

    /**
     * Sets the page title displayed in the browser tab
     * and search engine results.
     */
    this.title.setTitle(`${seoData.title} | ${this.siteName}`);

    /**
     * Updates the meta description used by search engines.
     */
    this.meta.updateTag({ name: 'description', content: seoData.description});


    /* ----------------------------
     * Resolve origin (SSR & browser)
     * ---------------------------- */

    let origin = '';

    /**
     * SSR: Resolve origin from HTTP request headers.
     * Supports reverse proxies via x-forwarded-* headers.
     */
    if(this.request){
      const headers = this.request.headers as Headers | undefined;
      const protocol= (headers?.get('x-forwarded-proto') || this.request.url.split(':')[0] || 'https') + '://';
      const host = headers?.get('x-forwarded-host') || headers?.get('host') || '';
      origin = host ? `${protocol}${host}` : '';
    } else if (typeof window !== 'undefined'){
      origin = window.location.origin;
    }

    /**
     * Fully qualified URL for the current route.
     */
    const fullUrl = `${origin}${this.router.url}`;

    /* =========================
     * Canonical URL Handling
     * ========================= */

     /**
     * Ensure a single canonical link exists to avoid
     * duplicate content issues in search engines.
     */
    let canonicalLink = this.document.querySelector('link[ref="canonical"]') as HTMLLinkElement;
    if(!canonicalLink){
      canonicalLink= this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    /**
     * Set the canonical URL for the current page.
     */
    canonicalLink.setAttribute('href', fullUrl);

    /* =========================
    * Open Graph Metadata
    * ========================= */

    /**
     * Fallback to default image when none is provided.
     */
    const imageUrl = seoData.image || this.defaultImage;

    this.meta.updateTag({property: 'og:type', content: seoData.type || 'website'});
    this.meta.updateTag({property: 'og:site_name', content: this.siteName});
    this.meta.updateTag({property: 'og:title', content: seoData.title});
    this.meta.updateTag({property: 'og:description', content: seoData.description});
    this.meta.updateTag({property: 'og:url', content: fullUrl});
    this.meta.updateTag({property: 'og:image', content: imageUrl});
    this.meta.updateTag({property: 'og:image:width', content: '1200'});
    this.meta.updateTag({property: 'og:image:height', content: '630'});
    this.meta.updateTag({property: 'og:locale', content: 'en_US'});

  }

}
