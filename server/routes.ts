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
      description: "Fine-tuned TinyLlama-1.1B using QLoRA on custom Indian cyber law dataset (544+ Q&A pairs), achieving 60.2% accuracy and 93% reduction in evaluation loss with 4-bit quantization.",
      highlights: [
        "Built complete ML pipeline: automated dataset generation with 10+ query variations per topic",
        "Parameter-efficient fine-tuning with LoRA adapters and full-stack deployment",
        "Implemented conversation memory, streaming responses, and achieved zero hallucinations on legal queries"
      ],
      techStack: ["Python", "Hugging Face Transformers", "PEFT", "QLoRA", "BitsAndBytes", "PyTorch", "Streamlit"],
      repoUrl: "https://github.com/karanbaid",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    },
    {
      title: "News Analysis Crew",
      description: "Engineered a multi-agent AI system using the CrewAI framework to automate the critical analysis of online news articles, simulating a professional research workflow.",
      highlights: [
        "Developed specialized Web Content Extractor agent with custom Python tool using BeautifulSoup",
        "Designed AI Critical Thinking Partner agent for nuanced analysis including bias identification",
        "Orchestrated agent collaboration in sequential process for in-depth reporting and output generation"
      ],
      techStack: ["Python", "CrewAI", "Pydantic", "BeautifulSoup", "YAML", "LangChain"],
      repoUrl: "https://github.com/karanbaid",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1504711432869-efd597cdd042?w=800&q=80",
    },
    {
      title: "RAG Chatbot",
      description: "Developed an advanced RAG system implementing hybrid retrieval combining BM25 and vector semantic search, enhanced with multi-query generation and Cohere reranking for superior document retrieval accuracy.",
      highlights: [
        "Engineered multi-format document processing pipeline leveraging Unstructured library",
        "Built production-ready conversational interface with Reciprocal Rank Fusion",
        "Persistent vector storage, session management, and source citation tracking for context-aware multi-turn conversations"
      ],
      techStack: ["Python", "LangChain", "Streamlit", "Groq API", "Cohere", "ChromaDB", "Unstructured"],
      repoUrl: "https://github.com/karanbaid",
      demoUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    }
  ];

  const skillsData = [
    // Programming Languages
    { name: "Python", category: "Languages", proficiency: 95 },
    { name: "C++", category: "Languages", proficiency: 85 },

    // Frameworks & APIs
    { name: "Flask", category: "Frameworks", proficiency: 85 },
    { name: "FastAPI", category: "Frameworks", proficiency: 90 },
    { name: "CrewAI", category: "Frameworks", proficiency: 90 },
    { name: "LangChain", category: "Frameworks", proficiency: 95 },
    { name: "Langgraph", category: "Frameworks", proficiency: 90 },

    // MLOPS
    { name: "MLFlow", category: "MLOPS", proficiency: 80 },
    { name: "Docker", category: "MLOPS", proficiency: 85 },
    { name: "Airflow", category: "MLOPS", proficiency: 75 },
    { name: "Dagshub", category: "MLOPS", proficiency: 75 },
    { name: "Grafana", category: "MLOPS", proficiency: 70 },

    // Databases
    { name: "MySQL", category: "Databases", proficiency: 80 },
    { name: "PostgreSQL", category: "Databases", proficiency: 85 },
    { name: "Chroma", category: "Databases", proficiency: 90 },
    { name: "PineCone", category: "Databases", proficiency: 85 },
    { name: "FAISS", category: "Databases", proficiency: 85 },
  ];

  const experienceData = [
    {
      company: "Netgraph Networking Pvt. Ltd.",
      role: "Machine Learning Intern",
      location: "On-site",
      period: "Recent",
      description: [
        "Built and deployed a personalized recommendation system for financial products using ML pipelines",
        "Applied core machine learning concepts including data preprocessing, model training, and evaluation",
        "Gained exposure to advanced AI/ML techniques and developed insights into fintech-specific use cases and data challenges",
        "Collaborated with engineering team to align AI outputs with real-world fintech product structures",
        "Gained hands-on experience in domain-driven ML solutioning, handling real user engagement data"
      ]
    }
  ];

  const certificationsData = [
    { name: "Gen-AI Certification by IBM", issuer: "IBM", verificationUrl: "#" },
    { name: "Python for Data Science and Machine Learning Bootcamp", issuer: "Jose Portilla", verificationUrl: "#" },
    { name: "Complete Generative AI course with Langchain and Huggingface", issuer: "Udemy", verificationUrl: "#" }
  ];

  for (const p of projectsData) await storage.createProject(p);
  for (const s of skillsData) await storage.createSkill(s);
  for (const e of experienceData) await storage.createExperience(e);
  for (const c of certificationsData) await storage.createCertification(c);

  console.log("Database seeded with Karan's resume data!");
}
