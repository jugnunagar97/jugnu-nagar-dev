import React, { useState } from 'react';
import { SKILLS, EXPERIENCE_DATA, EXPERIENCE_LOGOS, CODE_SAMPLES_DATA } from '../constants';
import type { Experience, CodeSample } from '../types';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GithubIcon } from './icons/GithubIcon';


const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-2 sm:px-6 font-heading text-sm sm:text-base tracking-wider relative transition-colors duration-300 ${
        active ? 'text-brand-blue' : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {children}
      {active && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-blue rounded-full"></div>}
    </button>
  );
};

const SkillsSection: React.FC = () => (
  <div className="space-y-12">
    {SKILLS.map(({ category, skills }) => (
      <div key={category} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <h3 className="bg-gray-800 text-white font-heading text-sm font-semibold py-2 px-4 inline-block rounded-md">{category}</h3>
        </div>
        <div className="md:col-span-9">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 items-center h-full">
            {skills.map(skill => (
              <li key={skill.name} className="flex items-center">
                <span className="text-brand-blue text-xl mr-2">&#8226;</span>
                <span className="text-gray-700 text-base">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

const ExperienceSection: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedExperience = EXPERIENCE_DATA[selectedIndex];
  
    return (
      <div className="w-full">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 min-h-[400px]">
            <div className="flex-shrink-0 md:w-1/4 relative">
                <div className="flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                    {EXPERIENCE_DATA.map((exp, index) => (
                        <button 
                             key={index} 
                             onClick={() => setSelectedIndex(index)}
                             className={`w-full text-center font-heading font-semibold h-16 flex items-center justify-center md:justify-start px-4 flex-shrink-0 md:flex-shrink-1 transition-colors duration-300 rounded-lg ${selectedIndex === index ? 'text-brand-blue bg-blue-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                        >
                             {(EXPERIENCE_LOGOS as any)[exp.logo] || exp.company}
                        </button>
                    ))}
                </div>
                <div className="hidden md:block absolute top-0 -right-px w-0.5 bg-gray-200 h-full"></div>
                <div 
                    className="hidden md:block absolute -right-px h-16 bg-brand-blue w-0.5 rounded-full transition-all duration-300" 
                    style={{transform: `translateY(${selectedIndex * 4}rem)`}}>
                </div>
            </div>
            <div className="flex-1 md:pl-8">
                <h3 className="font-heading text-2xl font-semibold text-gray-800">{selectedExperience.role}</h3>
                <p className="text-gray-500 my-2">{selectedExperience.period}</p>
                <div className="prose text-gray-600 whitespace-pre-line max-w-none">
                    {selectedExperience.description}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                    {selectedExperience.tools.map(tool => (
                        <span key={tool} className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{tool}</span>
                    ))}
                </div>
            </div>
        </div>
        <div className="text-center mt-16">
            <a href="#" className="inline-flex items-center gap-3 bg-brand-blue text-white font-bold py-3 px-8 rounded-md hover:bg-brand-blue-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                <LinkedInIcon className="w-5 h-5" />
                LinkedIn Profile
            </a>
        </div>
      </div>
    );
};
  

const CodeSamplesSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedSample = CODE_SAMPLES_DATA[selectedIndex];

  return (
      <div className="w-full">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 min-h-[300px]">
              <div className="flex-shrink-0 md:w-1/4 relative">
                  <div className="md:border-r md:border-gray-200 h-full pr-4">
                      <ul className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 space-x-2 md:space-x-0 md:space-y-2">
                          {CODE_SAMPLES_DATA.map((sample, index) => (
                              <li key={sample.name} className="flex-shrink-0">
                                  <button 
                                      onClick={() => setSelectedIndex(index)}
                                      className={`w-full text-left md:text-right p-3 rounded-lg text-sm transition-colors ${selectedIndex === index ? 'font-bold text-brand-blue bg-blue-50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
                                  >
                                      {sample.name}
                                  </button>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
              <div className="flex-1 md:pl-8">
                  <p className="text-gray-600 mb-6 text-lg">{selectedSample.description}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                      {selectedSample.tools.map(tool => (
                          <span key={tool} className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{tool}</span>
                      ))}
                  </div>
                  <div>
                    <a href={selectedSample.sourceLink} className="text-brand-blue hover:underline inline-block font-semibold text-sm">SOURCE CODE</a>
                    {selectedSample.demoLink && (
                      <>
                        <span className="text-gray-400 mx-3">|</span>
                        <a href={selectedSample.demoLink} className="text-brand-blue hover:underline inline-block font-semibold text-sm">DEMO</a>
                      </>
                    )}
                  </div>
              </div>
          </div>
          <div className="text-center mt-16">
              <a href="#" className="inline-flex items-center gap-3 bg-gray-800 text-white font-bold py-3 px-8 rounded-md hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  <GithubIcon className="w-5 h-5" />
                  Github Profile
              </a>
          </div>
      </div>
  );
};
  

const SkillsAndExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('SKILLS');

  return (
    <section id="experience" className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center border-b border-gray-200 mb-12 sm:mb-16">
          <TabButton active={activeTab === 'SKILLS'} onClick={() => setActiveTab('SKILLS')}>SKILLS</TabButton>
          <TabButton active={activeTab === 'EXPERIENCE'} onClick={() => setActiveTab('EXPERIENCE')}>EXPERIENCE</TabButton>
          <TabButton active={activeTab === 'CODE SAMPLES'} onClick={() => setActiveTab('CODE SAMPLES')}>CODE SAMPLES</TabButton>
        </div>
        <div className="max-w-7xl mx-auto">
          {activeTab === 'SKILLS' && <SkillsSection />}
          {activeTab === 'EXPERIENCE' && <ExperienceSection />}
          {activeTab === 'CODE SAMPLES' && <CodeSamplesSection />}
        </div>
      </div>
    </section>
  );
};

export default SkillsAndExperience;