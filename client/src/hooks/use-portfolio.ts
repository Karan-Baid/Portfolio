import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";
import { type Project, type Skill, type Experience, type Certification } from "@shared/schema";

// Projects Hook
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    },
  });
}

// Skills Hook
export function useSkills() {
  return useQuery<Skill[]>({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return await res.json();
    },
  });
}

// Experience Hook
export function useExperience() {
  return useQuery<Experience[]>({
    queryKey: ["/api/experience"],
    queryFn: async () => {
      const res = await fetch("/api/experience");
      if (!res.ok) throw new Error("Failed to fetch experience");
      return await res.json();
    },
  });
}

// Certifications Hook
export function useCertifications() {
  return useQuery<Certification[]>({
    queryKey: ["/api/certifications"],
    queryFn: async () => {
      const res = await fetch("/api/certifications");
      if (!res.ok) throw new Error("Failed to fetch certifications");
      return await res.json();
    },
  });
}

// Contact Hook
export function useContact() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      
      return await res.json();
    },
  });
}
