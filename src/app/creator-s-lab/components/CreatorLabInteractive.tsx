'use client';

import { useState, useEffect } from 'react';
import ProcessCard from './ProcessCard';
import ToolCard from './ToolCard';
import ExperimentCard from './ExperimentCard';
import TimelineItem from './TimelineItem';
import WorkflowTemplate from './WorkflowTemplate';
import VideoTutorial from './VideoTutorial';
import Icon from '@/coamponents/ui/AppIcon';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: string;
  alt: string;
  rating: number;
  usageCount: number;
}

interface Experiment {
  id: number;
  title: string;
  date: string;
  status: 'Success' | 'In Progress' | 'Failed';
  description: string;
  image: string;
  alt: string;
  learnings: string[];
}

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  milestone: boolean;
  category: string;
}

interface Template {
  id: number;
  name: string;
  description: string;
  steps: number;
  downloads: number;
  category: string;
}

interface Tutorial {
  id: number;
  title: string;
  duration: string;
  views: number;
  thumbnail: string;
  alt: string;
  category: string;
}

const CreatorLabInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'processes' | 'tools' | 'experiments' | 'timeline' | 'templates' | 'tutorials'>('processes');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const processes: ProcessStep[] = [
  {
    id: 1,
    title: "AI Logo Generation Workflow",
    description: "Complete step-by-step process for creating unique brand logos using multiple AI tools and refinement techniques.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15d0b73e0-1764764623950.png",
    alt: "Designer workspace with colorful logo sketches and digital tablet showing AI-generated logo designs",
    duration: "45 min",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    title: "Game Asset Creation Pipeline",
    description: "From concept to implementation: generating game sprites, backgrounds, and UI elements using AI collaboration.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b11daebe-1764669492597.png",
    alt: "Computer screen displaying pixel art game assets and character sprites in vibrant colors",
    duration: "90 min",
    difficulty: "Advanced"
  },
  {
    id: 3,
    title: "Website Mockup to Code",
    description: "Transform AI-generated design mockups into production-ready responsive websites with modern frameworks.",
    image: "https://images.unsplash.com/photo-1597094147095-89304c284ba7",
    alt: "Laptop showing website wireframes and code editor with HTML and CSS on dual monitors",
    duration: "60 min",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "AI Art Style Transfer",
    description: "Master the art of applying different artistic styles to images using neural style transfer techniques.",
    image: "https://images.unsplash.com/photo-1514480528757-fabb827ff382",
    alt: "Abstract digital art with vibrant color gradients and geometric patterns on canvas",
    duration: "30 min",
    difficulty: "Beginner"
  },
  {
    id: 5,
    title: "Prompt Engineering Mastery",
    description: "Learn advanced techniques for crafting effective prompts that consistently produce high-quality AI outputs.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1359b9e34-1764746015157.png",
    alt: "Person typing on laptop with AI interface showing text prompts and generated results",
    duration: "40 min",
    difficulty: "Beginner"
  },
  {
    id: 6,
    title: "3D Model Generation & Refinement",
    description: "Create and refine 3D models using AI tools, from initial generation to final texture application.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_104d8f2b8-1764790843126.png",
    alt: "3D modeling software interface showing wireframe and rendered 3D character model",
    duration: "120 min",
    difficulty: "Advanced"
  }];


  const tools: Tool[] = [
  {
    id: 1,
    name: "MidJourney",
    category: "Image Generation",
    description: "Advanced AI image generation tool for creating stunning visual artwork from text descriptions.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17343f932-1764647364752.png",
    alt: "MidJourney logo with purple and blue gradient on dark background",
    rating: 5,
    usageCount: 1247
  },
  {
    id: 2,
    name: "ChatGPT",
    category: "Text & Code",
    description: "Versatile AI assistant for content creation, code generation, and creative problem-solving.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1661ca814-1764640737278.png",
    alt: "ChatGPT interface logo with green chat bubble icon on white background",
    rating: 5,
    usageCount: 2891
  },
  {
    id: 3,
    name: "Stable Diffusion",
    category: "Image Generation",
    description: "Open-source AI model for generating detailed images with fine-grained control over outputs.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12eeb0fd8-1764935168969.png",
    alt: "Stable Diffusion logo with colorful neural network visualization",
    rating: 4,
    usageCount: 856
  },
  {
    id: 4,
    name: "RunwayML",
    category: "Video & Animation",
    description: "AI-powered video editing and generation tool for creating dynamic visual content.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1344a18f3-1764674526665.png",
    alt: "RunwayML logo with gradient purple and pink colors on dark surface",
    rating: 4,
    usageCount: 423
  },
  {
    id: 5,
    name: "DALL-E 3",
    category: "Image Generation",
    description: "Latest iteration of OpenAI's image generation model with improved accuracy and detail.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17f13d2e7-1765109660303.png",
    alt: "DALL-E logo with colorful abstract art representation on white background",
    rating: 5,
    usageCount: 1634
  },
  {
    id: 6,
    name: "GitHub Copilot",
    category: "Code Assistant",
    description: "AI pair programmer that helps write code faster with intelligent suggestions and completions.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1a92e6ae2-1765109663129.png",
    alt: "GitHub Copilot logo with blue octopus icon and code symbols",
    rating: 5,
    usageCount: 1978
  }];


  const experiments: Experiment[] = [
  {
    id: 1,
    title: "Multi-Model Logo Synthesis",
    date: "December 2025",
    status: "Success",
    description: "Experimented with combining outputs from three different AI models to create unique logo variations with unprecedented creativity.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f044fd6e-1764738168582.png",
    alt: "Collection of colorful abstract logo designs arranged in grid layout on dark background",
    learnings: [
    "Model diversity leads to more creative outputs",
    "Iterative refinement produces better results than single-shot generation"]

  },
  {
    id: 2,
    title: "Real-time Game Asset Generation",
    date: "November 2025",
    status: "In Progress",
    description: "Testing the feasibility of generating game assets on-demand during gameplay using edge AI processing.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1385ac586-1764678169619.png",
    alt: "Gaming setup with multiple monitors showing procedurally generated game environments",
    learnings: [
    "Latency remains a challenge for real-time generation",
    "Pre-caching common assets improves performance significantly"]

  },
  {
    id: 3,
    title: "Style Transfer for Web Design",
    date: "October 2025",
    status: "Success",
    description: "Applied neural style transfer to automatically adapt website designs to match brand aesthetics while maintaining usability.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ff80e28-1764751526946.png",
    alt: "Website mockups showing before and after style transfer with vibrant color schemes",
    learnings: [
    "Maintaining readability is crucial during style transfer",
    "User testing validates AI-generated design decisions"]

  },
  {
    id: 4,
    title: "Prompt Chaining Automation",
    date: "September 2025",
    status: "Failed",
    description: "Attempted to create an automated system for chaining prompts to generate complex multi-step creative outputs.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec3787c0-1765025679243.png",
    alt: "Flowchart diagram showing interconnected AI prompt sequences on whiteboard",
    learnings: [
    "Context loss between prompts degrades output quality",
    "Manual intervention still necessary for complex workflows"]

  }];


  const timeline: TimelineEvent[] = [
  {
    id: 1,
    date: "December 2025",
    title: "Launched AI Creator Hub",
    description: "Officially launched the platform showcasing AI-generated creative work and collaborative processes.",
    milestone: true,
    category: "Platform"
  },
  {
    id: 2,
    date: "November 2025",
    title: "Mastered MidJourney V6",
    description: "Achieved expert-level proficiency in MidJourney's latest version, unlocking advanced creative possibilities.",
    milestone: false,
    category: "Skill"
  },
  {
    id: 3,
    date: "October 2025",
    title: "First AI Game Published",
    description: "Released first complete game with AI-generated assets, receiving positive community feedback.",
    milestone: true,
    category: "Project"
  },
  {
    id: 4,
    date: "September 2025",
    title: "Developed Custom Workflow Templates",
    description: "Created reusable workflow templates for common AI creation tasks, improving efficiency by 60%.",
    milestone: false,
    category: "Tool"
  },
  {
    id: 5,
    date: "August 2025",
    title: "Reached 1000 Creations Milestone",
    description: "Generated and cataloged over 1000 unique AI creations across various categories.",
    milestone: true,
    category: "Achievement"
  },
  {
    id: 6,
    date: "July 2025",
    title: "Started AI Experimentation Journey",
    description: "Began systematic exploration of AI creative tools and documentation of learning process.",
    milestone: false,
    category: "Journey"
  }];


  const templates: Template[] = [
  {
    id: 1,
    name: "Logo Design Workflow",
    description: "Complete workflow for generating professional logos from concept to final delivery.",
    steps: 8,
    downloads: 342,
    category: "Design"
  },
  {
    id: 2,
    name: "Game Asset Pipeline",
    description: "Streamlined process for creating consistent game assets with AI tools.",
    steps: 12,
    downloads: 189,
    category: "Game Dev"
  },
  {
    id: 3,
    name: "Website Mockup Generator",
    description: "Automated workflow for creating responsive website mockups from descriptions.",
    steps: 6,
    downloads: 567,
    category: "Web Design"
  },
  {
    id: 4,
    name: "Social Media Content Creator",
    description: "Batch generate social media graphics with consistent branding and style.",
    steps: 5,
    downloads: 891,
    category: "Marketing"
  },
  {
    id: 5,
    name: "Character Design System",
    description: "Comprehensive workflow for creating character designs with variations and poses.",
    steps: 10,
    downloads: 234,
    category: "Illustration"
  },
  {
    id: 6,
    name: "Prompt Engineering Framework",
    description: "Structured approach to crafting effective prompts for consistent results.",
    steps: 4,
    downloads: 1023,
    category: "Technique"
  }];


  const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "Getting Started with AI Logo Design",
    duration: "15:32",
    views: 12453,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1648a0017-1765109667716.png",
    alt: "Video thumbnail showing colorful logo designs and AI tool interface",
    category: "Beginner"
  },
  {
    id: 2,
    title: "Advanced Prompt Engineering Techniques",
    duration: "28:47",
    views: 8921,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_10b26706e-1764904722070.png",
    alt: "Video thumbnail with text prompts and AI-generated results comparison",
    category: "Advanced"
  },
  {
    id: 3,
    title: "Creating Game Assets with Stable Diffusion",
    duration: "42:15",
    views: 15678,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1967af0d7-1765109659697.png",
    alt: "Video thumbnail showing game sprite creation process in AI tool",
    category: "Intermediate"
  },
  {
    id: 4,
    title: "Style Transfer for Web Design",
    duration: "19:23",
    views: 6734,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0da80a6-1765109663277.png",
    alt: "Video thumbnail with website mockups before and after style transfer",
    category: "Intermediate"
  },
  {
    id: 5,
    title: "Building Your AI Creative Workflow",
    duration: "35:56",
    views: 11289,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_16f1fa18f-1764663570447.png",
    alt: "Video thumbnail showing workflow diagram and AI tool screenshots",
    category: "Beginner"
  },
  {
    id: 6,
    title: "Mastering MidJourney Parameters",
    duration: "52:18",
    views: 19432,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_14da6feeb-1765109660563.png",
    alt: "Video thumbnail with MidJourney interface and parameter examples",
    category: "Advanced"
  }];


  const handleViewProcessDetails = (id: number) => {
    if (!isHydrated) return;
    alert(`Viewing details for process ${id}. Full process documentation would open here.`);
  };

  const handleLearnMoreTool = (id: number) => {
    if (!isHydrated) return;
    alert(`Learning more about tool ${id}. Detailed tool review and usage guide would open here.`);
  };

  const handleViewExperimentDetails = (id: number) => {
    if (!isHydrated) return;
    alert(`Viewing experiment ${id} full report. Detailed findings and learnings would display here.`);
  };

  const handleDownloadTemplate = (id: number) => {
    if (!isHydrated) return;
    alert(`Downloading template ${id}. Template file would be downloaded to your device.`);
  };

  const handlePlayTutorial = (id: number) => {
    if (!isHydrated) return;
    alert(`Playing tutorial ${id}. Video player would open with full tutorial content.`);
  };

  const categories = ['All', 'Design', 'Game Dev', 'Web Design', 'Marketing', 'Illustration', 'Technique'];

  const filteredProcesses = processes.filter((process) => {
    const matchesDifficulty = selectedDifficulty === 'All' || process.difficulty === selectedDifficulty;
    const matchesSearch = process.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    process.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-card w-64"></div>
            <div className="h-64 bg-card"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) =>
              <div key={i} className="h-96 bg-card"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-card py-16 lg:py-24 border-b-4 border-toxic-lime">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-toxic-lime flex items-center justify-center">
                <Icon name="BeakerIcon" size={32} className="text-primary" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground">
                Creator's Lab
              </h1>
            </div>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Where human creativity meets AI possibility. Explore my creative process, tools, and experiments in AI-assisted creation. Every creation is an experiment, every experiment teaches us something new.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-card border-2 border-toxic-lime">
                <Icon name="SparklesIcon" size={20} className="text-toxic-lime" />
                <span className="text-sm font-bold text-foreground">1,247+ Creations</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-card border-2 border-toxic-magenta">
                <Icon name="BeakerIcon" size={20} className="text-toxic-magenta" />
                <span className="text-sm font-bold text-foreground">89 Experiments</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-card border-2 border-toxic-gold">
                <Icon name="WrenchScrewdriverIcon" size={20} className="text-toxic-gold" />
                <span className="text-sm font-bold text-foreground">24 Tools Mastered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-secondary border-b-2 border-border sticky top-16 z-40">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto py-4">
            {[
            { id: 'processes', label: 'Processes', icon: 'CogIcon' },
            { id: 'tools', label: 'Tools', icon: 'WrenchScrewdriverIcon' },
            { id: 'experiments', label: 'Experiments', icon: 'BeakerIcon' },
            { id: 'timeline', label: 'Timeline', icon: 'ClockIcon' },
            { id: 'templates', label: 'Templates', icon: 'DocumentTextIcon' },
            { id: 'tutorials', label: 'Tutorials', icon: 'PlayIcon' }].
            map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 font-bold text-sm whitespace-nowrap transition-smooth border-2 ${
              activeTab === tab.id ?
              'bg-toxic-lime text-primary border-toxic-lime' : 'bg-card text-text-secondary border-border hover:border-toxic-lime hover:text-foreground'}`
              }>

                <Icon name={tab.icon as any} size={18} />
                <span>{tab.label}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-card border-b-2 border-border py-6">
        <div className="w-full px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search processes, tools, experiments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background text-foreground border-2 border-border focus:border-toxic-lime outline-none transition-smooth" />

              </div>
            </div>
            
            {activeTab === 'processes' &&
            <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-text-secondary">Difficulty:</span>
                {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) =>
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-4 py-2 text-sm font-bold transition-smooth border-2 ${
                selectedDifficulty === level ?
                'bg-toxic-lime text-primary border-toxic-lime' : 'bg-card text-text-secondary border-border hover:border-toxic-lime'}`
                }>

                    {level}
                  </button>
              )}
              </div>
            }
            
            {activeTab === 'templates' &&
            <div className="flex items-center space-x-2 overflow-x-auto">
                <span className="text-sm font-bold text-text-secondary whitespace-nowrap">Category:</span>
                {categories.map((category) =>
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-bold whitespace-nowrap transition-smooth border-2 ${
                selectedCategory === category ?
                'bg-toxic-orange text-primary border-toxic-orange' : 'bg-card text-text-secondary border-border hover:border-toxic-orange'}`
                }>

                    {category}
                  </button>
              )}
              </div>
            }
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 lg:py-16">
        <div className="w-full px-6 lg:px-8">
          {activeTab === 'processes' &&
          <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  Creative Processes
                </h2>
                <span className="text-sm text-text-secondary font-semibold">
                  {filteredProcesses.length} processes
                </span>
              </div>
              
              {filteredProcesses.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProcesses.map((process) =>
              <ProcessCard
                key={process.id}
                process={process}
                onViewDetails={handleViewProcessDetails} />

              )}
                </div> :

            <div className="text-center py-16">
                  <Icon name="MagnifyingGlassIcon" size={48} className="text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">No processes found matching your criteria.</p>
                </div>
            }
            </div>
          }

          {activeTab === 'tools' &&
          <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  AI Tools Arsenal
                </h2>
                <span className="text-sm text-text-secondary font-semibold">
                  {tools.length} tools
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) =>
              <ToolCard
                key={tool.id}
                tool={tool}
                onLearnMore={handleLearnMoreTool} />

              )}
              </div>
            </div>
          }

          {activeTab === 'experiments' &&
          <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  AI Experiments
                </h2>
                <span className="text-sm text-text-secondary font-semibold">
                  {experiments.length} experiments
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experiments.map((experiment) =>
              <ExperimentCard
                key={experiment.id}
                experiment={experiment}
                onViewDetails={handleViewExperimentDetails} />

              )}
              </div>
            </div>
          }

          {activeTab === 'timeline' &&
          <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  Evolution Timeline
                </h2>
                <span className="text-sm text-text-secondary font-semibold">
                  {timeline.length} milestones
                </span>
              </div>
              
              <div className="max-w-4xl">
                {timeline.map((event, index) =>
              <TimelineItem
                key={event.id}
                event={event}
                isLast={index === timeline.length - 1} />

              )}
              </div>
            </div>
          }

          {activeTab === 'templates' &&
          <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  Workflow Templates
                </h2>
                <span className="text-sm text-text-secondary font-semibold">
                  {filteredTemplates.length} templates
                </span>
              </div>
              
              {filteredTemplates.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) =>
              <WorkflowTemplate
                key={template.id}
                template={template}
                onDownload={handleDownloadTemplate} />

              )}
                </div> :

            <div className="text-center py-16">
                  <Icon name="DocumentTextIcon" size={48} className="text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">No templates found matching your criteria.</p>
                </div>
            }
            </div>
          }

          {activeTab === 'tutorials' &&
          <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  Video Tutorials
                </h2>
                <span className="text-sm text-text-secondary font-semibold">
                  {filteredTutorials.length} tutorials
                </span>
              </div>
              
              {filteredTutorials.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutorials.map((tutorial) =>
              <VideoTutorial
                key={tutorial.id}
                tutorial={tutorial}
                onPlay={handlePlayTutorial} />

              )}
                </div> :

            <div className="text-center py-16">
                  <Icon name="PlayIcon" size={48} className="text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">No tutorials found matching your search.</p>
                </div>
            }
            </div>
          }
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-toxic-lime via-toxic-magenta to-toxic-gold py-16 lg:py-24">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-primary mb-6">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-lg text-primary mb-8 opacity-90">
              Join me in exploring the intersection of human creativity and artificial intelligence. Let's create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-toxic-lime font-bold text-lg border-4 border-primary hover:bg-toxic-lime hover:text-primary transition-smooth">
                Explore Gallery
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-primary font-bold text-lg border-4 border-primary hover:bg-primary hover:text-toxic-lime transition-smooth">
                Download Resources
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>);

};

export default CreatorLabInteractive;
