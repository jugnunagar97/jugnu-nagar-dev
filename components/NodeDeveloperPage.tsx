import React from 'react';
import { Link } from 'react-router-dom';

// FIX: Provided full content for NodeDeveloperPage.tsx to resolve module errors.
const NodeDeveloperPage: React.FC = () => {
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">Hire a Freelance Node.js Developer</h1>
            <p className="mt-4 text-lg text-gray-600">
              Build powerful, scalable, and fast back-end systems for your web and mobile applications.
            </p>
          </div>
          
          <div className="prose lg:prose-xl mx-auto text-gray-700 leading-relaxed">
            <h2>Why Node.js?</h2>
            <p>
              Node.js is a JavaScript runtime built on Chrome's V8 engine, designed for building scalable network applications. Its event-driven, non-blocking I/O model makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
            </p>
            
            <h2>My Node.js Expertise</h2>
            <p>
              With years of experience as a full-stack developer, I specialize in leveraging Node.js to create robust back-end solutions. My services include:
            </p>
            <ul>
              <li><strong>Custom API Development:</strong> Designing and building RESTful APIs and GraphQL services to power your front-end applications.</li>
              <li><strong>Real-Time Applications:</strong> Developing applications like chat apps, live dashboards, and collaborative tools using WebSockets.</li>
              <li><strong>Microservices Architecture:</strong> Building decoupled, independently deployable services for complex applications that require high scalability and maintainability.</li>
              <li><strong>Database Integration:</strong> Working with both SQL (PostgreSQL) and NoSQL (MongoDB, Firebase) databases to best fit your project's needs.</li>
              <li><strong>Authentication & Authorization:</strong> Implementing secure user authentication systems using technologies like JWT, OAuth, and Passport.js.</li>
               <li><strong>Performance Optimization:</strong> Analyzing and optimizing application performance to ensure fast response times and efficient resource usage.</li>
            </ul>

            <h2>My Technology Stack</h2>
            <p>
              I use a modern and proven stack to deliver high-quality Node.js applications:
            </p>
            <ul>
              <li><strong>Frameworks:</strong> Express.js, NestJS</li>
              <li><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</li>
              <li><strong>Languages:</strong> TypeScript, JavaScript (ES6+)</li>
              <li><strong>Deployment:</strong> Docker, AWS, Heroku, Vercel</li>
              <li><strong>Testing:</strong> Jest, Mocha, Chai</li>
            </ul>

            <h2>Ready to Start Your Project?</h2>
            <p>
              Whether you're a startup building an MVP or an established company looking to scale your infrastructure, I can help you achieve your goals. Let's discuss your project and see how my Node.js development services can bring your vision to life.
            </p>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/#contact"
              className="inline-block bg-brand-blue text-white py-4 px-10 text-sm font-bold tracking-widest uppercase rounded-md shadow-lg hover:bg-brand-blue-dark transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDeveloperPage;
