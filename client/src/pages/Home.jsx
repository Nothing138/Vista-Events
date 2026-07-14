import { useState } from 'react';
import Hero from '../components/Hero';
import Narrative from '../components/Narrative';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import ProjectModal from '../components/ProjectModal';

export default function Home({ ready }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Hero ready={ready} />
      <Narrative />
      <Services />
      <Gallery onSelectProject={setSelectedProject} />
      <Testimonials />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}