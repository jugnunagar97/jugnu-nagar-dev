import React from 'react';

const NotFoundPage: React.FC = () => (
  <section className="py-24 sm:py-32 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="font-heading text-5xl font-semibold text-gray-900">404</h1>
      <p className="mt-3 text-gray-600">The page you’re looking for doesn’t exist.</p>
      <a href="/" className="inline-block mt-8 bg-brand-blue text-white px-6 py-3 rounded-md font-semibold">Go Home</a>
    </div>
  </section>
);

export default NotFoundPage;


