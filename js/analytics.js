// analytics loader (GA4) - loads only when `loadAnalytics()` is called
(function(){'use strict';
  window.loadAnalytics = function() {
    try {
      var meta = document.querySelector('meta[name="ga4-id"]');
      if (!meta) return;
      var id = meta.content && meta.content.indexOf('G-') === 0 ? meta.content : null;
      if (!id) return;
      if (window._gaLoaded) return;
      window._gaLoaded = true;
      // Insert GA script
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);} window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', id, { 'anonymize_ip': true });
    } catch (e) { console.warn('Analytics load failed', e); }
  };
})();
