import { db } from "./db";
import { 
  projects, skills, messages, experience, certifications,
  type Project, type InsertProject, type Skill, type InsertSkill, 
  type InsertMessage, type Experience, type InsertExperience,
  type Certification, type InsertCertification 
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getCertifications(): Promise<Certification[]>;
  createMessage(message: InsertMessage): Promise<void>;
  
  // Seed helpers
  createProject(project: InsertProject): Promise<Project>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  createExperience(exp: InsertExperience): Promise<Experience>;
  createCertification(cert: InsertCertification): Promise<Certification>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getCertifications(): Promise<Certification[]> {
    return await db.select().from(certifications);
  }

  async createMessage(insertMessage: InsertMessage): Promise<void> {
    await db.insert(messages).values(insertMessage);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }

  async createExperience(exp: InsertExperience): Promise<Experience> {
    const [res] = await db.insert(experience).values(exp).returning();
    return res;
  }

  async createCertification(cert: InsertCertification): Promise<Certification> {
    const [res] = await db.insert(certifications).values(cert).returning();
    return res;
  }
}

export const storage = new DatabaseStorage();
