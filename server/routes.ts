import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data (if empty)
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await seedDatabase();
  }

  return httpServer;
}

async function seedDatabase() {
  const projectsData = [
    {
      title: "RAG Document Chatbot",
      description: "A retrieval-augmented generation system allowing users to chat with their PDF documents using OpenAI and LangChain.",
      techStack: ["Python", "LangChain", "OpenAI", "React", "Vector DB"],
      repoUrl: "https://github.com/username/rag-chatbot",
      demoUrl: "https://rag-demo.com",
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    },
    {
      title: "Stable Diffusion Art Gen",
      description: "Custom interface for Stable Diffusion models with fine-tuned LoRAs for specific artistic styles.",
      techStack: ["PyTorch", "Stable Diffusion", "Python", "Gradio"],
      repoUrl: "https://github.com/username/sd-art",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    },
    {
      title: "CodeLlama Assistant",
      description: "A coding assistant fine-tuned on specialized Python libraries to help with data science workflows.",
      techStack: ["Llama 2", "Hugging Face", "Python", "Fine-tuning"],
      repoUrl: "https://github.com/username/codellama-finetune",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    },
    {
      title: "Voice-to-Action Agent",
      description: "An AI agent that converts voice commands into executable system actions using Whisper and GPT-4.",
      techStack: ["Whisper API", "GPT-4", "Node.js", "WebSockets"],
      repoUrl: "https://github.com/username/voice-agent",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da9e2f58?w=800&q=80",
    }
  ];

  const skillsData = [
    { name: "Python", category: "Languages", proficiency: 95 },
    { name: "TypeScript", category: "Languages", proficiency: 85 },
    { name: "SQL", category: "Languages", proficiency: 80 },
    
    { name: "PyTorch", category: "AI / ML", proficiency: 90 },
    { name: "TensorFlow", category: "AI / ML", proficiency: 75 },
    { name: "LangChain", category: "AI / ML", proficiency: 95 },
    { name: "Hugging Face", category: "AI / ML", proficiency: 85 },
    { name: "OpenAI API", category: "AI / ML", proficiency: 95 },

    { name: "React", category: "Frontend", proficiency: 85 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 90 },
    { name: "Next.js", category: "Frontend", proficiency: 80 },

    { name: "Docker", category: "Tools", proficiency: 75 },
    { name: "Git", category: "Tools", proficiency: 90 },
    { name: "AWS", category: "Tools", proficiency: 70 },
  ];

  for (const p of projectsData) {
    await storage.createProject(p);
  }
  
  for (const s of skillsData) {
    await storage.createSkill(s);
  }
  
  console.log("Database seeded successfully!");
}
