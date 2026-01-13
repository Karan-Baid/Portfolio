import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  proficiency?: number | null;
  delay?: number;
}

export default function SkillBadge({ name, proficiency, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ 
        y: -5,
        rotateX: 5,
        rotateY: 5,
        scale: 1.05,
      }}
      style={{ perspective: "1000px" }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 p-5 transition-all duration-300 group shadow-lg backdrop-blur-sm hover:border-primary/50 hover:shadow-primary/20"
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2">
        <span className="font-mono text-sm font-bold tracking-wider text-white group-hover:text-primary transition-colors">
          {name}
        </span>
      </div>
      
      {/* 3D highlight effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      {/* Hover glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
    </motion.div>
  );
}
