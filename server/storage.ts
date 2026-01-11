import { db } from "./db";
import { projects, skills, messages, type Project, type InsertProject, type Skill, type InsertSkill, type InsertMessage } from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  createMessage(message: InsertMessage): Promise<void>;
  createProject(project: InsertProject): Promise<Project>; // For seeding
  createSkill(skill: InsertSkill): Promise<Skill>; // For seeding
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
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
}

export const storage = new DatabaseStorage();
