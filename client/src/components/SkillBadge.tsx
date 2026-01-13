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
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 p-3 hover:border-primary/50 transition-colors group"
    >
      <div className="relative z-10 flex items-center justify-center text-center">
        <span className="font-mono text-sm font-medium text-gray-200 group-hover:text-white">
          {name}
        </span>
      </div>
    </motion.div>
  );
}
