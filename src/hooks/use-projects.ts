import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectData } from "@/data/projectsData";

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

      // If sort_order column doesn't exist in Supabase schema yet, retry without sort_order
      if (error && (error.message.includes('sort_order') || error.code === 'PGRST204' || error.message.includes('column'))) {
        console.warn("sort_order column missing, falling back to created_at order:", error.message);
        const res = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        data = res.data;
        error = res.error;
      }

      if (error) {
        console.error("Supabase fetch error:", error.message);
        setError(error.message);
        setProjects([]);
      } else if (data) {
        const mappedData: ProjectData[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle || '',
          category: item.category,
          categoryLabel: item.category_label || item.categoryLabel || 'Project',
          description: item.description || '',
          longDescription: item.long_description || item.longDescription || '',
          image: item.image || '',
          gallery: Array.isArray(item.gallery) ? item.gallery : [],
          role: item.role || '',
          duration: item.duration || '',
          status: item.status || 'Active',
          technologies: Array.isArray(item.technologies) ? item.technologies : [],
          links: item.links || {},
          documents: Array.isArray(item.documents) ? item.documents : [],
          diagrams: Array.isArray(item.diagrams) ? item.diagrams : [],
          architecture: item.architecture || { pattern: '', overview: '', layers: [] },
          apiEndpoints: Array.isArray(item.api_endpoints || item.apiEndpoints)
            ? (item.api_endpoints || item.apiEndpoints)
            : [],
          flow: Array.isArray(item.flow)
            ? item.flow
            : Array.isArray(item.system_flow)
            ? item.system_flow
            : [],
          dockerInfo: item.docker_info || item.dockerInfo,
          databaseSchema: item.database_schema || item.databaseSchema,
          keyFeatures: Array.isArray(item.key_features || item.keyFeatures)
            ? (item.key_features || item.keyFeatures)
            : [],
          highlights: Array.isArray(item.highlights) ? item.highlights : []
        }));
        setProjects(mappedData);
      } else {
        setProjects([]);
      }
    } catch (err: any) {
      console.error("Error fetching projects from Supabase:", err);
      setError(err.message || "Failed to fetch projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
};
