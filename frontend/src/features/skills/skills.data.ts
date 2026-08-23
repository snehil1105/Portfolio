export interface SkillItem {
  name: string;
  iconName?: string; // Identifier for matching custom SVGs/Lucide icons
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: "Backend & APIs",
    items: [
      { name: "Java", iconName: "java" },
      { name: "Spring Boot", iconName: "spring" },
      { name: "REST APIs", iconName: "api" },
      { name: "Spring Security", iconName: "security" },
      { name: "JWT", iconName: "jwt" },
      { name: "Microservices", iconName: "layers" }
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React", iconName: "react" },
      { name: "TypeScript", iconName: "typescript" },
      { name: "JavaScript", iconName: "javascript" },
      { name: "HTML", iconName: "html" },
      { name: "CSS", iconName: "css" },
      { name: "Tailwind CSS", iconName: "tailwind" }
    ]
  },
  {
    category: "Databases & Caching",
    items: [
      { name: "PostgreSQL", iconName: "postgresql" },
      { name: "MySQL", iconName: "mysql" },
      { name: "Redis", iconName: "redis" },
      { name: "H2", iconName: "database" }
    ]
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Docker", iconName: "docker" },
      { name: "Git", iconName: "git" },
      { name: "GitHub", iconName: "github" },
      { name: "Maven", iconName: "maven" },
      { name: "Postman", iconName: "postman" }
    ]
  },
  {
    category: "Programming & Other",
    items: [
      { name: "C++", iconName: "cpp" },
      { name: "Python", iconName: "python" },
      { name: "FastAPI", iconName: "fastapi" }
    ]
  }
];
