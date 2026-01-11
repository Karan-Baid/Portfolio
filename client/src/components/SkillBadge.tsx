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
      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="font-mono text-sm font-medium text-gray-200 group-hover:text-white">
          {name}
        </span>
        {proficiency && (
          <span className="text-xs font-bold text-primary">{proficiency}%</span>
        )}
      </div>
      
      {proficiency && (
        <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full mt-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            transition={{ duration: 1, delay: delay + 0.2 }}
            className="h-full bg-gradient-to-r from-primary to-purple-400"
          />
        </div>
      )}
    </motion.div>
  );
}
