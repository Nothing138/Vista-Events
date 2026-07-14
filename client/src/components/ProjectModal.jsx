import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [project]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      id="project-modal"
      className={project ? 'is-open' : ''}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target.id === 'project-modal') onClose(); }}
    >
      <button
        id="modal-close"
        className="btn-outline w-11 h-11 rounded-full flex items-center justify-center"
        data-cursor="magnetic"
        aria-label="Close case study"
        onClick={onClose}
      >
        ✕
      </button>

      {project && (
        <div className="modal-inner grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl w-[92vw] md:w-[85vw] max-h-[85vh] bg-charcoal overflow-hidden">
          <div className="blueprint-corners aspect-[4/5] md:aspect-auto md:h-full overflow-hidden">
            <div className="bc-tl" /><div className="bc-br" />
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
            <p className="fig-label mb-4">{project.meta}</p>
            <h3 className="font-display text-3xl md:text-4xl mb-6">{project.title}</h3>
            <p className="text-oyster/70 leading-relaxed">{project.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}