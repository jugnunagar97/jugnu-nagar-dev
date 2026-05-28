import { Link } from 'react-router-dom';

const StealthSupps = () => {
  const pdfUrl = encodeURI('/data pdf/Stealth Website Audit.pdf');

  return (
    <div className="pt-24 bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-gray-900 mb-6">Stealth Supps</h1>
          <p className="text-xl text-gray-600 mb-4">Shopify store audit & performance optimization</p>
          <a href="https://stealthsupps.in/" target="_blank" rel="noreferrer" className="inline-block text-blue-600 font-semibold hover:underline">
            Visit live site →
          </a>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Stealth Supps, a Shopify supplement store, faced significant performance and UX issues that were impacting conversions. The client provided a detailed audit identifying specific problems across the site.
          </p>
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            📄 Download Client Audit PDF
          </a>
        </div>
      </div>

      {/* What I Fixed */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-4xl">
        <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8">What I Fixed</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Performance & Core Web Vitals</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Optimized image loading & lazy loading</li>
              <li>✓ Improved Largest Contentful Paint (LCP)</li>
              <li>✓ Reduced Cumulative Layout Shift (CLS)</li>
              <li>✓ Streamlined CSS & JavaScript bundles</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Shopify & UX Improvements</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Fixed responsive layout issues on mobile</li>
              <li>✓ Streamlined product page Liquid templates</li>
              <li>✓ Improved checkout flow & reduced cart abandonment</li>
              <li>✓ Enhanced product filtering & search</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">SEO & Accessibility</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Fixed semantic HTML & meta tags</li>
              <li>✓ Improved structured data (schema markup)</li>
              <li>✓ Enhanced ARIA labels & keyboard navigation</li>
              <li>✓ Optimized heading hierarchy</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Conversion Rate Optimization</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Reduced page load time by ~40%</li>
              <li>✓ Improved mobile conversion rate</li>
              <li>✓ Enhanced trust signals & social proof</li>
              <li>✓ Optimized call-to-action buttons</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tools Used */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {['Shopify', 'Liquid', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Performance Audit', 'SEO Optimization', 'A/B Testing', 'Google PageSpeed Insights'].map((tool) => (
              <span key={tool} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-4xl text-center">
        <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">See the Results</h2>
        <p className="text-lg text-gray-600 mb-8">Check out the live Stealth Supps store and see how these optimizations improved performance and user experience.</p>
        <a href="https://stealthsupps.in/" target="_blank" rel="noreferrer" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg">
          Visit Stealth Supps →
        </a>
      </div>

      {/* Back Link */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">← Back to home</Link>
      </div>
    </div>
  );
};

export default StealthSupps;
