import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  proficiency?: number | null;
  delay?: number;
}

export default function SkillBadge({ name, proficiency, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "rgba(var(--primary-rgb), 0.1)",
        borderColor: "rgba(var(--primary-rgb), 0.5)"
      }}
      className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 p-4 hover:border-primary/50 transition-all duration-300 group shadow-lg hover:shadow-primary/20"
    >
      <div className="relative z-10 flex items-center justify-center text-center">
        <span className="font-mono text-sm font-semibold text-gray-200 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
          {name}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
