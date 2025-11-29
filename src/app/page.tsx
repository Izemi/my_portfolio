'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Github, Linkedin, MapPin, 
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  GraduationCap, Trophy, Users, BookOpen, Lightbulb, 
  Rocket, Code, Heart, ArrowRight, Book, FileText, 
  Newspaper, Terminal, BarChart3, TrendingUp, ExternalLink
} from 'lucide-react';
import data from '@/data/portfolio.json';

type View = 'home' | 'cs' | 'economics' | 'data' | 'about';

export default function Portfolio() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <AnimatePresence mode="wait">
        {view === 'home' && <HomeView key="home" setView={setView} />}
        {view === 'cs' && <RoomView key="cs" room="cs" setView={setView} />}
        {view === 'economics' && <RoomView key="economics" room="economics" setView={setView} />}
        {view === 'data' && <RoomView key="data" room="data" setView={setView} />}
        {view === 'about' && <AboutView key="about" setView={setView} />}
      </AnimatePresence>
    </div>
  );
}

function RoomIcon({ room, size = 24 }: { room: string; size?: number }) {
  if (room === 'cs') return <Terminal size={size} />;
  if (room === 'economics') return <TrendingUp size={size} />;
  return <BarChart3 size={size} />;
}

// Home View
function HomeView({ setView }: { setView: (v: View) => void }) {
  const rooms = [
    { id: 'cs' as View, ...data.rooms.cs },
    { id: 'economics' as View, ...data.rooms.economics },
    { id: 'data' as View, ...data.rooms.data },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 md:p-12"
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-14 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-yale-blue)' }}>
              {data.profile.name}
            </h1>
            <p className="text-lg text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
              {data.profile.tagline}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href={data.profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Github size={18} />
                GitHub
              </a>
              <a href={data.profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a href={`mailto:${data.profile.email}`} className="btn btn-primary">
                <Mail size={18} />
                Say Hello
              </a>
            </div>

            <button 
              onClick={() => setView('about')}
              className="text-[var(--color-muted)] hover:text-[var(--color-yale-blue)] transition-colors inline-flex items-center gap-2 text-sm"
            >
              <span>More about me</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </header>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-[var(--color-muted)] mb-8 max-w-2xl mx-auto"
        >
          I organize my work into three areas. Click to explore each one.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {rooms.map((room, index) => (
            <motion.button
              key={room.id}
              onClick={() => setView(room.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className={`room-card ${room.color} text-left`}
            >
              <div className={`room-icon ${room.color}`}>
                <RoomIcon room={room.id} />
              </div>
              <h2 className="text-xl font-bold mb-2">{room.name}</h2>
              <p className="text-[var(--color-muted)] text-sm mb-5">{room.tagline}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="tag tag-outline">{room.projects.length} projects</span>
                <span className="tag tag-outline">{room.readings.length} readings</span>
              </div>

              <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted)]">
                Explore
                <ArrowRight size={14} />
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-10"
        >
          <div className="stat-card">
            <p className="stat-value">
              {data.rooms.cs.know.length + data.rooms.economics.know.length + data.rooms.data.know.length}+
            </p>
            <p className="stat-label">Skills</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">
              {data.rooms.cs.projects.length + data.rooms.economics.projects.length + data.rooms.data.projects.length}
            </p>
            <p className="stat-label">Projects</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">
              {data.rooms.cs.readings.length + data.rooms.economics.readings.length + data.rooms.data.readings.length}
            </p>
            <p className="stat-label">Readings</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Project Card Component with expandable details
function ProjectCard({ project, colorClass }: { project: any; colorClass: string }) {
  const [expanded, setExpanded] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const getColorVar = () => {
    if (colorClass === 'cs') return 'var(--color-cs)';
    if (colorClass === 'econ') return 'var(--color-econ)';
    return 'var(--color-data)';
  };

  const getTagClass = () => `tag-${colorClass}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="project-card"
    >
      {/* Header - always visible */}
      <div 
        className="project-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--color-muted)] hover:text-[var(--color-yale-blue)] p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
              </a>
            )}
            <button className="text-[var(--color-muted)] p-1">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
        <p className="text-[var(--color-muted)] text-sm mb-3">{project.shortDesc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, j: number) => (
            <span key={j} className={`tag ${getTagClass()}`}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="project-details pt-4">
              {/* Toggle buttons */}
              <div className="flex gap-2 mb-4">
                <button 
                  className={`toggle-btn ${!showCode ? 'active' : ''}`}
                  onClick={() => setShowCode(false)}
                >
                  <FileText size={14} />
                  Description
                </button>
                <button 
                  className={`toggle-btn ${showCode ? 'active' : ''}`}
                  onClick={() => setShowCode(true)}
                >
                  <Code size={14} />
                  View Code
                </button>
              </div>

              {!showCode ? (
                <div>
                  <p className="text-[var(--color-muted)] text-sm mb-4">{project.fullDesc}</p>
                  
                  <h4 className="font-semibold text-sm mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Key Highlights
                  </h4>
                  <div className="space-y-1">
                    {project.highlights.map((h: string, i: number) => (
                      <div key={i} className="highlight-item">
                        <div className="highlight-bullet" style={{ background: getColorVar() }} />
                        <span className="text-sm text-[var(--color-muted)]">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                    <h4 className="font-semibold text-sm mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech: string, i: number) => (
                        <span key={i} className="tag tag-outline">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <pre className="code-block">
                    <code>{project.codeSnippet}</code>
                  </pre>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm font-medium"
                      style={{ color: getColorVar() }}
                    >
                      View full code on GitHub
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Room View
function RoomView({ room, setView }: { room: 'cs' | 'economics' | 'data'; setView: (v: View) => void }) {
  const roomData = data.rooms[room];
  const colorClass = roomData.color;
  
  const getTagClass = () => `tag-${colorClass}`;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <Book size={16} />;
      case 'essay': return <FileText size={16} />;
      case 'papers': return <Newspaper size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getColorVar = () => {
    if (colorClass === 'cs') return 'var(--color-cs)';
    if (colorClass === 'econ') return 'var(--color-econ)';
    return 'var(--color-data)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen p-6 md:p-12"
    >
      <div className="max-w-5xl mx-auto">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setView('home')}
          className="back-btn mb-8"
        >
          <ChevronLeft size={20} />
          All rooms
        </motion.button>

        <div className={`room-header ${colorClass}`}>
          <div className={`room-icon ${colorClass} mb-4`}>
            <RoomIcon room={room} size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{roomData.name}</h1>
          <p className="text-[var(--color-muted)] text-lg">{roomData.tagline}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Projects */}
            <section>
              <div className="section-header">
                <Code size={16} style={{ color: getColorVar() }} />
                <span>Projects</span>
              </div>
              <div className="space-y-4">
                {roomData.projects.map((project, i) => (
                  <ProjectCard key={i} project={project} colorClass={colorClass} />
                ))}
              </div>
            </section>

            {/* What I Know */}
            <section>
              <div className="section-header">
                <Rocket size={16} style={{ color: getColorVar() }} />
                <span>What I Know</span>
              </div>
              <div className="section-card">
                <div className="flex flex-wrap gap-2">
                  {roomData.know.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className={`tag ${getTagClass()}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Readings */}
            <section>
              <div className="section-header">
                <BookOpen size={16} style={{ color: getColorVar() }} />
                <span>Books and Articles I Like</span>
              </div>
              <div className="space-y-3">
                {roomData.readings.map((reading, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="reading-item"
                  >
                    <div className="flex items-start gap-4">
                      <span style={{ color: getColorVar() }} className="mt-1">
                        {getTypeIcon(reading.type)}
                      </span>
                      <div>
                        <h4 className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                          {reading.title}
                        </h4>
                        <p className="text-[var(--color-muted)] text-sm">{reading.author}</p>
                        <p className="text-sm mt-2 text-[var(--color-muted)] italic">"{reading.note}"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Currently Learning */}
            <section>
              <div className="section-header">
                <Lightbulb size={16} style={{ color: getColorVar() }} />
                <span>Currently Learning</span>
              </div>
              <div className="section-card">
                <div className="flex flex-wrap gap-2">
                  {roomData.learning.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="tag tag-outline"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--color-border)]">
          <p className="text-[var(--color-muted)] text-sm mb-4">Explore other areas</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(data.rooms)
              .filter(([key]) => key !== room)
              .map(([key, r]) => (
                <button
                  key={key}
                  onClick={() => setView(key as View)}
                  className="btn btn-ghost"
                >
                  <RoomIcon room={key} size={18} />
                  {r.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// About View
function AboutView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 md:p-12"
    >
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setView('home')}
          className="back-btn mb-8"
        >
          <ChevronLeft size={20} />
          Back
        </motion.button>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-yale-blue)' }}>
            About Me
          </h1>
          <p className="text-[var(--color-muted)] max-w-2xl mx-auto">{data.profile.bio}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-card"
          >
            <div className="section-header">
              <GraduationCap size={16} style={{ color: 'var(--color-yale-blue)' }} />
              <span>Education</span>
            </div>
            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-yale-blue)' }}>
              {data.about.education.school}
            </h3>
            <p style={{ color: 'var(--color-cs)' }}>{data.about.education.degree}</p>
            <p className="text-sm" style={{ color: 'var(--color-data)' }}>{data.about.education.certificate}</p>
            <p className="text-[var(--color-muted)] text-sm mt-2">{data.about.education.period}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-card"
          >
            <div className="section-header">
              <Trophy size={16} style={{ color: 'var(--color-data)' }} />
              <span>Awards</span>
            </div>
            <ul className="space-y-3">
              {data.about.awards.map((award, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className="flex-shrink-0 mt-1" size={14} style={{ color: 'var(--color-econ)' }} />
                  <span className="text-sm">{award}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="section-card"
          >
            <div className="section-header">
              <Users size={16} style={{ color: 'var(--color-econ)' }} />
              <span>Communities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.about.communities.map((c, i) => (
                <span key={i} className="tag tag-outline">{c}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="section-card"
          >
            <div className="section-header">
              <Heart size={16} style={{ color: 'var(--color-accent)' }} />
              <span>Beyond the Screen</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.about.life.map((item, i) => (
                <div key={i} className="life-item">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs text-[var(--color-muted)]">{item.category}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-[var(--color-muted)] mb-4">Let's connect</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`mailto:${data.profile.email}`} className="btn btn-primary">
              <Mail size={18} />
              Email
            </a>
            <a href={data.profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a href={data.profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Github size={18} />
              GitHub
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--color-muted)] flex items-center justify-center gap-2">
            <MapPin size={14} />
            {data.profile.location}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
