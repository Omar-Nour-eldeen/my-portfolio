import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/use-projects";
import { supabase } from "@/integrations/supabase/client";
import { ProjectData, ApiEndpoint, ProjectDocument, ProjectDiagram } from "@/data/projectsData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowLeft,
  Plus,
  Database,
  UploadCloud,
  Layers,
  ExternalLink,
  Lock,
  Key,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  Trash2,
  FileCode,
  BookOpen,
  Workflow,
  Container,
  CheckCircle,
  Images,
  X
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageUploader from "@/components/ImageUploader";

const Admin = () => {
  const navigate = useNavigate();
  const { projects, loading, refetch } = useProjects();

  // Authentication State with Supabase Auth
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [emailInput, setEmailInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    // Check initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsCheckingAuth(false);
    });

    // Listen to authentication status changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Form State - Basic Details
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subtitle: "",
    category: "freelance" as "team" | "personal" | "freelance",
    categoryLabel: "Freelance Work",
    description: "",
    longDescription: "",
    image: "",
    role: "",
    duration: "",
    status: "Production Ready",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    dockerUrl: "",
    swaggerUrl: "",
    dockerPullCommand: "",
    dockerComposeSnippet: "",
  });

  // Gallery images state (multiple)
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Dynamic Array States
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpoint[]>([]);
  const [newEndpoint, setNewEndpoint] = useState<ApiEndpoint>({
    method: "GET",
    path: "/api/v1/resource",
    summary: "Endpoint summary",
    authRequired: false,
  });

  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [newDoc, setNewDoc] = useState<ProjectDocument>({
    title: "",
    type: "pdf",
    fileUrl: "",
    description: "",
    fileSize: "",
  });

  const [diagrams, setDiagrams] = useState<ProjectDiagram[]>([]);
  const [newDiagram, setNewDiagram] = useState<ProjectDiagram>({
    title: "",
    type: "architecture",
    imageUrl: "",
    description: "",
  });

  const handleAddGalleryImage = (url: string) => {
    if (url && !galleryImages.includes(url)) {
      setGalleryImages((prev) => [...prev, url]);
    }
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passcodeInput.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoginLoading(true);
      setPassError(false);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.trim(),
        password: passcodeInput.trim(),
      });

      if (error) {
        setPassError(true);
        toast.error(`Access Denied: ${error.message}`);
      } else if (data.session) {
        setIsAuthenticated(true);
        toast.success("Welcome Omar! Admin Access Granted.");
      }
    } catch (err: any) {
      setPassError(true);
      toast.error(`Authentication error: ${err.message || 'Unknown error'}`);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast.info("Logged out of Admin Dashboard.");
  };

  const handleCategoryChange = (cat: "team" | "personal" | "freelance") => {
    let label = "Freelance Work";
    if (cat === "team") label = "Team Project";
    if (cat === "personal") label = "Personal Project";
    setFormData((prev) => ({ ...prev, category: cat, categoryLabel: label }));
  };

  // Endpoint handlers
  const handleAddEndpoint = () => {
    if (!newEndpoint.path) return;
    setApiEndpoints([...apiEndpoints, { ...newEndpoint }]);
    setNewEndpoint({ method: "GET", path: "/api/v1/", summary: "", authRequired: false });
  };
  const handleRemoveEndpoint = (idx: number) => {
    setApiEndpoints(apiEndpoints.filter((_, i) => i !== idx));
  };

  // Doc handlers
  const handleAddDoc = () => {
    if (!newDoc.title || !newDoc.fileUrl) return;
    setDocuments([...documents, { ...newDoc }]);
    setNewDoc({ title: "", type: "pdf", fileUrl: "", description: "", fileSize: "" });
  };
  const handleRemoveDoc = (idx: number) => {
    setDocuments(documents.filter((_, i) => i !== idx));
  };

  // Diagram handlers
  const handleAddDiagram = () => {
    if (!newDiagram.title || !newDiagram.imageUrl) return;
    setDiagrams([...diagrams, { ...newDiagram }]);
    setNewDiagram({ title: "", type: "architecture", imageUrl: "", description: "" });
  };
  const handleRemoveDiagram = (idx: number) => {
    setDiagrams(diagrams.filter((_, i) => i !== idx));
  };

  // Save new full project to Supabase
  const handleSubmitNewProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.id) {
      toast.error("Please provide at least a Project Title and unique ID!");
      return;
    }

    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const dockerInfoObj = formData.dockerPullCommand
      ? {
          pullCommand: formData.dockerPullCommand,
          composeSnippet: formData.dockerComposeSnippet,
          containers: [],
        }
      : null;

    const mainImage = formData.image || (galleryImages.length > 0 ? galleryImages[0] : "");
    const allGallery = galleryImages.length > 0 ? galleryImages : (formData.image ? [formData.image] : []);

    const newProjectPayload = {
      id: formData.id.toLowerCase().trim().replace(/\s+/g, "-"),
      title: formData.title,
      subtitle: formData.subtitle,
      category: formData.category,
      category_label: formData.categoryLabel,
      description: formData.description,
      long_description: formData.longDescription || formData.description,
      image: mainImage,
      gallery: allGallery,
      role: formData.role || "Fullstack Developer",
      duration: formData.duration || "1 Month",
      status: formData.status,
      technologies: techArray,
      links: {
        live: formData.liveUrl?.trim() || undefined,
        github: formData.githubUrl?.trim() || undefined,
        docker: formData.dockerUrl?.trim() || undefined,
        swagger: formData.swaggerUrl?.trim() || undefined,
      },
      documents: documents,
      diagrams: diagrams,
      architecture: { pattern: "Clean Architecture", overview: "Scalable modular system architecture", layers: [] },
      api_endpoints: apiEndpoints,
      docker_info: dockerInfoObj,
      database_schema: null,
      key_features: [],
      highlights: [],
    };

    try {
      toast.info("Saving full project specification to Supabase...");
      const { error } = await supabase.from("projects").upsert(newProjectPayload, { onConflict: "id" });

      if (error) throw error;

      toast.success(`Project "${formData.title}" saved successfully to Supabase!`);

      // Reset form
      setFormData({
        id: "",
        title: "",
        subtitle: "",
        category: "freelance",
        categoryLabel: "Freelance Work",
        description: "",
        longDescription: "",
        image: "",
        role: "",
        duration: "",
        status: "Production Ready",
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        dockerUrl: "",
        swaggerUrl: "",
        dockerPullCommand: "",
        dockerComposeSnippet: "",
      });
      setApiEndpoints([]);
      setDocuments([]);
      setDiagrams([]);
      setGalleryImages([]);

      await refetch();
    } catch (err: any) {
      toast.error(`Error saving project: ${err.message || "Ensure Supabase table 'projects' exists"}`);
    }
  };

  // If checking session, show smooth loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <Navigation />
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, render Supabase Auth Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <Navigation />

        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">Omar Nour Admin Area</h1>
            <p className="text-xs text-slate-400 mt-1">Log in with your Supabase credentials to manage projects.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <Input
                type="email"
                placeholder="Admin Email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className={`pl-10 bg-slate-950 border-white/10 text-white rounded-xl h-11 ${
                  passError ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                required
              />
            </div>

            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Admin Password..."
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className={`pl-10 pr-10 bg-slate-950 border-white/10 text-white rounded-xl h-11 ${
                  passError ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loginLoading}
              className="w-full h-11 bg-gradient-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white pt-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-primary selection:text-white">
      <Navigation />

      <main className="pt-28 pb-24 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link to="/" className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
              <Database className="w-8 h-8 text-primary" /> Portfolio CMS Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Add, upload and manage complete project specifications directly to Supabase.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-red-400 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-xs flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Comprehensive Add New Project Form */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Plus className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-white">Add New Full Project</h2>
            </div>

            <form onSubmit={handleSubmitNewProject} className="space-y-6 text-sm">
              {/* 1. Basic Metadata */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">1. Basic Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Unique ID (Slug) *</label>
                    <Input
                      placeholder="e.g. perfume-store-api"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value as any)}
                      className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-medium focus:border-primary outline-none"
                    >
                      <option value="freelance">Freelance Work</option>
                      <option value="team">Team Project</option>
                      <option value="personal">Personal Project</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Project Title *</label>
                  <Input
                    placeholder="e.g. E-Commerce Microservices Engine"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Subtitle / Tagline</label>
                  <Input
                    placeholder="e.g. Scalable ASP.NET Core Clean Architecture API with Stripe"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Role</label>
                    <Input
                      placeholder="e.g. Lead Backend Architect"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Duration</label>
                    <Input
                      placeholder="e.g. 3 Months"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Status</label>
                    <Input
                      placeholder="e.g. Production Ready"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Action Links & Media */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. Action Links & Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Live Demo URL (Leave blank if none)</label>
                    <Input
                      placeholder="https://my-live-demo.com"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">GitHub Repo URL (Leave blank if none)</label>
                    <Input
                      placeholder="https://github.com/Omar-Nour-eldeen/repo"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Docker Hub URL (Optional)</label>
                    <Input
                      placeholder="https://hub.docker.com/r/omarnour/my-app"
                      value={formData.dockerUrl}
                      onChange={(e) => setFormData({ ...formData, dockerUrl: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Swagger OpenAPI URL (Optional)</label>
                    <Input
                      placeholder="https://swagger.io/..."
                      value={formData.swaggerUrl}
                      onChange={(e) => setFormData({ ...formData, swaggerUrl: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Main Image Upload */}
                <ImageUploader
                  label="Main Project Image (Cover) *"
                  accept="image/*"
                  bucketName="project-assets"
                  folderPath="covers"
                  hint="JPG, PNG, WebP recommended — This is the card thumbnail"
                  currentUrl={formData.image}
                  onUploadComplete={(url) => setFormData({ ...formData, image: url })}
                />

                {/* Gallery Images Upload */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Images className="w-3.5 h-3.5 text-primary" />
                    <label className="text-[11px] font-semibold text-slate-300">Gallery / Screenshots ({galleryImages.length} uploaded)</label>
                  </div>

                  {/* Uploaded gallery thumbnails */}
                  {galleryImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-950/60 border border-white/5">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/10 group flex-shrink-0">
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                          <span className="absolute bottom-0.5 left-0.5 text-[8px] bg-black/60 text-white px-1 rounded font-mono">{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <ImageUploader
                    label="Add Gallery Screenshot"
                    accept="image/*"
                    bucketName="project-assets"
                    folderPath="gallery"
                    hint="Upload one at a time — multiple screenshots supported"
                    onUploadComplete={(url) => { if (url) handleAddGalleryImage(url); }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Technologies (Comma separated)</label>
                  <Input
                    placeholder="ASP.NET Core, .NET 8, Next.js, PostgreSQL, Docker, Redis"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* 3. Descriptions */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">3. Technical Descriptions</h3>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Short Description (Card view) *</label>
                  <Textarea
                    placeholder="Brief summary displayed on project cards..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl h-16 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Technical Description (Scope)</label>
                  <Textarea
                    placeholder="Detailed architecture and scope description..."
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl h-24 text-xs"
                  />
                </div>
              </div>

              {/* 4. API Endpoints Specs */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                  <span>4. API Endpoints Specs ({apiEndpoints.length})</span>
                </h3>

                {apiEndpoints.map((ep, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">{ep.method}</span>
                      <span className="text-white">{ep.path}</span>
                      <span className="text-slate-400 text-[10px]">({ep.summary})</span>
                    </div>
                    <button type="button" onClick={() => handleRemoveEndpoint(idx)} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-12 gap-2 pt-2">
                  <select
                    value={newEndpoint.method}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, method: e.target.value as any })}
                    className="col-span-3 h-9 px-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>

                  <Input
                    placeholder="/api/v1/resource"
                    value={newEndpoint.path}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, path: e.target.value })}
                    className="col-span-5 bg-slate-900 border-white/10 text-white rounded-xl text-xs h-9 font-mono"
                  />

                  <Input
                    placeholder="Summary"
                    value={newEndpoint.summary}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, summary: e.target.value })}
                    className="col-span-4 bg-slate-900 border-white/10 text-white rounded-xl text-xs h-9"
                  />
                </div>

                <Button type="button" onClick={handleAddEndpoint} variant="outline" size="sm" className="w-full text-xs rounded-xl border-dashed border-white/20">
                  + Add API Endpoint
                </Button>
              </div>

              {/* 5. PDF Documents */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">5. PDF Documents ({documents.length})</h3>

                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5 text-xs">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-white font-bold">{doc.title}</span>
                      <span className="text-slate-400 text-[10px]">({doc.fileUrl})</span>
                    </div>
                    <button type="button" onClick={() => handleRemoveDoc(idx)} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <div className="space-y-2 p-3 rounded-xl bg-slate-950/50 border border-white/5">
                  <Input
                    placeholder="PDF Document Title *"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl text-xs h-9"
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={newDoc.description}
                    onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl text-xs h-9"
                  />
                  <ImageUploader
                    label="Upload PDF File"
                    accept="application/pdf,.pdf"
                    bucketName="project-assets"
                    folderPath="documents"
                    hint="PDF files only"
                    currentUrl={newDoc.fileUrl}
                    onUploadComplete={(url) => setNewDoc({ ...newDoc, fileUrl: url })}
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleAddDoc}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs rounded-xl border-dashed border-white/20"
                  disabled={!newDoc.title || !newDoc.fileUrl}
                >
                  + Add PDF Document
                </Button>
              </div>

              {/* 6. System Diagrams */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">6. Architecture Diagrams ({diagrams.length})</h3>

                {diagrams.map((diag, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/5 text-xs">
                    <div className="flex items-center gap-2">
                      <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-white font-bold">{diag.title}</span>
                      <span className="text-slate-400 text-[10px]">({diag.imageUrl})</span>
                    </div>
                    <button type="button" onClick={() => handleRemoveDiagram(idx)} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <div className="space-y-2 p-3 rounded-xl bg-slate-950/50 border border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      placeholder="Diagram Title *"
                      value={newDiagram.title}
                      onChange={(e) => setNewDiagram({ ...newDiagram, title: e.target.value })}
                      className="bg-slate-900 border-white/10 text-white rounded-xl text-xs h-9"
                    />
                    <select
                      value={newDiagram.type}
                      onChange={(e) => setNewDiagram({ ...newDiagram, type: e.target.value as any })}
                      className="h-9 px-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-medium focus:border-primary outline-none"
                    >
                      <option value="architecture">Architecture</option>
                      <option value="erd">ERD Diagram</option>
                      <option value="sequence">Sequence Diagram</option>
                      <option value="devops">DevOps / CI-CD</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Diagram description (optional)"
                    value={newDiagram.description}
                    onChange={(e) => setNewDiagram({ ...newDiagram, description: e.target.value })}
                    className="bg-slate-900 border-white/10 text-white rounded-xl text-xs h-9"
                  />
                  <ImageUploader
                    label="Upload Diagram Image"
                    accept="image/*"
                    bucketName="project-assets"
                    folderPath="diagrams"
                    hint="PNG or JPG — architecture, ERD, or system diagrams"
                    currentUrl={newDiagram.imageUrl}
                    onUploadComplete={(url) => setNewDiagram({ ...newDiagram, imageUrl: url })}
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleAddDiagram}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs rounded-xl border-dashed border-white/20"
                  disabled={!newDiagram.title || !newDiagram.imageUrl}
                >
                  + Add Architecture Diagram
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-primary text-white font-bold rounded-xl shadow-lg hover:scale-[1.01] transition-all duration-300 text-sm"
              >
                Save Complete Project to Supabase
              </Button>
            </form>
          </div>

          {/* Right Column: Existing Projects List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-900/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" /> Active Projects ({projects.length})
                </h2>
                <span className="text-xs text-slate-400">{loading ? "Loading..." : "Live in Supabase"}</span>
              </div>

              <div className="space-y-3 max-h-[850px] overflow-y-auto pr-1">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 hover:border-primary/30 transition-all duration-200 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase">{p.categoryLabel}</span>
                        <h3 className="font-bold text-sm text-white line-clamp-1">{p.title}</h3>
                      </div>
                      <Link
                        to={`/project/${p.id}`}
                        target="_blank"
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-white/10"
                      >
                        View <ExternalLink className="w-3 h-3 text-primary" />
                      </Link>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>

                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {p.links?.live && <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>}
                      {p.links?.github && <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">GitHub</span>}
                      {p.links?.docker && <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Docker</span>}
                      {p.documents?.length > 0 && <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{p.documents.length} Docs</span>}
                      {p.diagrams?.length > 0 && <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{p.diagrams.length} Diagrams</span>}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono">
                      <span>ID: {p.id}</span>
                      <span className="text-emerald-400">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
