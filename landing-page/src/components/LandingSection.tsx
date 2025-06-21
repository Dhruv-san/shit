import React from 'react';

const LandingSection: React.FC = () => {
  return (
    <div className="bg-white">
      <header className="py-6">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Landing Page</h1>
      </header>
      <section className="hero bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Your Journey Starts Here</h2>
          <p className="mt-4">Discover amazing features and benefits.</p>
          <button className="mt-6 bg-white text-blue-500 py-2 px-4 rounded">Get Started</button>
        </div>
      </section>
      <section className="features py-20">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-center">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="feature-card p-4 border rounded">
              <h4 className="font-bold">Feature 1</h4>
              <p>Description of feature 1.</p>
            </div>
            <div className="feature-card p-4 border rounded">
              <h4 className="font-bold">Feature 2</h4>
              <p>Description of feature 2.</p>
            </div>
            <div className="feature-card p-4 border rounded">
              <h4 className="font-bold">Feature 3</h4>
              <p>Description of feature 3.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold">How It Works</h3>
          <p className="mt-4">Step-by-step guide on how to use our service.</p>
        </div>
      </section>
      <section className="testimonials py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold">Testimonials</h3>
          <p className="mt-4">What our users say about us.</p>
        </div>
      </section>
      <section className="faq py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold">Frequently Asked Questions</h3>
          <p className="mt-4">Common questions and answers.</p>
        </div>
      </section>
      <section className="call-to-action py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold">Ready to Get Started?</h3>
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">Sign Up Now</button>
        </div>
      </section>
      <footer className="py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingSection;