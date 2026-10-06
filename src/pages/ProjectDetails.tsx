import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById, ProjectDocument, ProjectDiagram, ProjectFlowStep } from "@/data/projectsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Container,
  FileText,
  Database,
  CheckCircle2,
  Server,
  Cpu,
  Lock,
  Terminal,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  Workflow,
  BookOpen,
  Image as ImageIcon,
  Download,
  Eye,
  Maximize2,
  FileCode,
  FolderPlus,
  ArrowDown,
  ArrowRight,
  GitCommit,
  Sparkles,
  Loader2
} from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import DocumentViewerModal from "@/components/DocumentViewerModal";
import DiagramLightboxModal, { LightboxItem } from "@/components/DiagramLightboxModal";
import { useProjects } from "@/hooks/use-projects";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const project = projects.find((p) => p.id === id);

  // Gallery carousel state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Modals state
  const [selectedDoc, setSelectedDoc] = useState<ProjectDocument | null>(null);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Scroll to top when project ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navigation />
        <div className="flex flex-col items-center justify-center gap-4 py-32 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.25)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-pulse" />
            <Loader2 className="w-8 h-8 text-primary animate-spin relative z-10" />
          </div>
          <p className="text-sm font-semibold text-slate-300 animate-pulse tracking-wide">
            جاري تحميل تفاصيل المشروع...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navigation />
        <div className="flex flex-col items-center justify-center gap-4 py-32 px-6 text-center max-w-md mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            The project you are looking for does not exist or has been moved.
          </p>
          <Button asChild className="bg-gradient-primary">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const galleryImages = (project.gallery && project.gallery.length > 0 ? project.gallery : [project.image]).filter(
    (img) => img && typeof img === "string" && img.trim() !== ""
  );

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "freelance":
        return "bg-gradient-to-r from-amber-500 to-orange-500 shadow-orange-500/30";
      case "team":
        return "bg-gradient-to-r from-purple-600 to-purple-400 shadow-purple-500/30";
      case "personal":
        return "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-emerald-500/30";
      default:
        return "bg-gradient-to-r from-primary to-accent shadow-primary/30";
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "POST":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "PUT":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "DELETE":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    }
  };

  // Fallback default system flow steps if project doesn't have custom ones defined
  const defaultFlowSteps: ProjectFlowStep[] = [
    {
      step: 1,
      title: "Client / SPA Layer",
      tech: "React / Next.js",
      description: "User actions initiate HTTPS requests with JWT authorization headers to the backend gateway.",
    },
    {
      step: 2,
      title: "Web API Gateway",
      tech: "ASP.NET Core Web API",
      description: "Handles CORS, rate limiting, request validation, and routes requests to domain modules.",
    },
    {
      step: 3,
      title: "Application Logic",
      tech: "MediatR CQRS / Clean Architecture",
      description: "Processes commands & queries, executes business domain rules, and manages transactions.",
    },
    {
      step: 4,
      title: "Persistence & Cache",
      tech: "PostgreSQL / Redis",
      description: "Executes optimized SQL queries via EF Core and caches hot key-value pairs for high performance.",
    },
  ];

  const activeFlowSteps: ProjectFlowStep[] =
    project.flow && project.flow.length > 0 ? project.flow : defaultFlowSteps;

  const handleOpenScreenshotLightbox = (idx: number) => {
    const items: LightboxItem[] = galleryImages.map((img, i) => ({
      imageUrl: img,
      title: `${project.title} - Screenshot ${i + 1}`,
      description: project.subtitle || project.description,
      typeLabel: `Project Screenshot (${i + 1} of ${galleryImages.length})`,
    }));
    setLightboxItems(items);
    setLightboxIndex(idx);
  };

  const handleOpenDiagramLightbox = (idx: number) => {
    const items: LightboxItem[] = (project.diagrams || []).map((diag) => ({
      imageUrl: diag.imageUrl,
      title: diag.title,
      description: diag.description,
      highlights: diag.highlights,
      typeLabel: `${diag.type.toUpperCase()} Diagram`,
    }));
    setLightboxItems(items);
    setLightboxIndex(idx);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-primary selection:text-white">
      {/* Modals */}
      <DocumentViewerModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.title || ""}
        fileUrl={selectedDoc?.fileUrl || ""}
        description={selectedDoc?.description}
        fileSize={selectedDoc?.fileSize}
      />

      <DiagramLightboxModal
        isOpen={!!lightboxItems}
        onClose={() => setLightboxItems(null)}
        items={lightboxItems || []}
        initialIndex={lightboxIndex}
      />

      {/* Global Navigation Bar */}
      <Navigation />

      <main className="pt-20 sm:pt-28 pb-20 sm:pb-24">
        {/* Project Title Banner */}
        <section className="pt-4 sm:pt-6 pb-6 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-white/80 hover:text-white hover:border-primary/50 hover:bg-slate-800 transition-all duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" /> Back to All Projects
            </Link>
            <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-lg ${getCategoryColor(project.category)}`}>
              {project.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {project.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight leading-tight text-white">
            {project.title}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mb-6 font-normal leading-relaxed">
            {project.subtitle}
          </p>

          {/* Action Links Bar - Fully Responsive Mobile Grid */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 items-stretch sm:items-center">
            {Boolean(project.links?.live && project.links.live !== "#" && project.links.live.trim()) && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-gradient-primary text-white font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
              >
                <ExternalLink className="w-4 h-4 shrink-0" /> Live Demo
              </a>
            )}

            {Boolean(project.links?.github && project.links.github !== "#" && project.links.github.trim()) && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold hover:border-primary/50 hover:bg-slate-800 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
              >
                <Github className="w-4 h-4 text-primary shrink-0" /> GitHub Repository
              </a>
            )}

            {Boolean(project.links?.docker && project.links.docker !== "#" && project.links.docker.trim()) && (
              <a
                href={project.links.docker}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500/10 hover:border-cyan-500 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
              >
                <Container className="w-4 h-4 shrink-0" /> Docker Hub
              </a>
            )}

            {Boolean(project.links?.swagger && project.links.swagger !== "#" && project.links.swagger.trim()) && (
              <a
                href={project.links.swagger}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/10 hover:border-emerald-500 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
              >
                <FileText className="w-4 h-4 shrink-0" /> Swagger OpenAPI
              </a>
            )}
          </div>
        </section>

        {/* SECTION 1: PROJECT IMAGES */}
        {Boolean(galleryImages && galleryImages.length > 0) && (
          <section className="py-4 sm:py-6 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 px-1 sm:px-2">
                <h3 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary shrink-0" /> Project Screenshots
                </h3>
                <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground bg-slate-950/60 px-2.5 py-0.5 rounded-full border border-white/5">
                  {activeImageIdx + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Main Display Box with outside Prev/Next arrows */}
              <div className="relative flex items-center justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
                {galleryImages.length > 1 && (
                  <button
                    onClick={() => handlePrevImage()}
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl shrink-0 z-10"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>
                )}

                <div
                  onClick={() => handleOpenScreenshotLightbox(activeImageIdx)}
                  className="relative flex-1 aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center group shadow-inner cursor-pointer max-w-3xl"
                >
                  <img
                    src={galleryImages[activeImageIdx]}
                    alt={`${project.title} screenshot ${activeImageIdx + 1}`}
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-2 rounded-xl bg-slate-900/95 text-white font-bold text-xs flex items-center gap-2 border border-white/20 shadow-xl">
                      <Maximize2 className="w-4 h-4 text-primary" /> Click to Enlarge & Zoom
                    </span>
                  </div>
                </div>

                {galleryImages.length > 1 && (
                  <button
                    onClick={() => handleNextImage()}
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl shrink-0 z-10"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>

              {/* Thumbnails Strip */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 sm:gap-2.5 mt-3 overflow-x-auto pb-1.5 pt-1 scrollbar-none justify-start sm:justify-center px-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                        activeImageIdx === idx
                          ? "border-primary shadow-[0_0_12px_rgba(99,102,241,0.5)] scale-105"
                          : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION 2: PROJECT SCOPE & TECHNICAL DESCRIPTION */}
        <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Project Scope & Technical Description</h2>
                <p className="text-xs sm:text-sm text-slate-400">Architectural breakdown, core system features, and API contract specifications.</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
            <p className="text-slate-200 leading-relaxed text-sm sm:text-base font-normal">
              {project.longDescription || project.description}
            </p>

            {project.apiEndpoints && project.apiEndpoints.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary shrink-0" /> Defined API Endpoints Specs
                </h4>
                <div className="space-y-2.5">
                  {project.apiEndpoints.map((ep, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 font-mono text-xs overflow-hidden"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`px-2.5 py-0.5 rounded border text-[10px] sm:text-[11px] font-bold shrink-0 ${getMethodBadge(ep.method)}`}>
                          {ep.method}
                        </span>
                        <span className="text-white font-semibold break-all text-xs">{ep.path}</span>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-3 text-sans text-muted-foreground text-xs">
                        <span className="text-slate-300 text-xs line-clamp-1">{ep.summary}</span>
                        {ep.authRequired && (
                          <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[10px] shrink-0">
                            <Lock className="w-3 h-3" /> Auth
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: PROJECT DOCUMENTATION */}
        {Boolean(project.documents && project.documents.length > 0) && (
          <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Project Documentation (PDF / Specs)</h2>
                  <p className="text-xs sm:text-sm text-slate-400">View and download architecture PDFs, API specification manuals, and system guides.</p>
                </div>
              </div>
            </div>

            {/* PDF Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {project.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            PDF Document
                          </span>
                          <h3 className="font-bold text-sm sm:text-base text-white mt-1 line-clamp-1">{doc.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {doc.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t border-white/5">
                    <span className="text-xs text-muted-foreground font-mono">{doc.fileSize || "PDF File"}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-white hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300"
                      >
                        <Eye className="w-3.5 h-3.5" /> Preview PDF
                      </button>

                      <a
                        href={doc.fileUrl}
                        download
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all duration-300"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: SYSTEM & ARCHITECTURE DIAGRAMS */}
        {Boolean(project.diagrams && project.diagrams.length > 0) && (
          <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">System & Architecture Diagrams (PNG / Schemas)</h2>
                  <p className="text-xs sm:text-sm text-slate-400">Inspect high-resolution system diagrams, Clean Architecture topologies, and ERD models.</p>
                </div>
              </div>
            </div>

            {/* Diagrams Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {project.diagrams.map((diag, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/70 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group"
                >
                  <div>
                    {/* Image Preview Box */}
                    <div
                      onClick={() => handleOpenDiagramLightbox(idx)}
                      className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-slate-950 mb-4 cursor-pointer group-hover:border-purple-500/50 shadow-lg"
                    >
                      <img
                        src={diag.imageUrl}
                        alt={diag.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white font-bold text-xs flex items-center gap-2 border border-white/20">
                          <Maximize2 className="w-3.5 h-3.5 text-purple-400" /> Expand Diagram
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {diag.type} Diagram
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white mt-1 mb-2 line-clamp-1">{diag.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{diag.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 gap-2">
                    <button
                      onClick={() => handleOpenDiagramLightbox(idx)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-white hover:border-purple-500 hover:text-purple-300 transition-all duration-300"
                    >
                      <Eye className="w-3.5 h-3.5" /> Fullscreen PNG
                    </button>

                    <a
                      href={diag.imageUrl}
                      download
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors duration-200 shrink-0"
                      title="Download Diagram PNG"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: DYNAMIC SYSTEM EXECUTION FLOW & TOPOLOGY */}
        <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <GitCommit className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">System Execution Flow & Topology</h2>
                <p className="text-xs sm:text-sm text-slate-400">Step-by-step architectural workflow from request entry to persistence & response.</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
            {/* Dynamic Step Timeline / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 relative">
              {activeFlowSteps.map((stepItem, idx) => (
                <div key={idx} className="relative flex flex-col">
                  {/* Step Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.08)] flex-1 flex flex-col justify-between hover:border-teal-500/60 hover:shadow-[0_0_25px_rgba(20,184,166,0.15)] transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 font-extrabold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {stepItem.tech && (
                          <span className="text-[10px] font-mono text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded truncate max-w-[140px]">
                            {stepItem.tech}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-white mb-1.5">{stepItem.title}</h4>
                      {stepItem.description && (
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">{stepItem.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Connecting Arrow for mobile (down arrow) and desktop (right arrow) */}
                  {idx < activeFlowSteps.length - 1 && (
                    <div className="flex md:hidden items-center justify-center my-2 text-teal-400">
                      <ArrowDown className="w-5 h-5 animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Contact CTA Banner */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 overflow-hidden bg-gradient-to-r from-primary/20 via-purple-900/20 to-accent/20 border border-primary/30 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Impressed by this project's architecture & documentation?</h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
              Let's collaborate to build your next scalable, enterprise-grade web application tailored to your business needs.
            </p>
            <Button
              onClick={() => {
                navigate("/", { state: { scrollTo: "contact" } });
              }}
              size="lg"
              className="h-11 sm:h-12 px-6 sm:px-8 text-xs sm:text-sm font-bold bg-gradient-primary text-white border-0 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl w-full sm:w-auto"
            >
              Get In Touch Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
