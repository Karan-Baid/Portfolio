import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden glass-panel hover:border-primary/50 transition-colors duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
             <Code2 className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3 text-sm flex-1">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mb-4 space-y-1">
            {project.highlights.slice(0, 2).map((highlight, i) => (
              <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                <span className="text-primary mt-1 shrink-0">▹</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.demoUrl && project.demoUrl !== "#" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors ml-auto"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
