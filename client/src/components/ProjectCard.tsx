import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="relative h-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group md:absolute md:top-0 md:left-0 w-full rounded-2xl overflow-hidden glass-panel hover:border-primary/50 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-primary/20 z-0 hover:z-50 bg-background"
        whileHover={{ scale: 1.02, height: "auto" }}
      >
        <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" />
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
               <Code2 className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-background/50">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          <div className="overflow-hidden transition-all duration-500 max-h-[4.5rem] group-hover:max-h-[1000px]">
            <p className="text-gray-400 mb-4 text-sm group-hover:text-gray-200 transition-colors">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <motion.ul 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mb-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                    <span className="text-primary mt-1 shrink-0 font-bold">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] font-mono rounded bg-primary/5 text-primary/70 border border-primary/10 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-4 border-t border-white/5 group-hover:border-primary/20 transition-colors">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
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
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors ml-auto"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
      {/* Spacer to maintain grid height */}
      <div className="invisible h-72 sm:h-80 w-full" />
    </div>
  );
}
