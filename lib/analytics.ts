// Google Analytics and Core Web Vitals tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_TRACKING_ID) return;

  window.gtag("config", GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_TRACKING_ID) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track Core Web Vitals for SEO
export const trackWebVitals = (metric: any) => {
  if (!GA_TRACKING_ID) return;

  window.gtag("event", metric.name, {
    event_category: "Web Vitals",
    event_label: metric.id,
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value
    ),
    non_interaction: true,
  });
};

// Track blog post engagement
export const trackBlogEngagement = (slug: string, action: string) => {
  trackEvent(action, "Blog", slug);
};

// Track social sharing
export const trackSocialShare = (platform: string, url: string) => {
  trackEvent("share", "Social", platform);
};

// Performance monitoring
export const measurePerformance = (
  name: string,
  fn: () => void | Promise<void>
) => {
  const start = performance.now();
  const result = fn();

  if (result instanceof Promise) {
    return result.finally(() => {
      const duration = performance.now() - start;
      console.log(`${name} took ${duration.toFixed(2)}ms`);
    });
  } else {
    const duration = performance.now() - start;
    console.log(`${name} took ${duration.toFixed(2)}ms`);
    return result;
  }
};
