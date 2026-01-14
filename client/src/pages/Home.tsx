import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download, Send, Sparkles, Briefcase, Award, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { useProjects, useSkills, useContact, useExperience, useCertifications } from "@/hooks/use-portfolio";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experience, isLoading: experienceLoading } = useExperience();
  const { data: certifications, isLoading: certsLoading } = useCertifications();
  const { mutate: sendMessage, isPending: isSending } = useContact();
  const { toast } = useToast();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage(data, {
      onSuccess: () => {
        toast({
          title: "Transmission Received",
          description: "Your message has been stored in my secure database. I'll get back to you soon!",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Transmission Failed",
          description: error.message || "There was a glitch in the matrix. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const skillsByCategory = skills?.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Available for collaboration</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
              <div className="text-center md:text-left order-2 md:order-1">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  Karan Baid
                  <span className="text-gradient block mt-2">Aspiring AI Engineer</span>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative order-1 md:order-2"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl relative z-10">
                  <img 
                    src="/assets/profile.jpg" 
                    alt="Karan Baid" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <div className="text-xl md:text-2xl text-gray-400 mb-8 font-mono h-[60px] md:h-auto">
              <TypeAnimation
                sequence={[
                  "I build Agentic AI Workflows.",
                  1000,
                  "I fine-tune LLMs for production.",
                  1000,
                  "I engineer advanced RAG systems.",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a href="#projects">
                <Button size="lg" className="rounded-full px-8 text-base h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                  View Work <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12 border-white/20 hover:bg-white/5" onClick={() => window.open('https://www.linkedin.com/in/karan-baid-51253a251', '_blank')}>
                LinkedIn <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-12">
            {experience?.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-8 rounded-2xl relative border-l-4 border-l-primary"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-primary font-mono">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 font-mono text-sm">{exp.period}</p>
                    <p className="text-gray-500 text-xs">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              B.Tech in Computer Science student at VIT, specializing in GenAI and MLOps.
            </p>
          </motion.div>

          {skillsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="h-32 rounded-lg bg-white/5 animate-pulse" />
               ))}
            </div>
          ) : (
            <div className="grid gap-12">
              {Object.entries(skillsByCategory || {}).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xl font-mono text-primary mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-primary/50"></span>
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {items.map((skill, index) => (
                      <SkillBadge
                        key={skill.id}
                        name={skill.name}
                        proficiency={skill.proficiency}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Production-ready AI systems and agentic workflows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 px-4 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications?.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 rounded-xl flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{cert.name}</h4>
                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                </div>
                {cert.verificationUrl && (
                  <Button variant="ghost" size="icon" onClick={() => window.open(cert.verificationUrl || "", '_blank')}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-3xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
              <p className="text-gray-400 font-mono">
                karanbaid1964@gmail.com | Jaipur, Rajasthan
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Karan Baid" 
                            {...field} 
                            className="bg-white/5 border-white/10 focus:border-primary h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="karan@example.com" 
                            {...field} 
                            className="bg-white/5 border-white/10 focus:border-primary h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Interested in agentic workflows or fine-tuning..." 
                          className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                  disabled={isSending}
                >
                  {isSending ? "Transmitting..." : "Send Transmission"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Karan Baid. Built with high-tech stack.</p>
      </footer>
    </div>
  );
}
