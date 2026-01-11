import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { experience, certifications, projects, skills } from "@shared/schema";
import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Added routes for experience and certifications
  app.get("/api/experience", async (req, res) => {
    const exp = await storage.getExperience();
    res.json(exp);
  });

  app.get("/api/certifications", async (req, res) => {
    const certs = await storage.getCertifications();
    res.json(certs);
  });

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

  // Seed with Karan's Resume Data
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await seedDatabase();
  }

  return httpServer;
}

async function seedDatabase() {
  const projectsData = [
    {
      title: "Cyber-Saarthi - Fine-Tuned Legal AI Chatbot",
      description: "Fine-tuned TinyLlama-1.1B on custom Indian cyber law dataset with zero hallucinations.",
      highlights: [
        "Achieved 60.2% accuracy and 93% reduction in evaluation loss",
        "Automated dataset generation with 10+ query variations per topic",
        "Implemented conversation memory and streaming responses"
      ],
      techStack: ["Python", "Hugging Face", "PEFT", "QLoRA", "PyTorch", "Streamlit"],
      repoUrl: "https://github.com/karanbaid",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    },
    {
      title: "News Analysis Crew",
      description: "Multi-agent AI system for critical analysis of online news articles using CrewAI.",
      highlights: [
        "Developed custom Web Content Extractor agent using BeautifulSoup",
        "Engineered AI Critical Thinking Partner for bias identification",
        "Orchestrated sequential agent collaboration for in-depth reporting"
      ],
      techStack: ["Python", "CrewAI", "LangChain", "BeautifulSoup", "YAML"],
      repoUrl: "https://github.com/karanbaid",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1504711432869-efd597cdd042?w=800&q=80",
    },
    {
      title: "Advanced RAG Chatbot",
      description: "Hybrid retrieval system combining BM25 and vector semantic search with reranking.",
      highlights: [
        "Implemented multi-query generation and Cohere reranking",
        "Built multi-format pipeline for PDFs, Word, images, and text",
        "Session management with source citation tracking"
      ],
      techStack: ["Python", "LangChain", "ChromaDB", "Groq API", "Cohere"],
      repoUrl: "https://github.com/karanbaid",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    }
  ];

  const skillsData = [
    { name: "Python", category: "Languages", proficiency: 95 },
    { name: "C++", category: "Languages", proficiency: 85 },
    { name: "Flask", category: "Frameworks", proficiency: 80 },
    { name: "FastAPI", category: "Frameworks", proficiency: 85 },
    { name: "CrewAI", category: "Frameworks", proficiency: 90 },
    { name: "LangChain", category: "Frameworks", proficiency: 95 },
    { name: "MLFlow", category: "MLOPS", proficiency: 75 },
    { name: "Docker", category: "MLOPS", proficiency: 80 },
    { name: "PostgreSQL", category: "Databases", proficiency: 85 },
    { name: "Chroma", category: "Databases", proficiency: 90 },
    { name: "PineCone", category: "Databases", proficiency: 85 },
  ];

  const experienceData = [
    {
      company: "Netgraph Networking Pvt. Ltd.",
      role: "Machine Learning Intern",
      location: "On-site",
      period: "October 2022 - Present",
      description: [
        "Built and deployed personalized recommendation system for financial products",
        "Applied data preprocessing, model training, and evaluation pipelines",
        "Collaborated with engineering team to align AI outputs with fintech product structures"
      ]
    }
  ];

  const certificationsData = [
    { name: "Gen-AI Certification", issuer: "IBM", verificationUrl: "#" },
    { name: "Python for Data Science and ML Bootcamp", issuer: "Jose Portilla", verificationUrl: "#" },
    { name: "Generative AI course with Langchain and Huggingface", issuer: "Udemy", verificationUrl: "#" }
  ];

  for (const p of projectsData) await storage.createProject(p);
  for (const s of skillsData) await storage.createSkill(s);
  for (const e of experienceData) await storage.createExperience(e);
  for (const c of certificationsData) await storage.createCertification(c);

  console.log("Database seeded with Karan's resume data!");
}
