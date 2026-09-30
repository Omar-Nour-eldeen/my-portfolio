export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  authRequired: boolean;
}

export interface ProjectDocument {
  title: string;
  type: "pdf" | "image" | "link";
  fileUrl: string;
  description: string;
  fileSize?: string;
}

export interface ProjectDiagram {
  title: string;
  type: "architecture" | "erd" | "sequence" | "devops";
  imageUrl: string;
  description: string;
  highlights?: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: "team" | "personal" | "freelance";
  categoryLabel: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  role: string;
  duration: string;
  status: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
    docker?: string;
    swagger?: string;
    docs?: string;
  };
  documents: ProjectDocument[];
  diagrams: ProjectDiagram[];
  architecture: {
    pattern: string;
    overview: string;
    layers: { name: string; description: string; tech: string }[];
  };
  apiEndpoints: ApiEndpoint[];
  dockerInfo?: {
    pullCommand: string;
    composeSnippet: string;
    containers: { name: string; image: string; port: string; status: string }[];
  };
  databaseSchema?: {
    dbEngine: string;
    tables: { name: string; description: string; columnsCount: number; relations: string }[];
    erdNotes: string;
  };
  keyFeatures: { title: string; description: string; tag?: string }[];
  highlights: string[];
}

// Strictly empty array - portfolio data is fetched directly from Supabase
export const projectsData: ProjectData[] = [];

export const getProjectById = (id: string): ProjectData | undefined => {
  return projectsData.find((p) => p.id === id);
};
