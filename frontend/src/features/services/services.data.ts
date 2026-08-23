export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "fullstack",
    number: "01",
    title: "Full-Stack Web Development",
    description: "Building responsive web applications with React, Spring Boot, REST APIs, authentication, and databases."
  },
  {
    id: "backend",
    number: "02",
    title: "Backend & API Development",
    description: "Designing secure and scalable backend systems using Java, Spring Boot, REST APIs, Spring Security, JWT, and database integrations."
  },
  {
    id: "database",
    number: "03",
    title: "Database & Application Integration",
    description: "Designing database structures and connecting applications with PostgreSQL, MySQL, Redis, and third-party APIs."
  },
  {
    id: "devops",
    number: "04",
    title: "Application Setup & Containerization",
    description: "Setting up modern development environments and containerizing applications using Docker, Docker Compose, PostgreSQL, and Redis."
  }
];
