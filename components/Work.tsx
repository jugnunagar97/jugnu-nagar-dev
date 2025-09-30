import React from 'react';
import { Link } from 'react-router-dom';
import { WORK_PROJECTS } from '../constants';

const Work: React.FC = () => {
  return (
    <section id="work" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wider text-gray-800">MY WORK</h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-24 sm:space-y-32">
          {WORK_PROJECTS.map((project, index) => (
            <div 
              key={project.name}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className={`relative rounded-xl overflow-hidden shadow-2xl group ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <img src={project.imageUrl} alt={project.name} className={`w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${project.isConfidential ? 'blur-lg' : ''}`} />
                {project.isConfidential && (
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex flex-col items-center justify-center p-8 text-center">
                    <h3 className="font-heading text-white text-2xl font-bold">Confidential project.</h3>
                    <p className="text-blue-100 text-lg mt-2">What happens in Cupertino stays in Cupertino.</p>
                  </div>
                )}
                {!project.isConfidential && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={project.projectLink} className="font-bold text-white border-2 border-white py-3 px-8 rounded-lg hover:bg-white hover:text-black transition-colors">
                        View Project Details
                      </Link>
                    </div>
                )}
              </div>
              <div className="lg:px-4">
                <h3 className="font-heading text-3xl font-bold text-gray-800">{project.name}</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">{project.description}</p>
                <div className="mt-6">
                  <h4 className="font-heading font-semibold text-gray-700 tracking-wider">DEVELOPMENT TOOLS</h4>
                  <ul className="mt-3 space-y-2">
                    {project.tools.map(tool => 
                      <li key={tool} className="flex items-center">
                          <span className="text-brand-blue mr-3">&#10003;</span>
                          <span>{tool}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <Link to={project.projectLink} className="mt-8 inline-block text-brand-blue font-semibold hover:underline group">
                  View project <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
            <Link 
              to="/projects"
              className="inline-block border-2 border-gray-400 text-gray-700 py-3 px-10 text-sm font-bold tracking-widest uppercase rounded-md hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300"
            >
              SEE MORE
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Work;