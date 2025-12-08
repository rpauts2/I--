'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import CategoryFilter from './CategoryFilter';
import ToolFilter from './ToolFilter';
import ComplexityFilter from './ComplexityFilter';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import ProjectCard from './ProjectCard';
import ProjectLightbox from './ProjectLightbox';
import ImageUploader from './ImageUploader';


interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface Tool {
  id: string;
  name: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: string;
  tool: string;
  complexity: string;
  date: string;
  tags: string[];
  views: number;
  likes: number;
  fullDescription: string;
}

const GalleryInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayCount, setDisplayCount] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const categories: Category[] = [
  { id: 'logos', name: 'Logos & Branding', icon: 'SparklesIcon', count: 24 },
  { id: 'games', name: 'Interactive Games', icon: 'PuzzlePieceIcon', count: 18 },
  { id: 'websites', name: 'Web Designs', icon: 'GlobeAltIcon', count: 32 },
  { id: 'art', name: 'Digital Art', icon: 'PaintBrushIcon', count: 45 },
  { id: 'experiments', name: 'Experiments', icon: 'BeakerIcon', count: 27 },
  { id: 'animations', name: 'Animations', icon: 'FilmIcon', count: 15 },
  { id: 'ui-ux', name: 'UI/UX Design', icon: 'DevicePhoneMobileIcon', count: 21 },
  { id: 'illustrations', name: 'Illustrations', icon: 'PhotoIcon', count: 38 }];


  const tools: Tool[] = [
  { id: 'midjourney', name: 'Midjourney', color: '#32CD32' },
  { id: 'dalle', name: 'DALL-E 3', color: '#FF1493' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', color: '#FFD700' },
  { id: 'chatgpt', name: 'ChatGPT', color: '#FF4500' },
  { id: 'runway', name: 'Runway ML', color: '#00CED1' },
  { id: 'figma-ai', name: 'Figma AI', color: '#9370DB' }];


  const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk Logo',
    description: 'Futuristic logo design with toxic color palette and glitch effects',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_145a39b50-1765109662146.png",
    alt: 'Vibrant neon cyberpunk logo with electric lime and hot magenta colors featuring glitch effects on dark background',
    category: 'logos',
    tool: 'midjourney',
    complexity: 'advanced',
    date: '05.12.2025',
    tags: ['cyberpunk', 'neon', 'branding', 'futuristic'],
    views: 1247,
    likes: 89,
    fullDescription: `This cyberpunk-inspired logo was created using Midjourney with custom prompts focusing on toxic color palettes and glitch aesthetics. The design process involved multiple iterations to achieve the perfect balance between readability and visual impact.\n\nThe logo features electric lime (#32CD32) as the primary color with hot magenta (#FF1493) accents, creating a striking contrast against the dark background. Glitch effects were added in post-processing to enhance the futuristic feel.`
  },
  {
    id: '2',
    title: 'AI Memory Game',
    description: 'Interactive card matching game with AI-generated artwork',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_118f89cbe-1764674284538.png",
    alt: 'Colorful memory card game interface with AI-generated abstract patterns on each card arranged in grid layout',
    category: 'games',
    tool: 'dalle',
    complexity: 'intermediate',
    date: '03.12.2025',
    tags: ['game', 'interactive', 'memory', 'cards'],
    views: 892,
    likes: 67,
    fullDescription: `An engaging memory card game featuring unique AI-generated artwork on each card. Built with vanilla JavaScript and enhanced with smooth animations.\n\nEach card design was generated using DALL-E 3 with specific prompts to create cohesive yet distinct patterns. The game includes difficulty levels, score tracking, and responsive design for all devices.`
  },
  {
    id: '3',
    title: 'Portfolio Website Redesign',
    description: 'Modern portfolio site with brutalist design and toxic accents',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d843f97-1764655131620.png",
    alt: 'Modern brutalist website design mockup showing bold typography and toxic lime green accents on dark interface',
    category: 'websites',
    tool: 'figma-ai',
    complexity: 'advanced',
    date: '01.12.2025',
    tags: ['web-design', 'portfolio', 'brutalist', 'modern'],
    views: 2134,
    likes: 156,
    fullDescription: `A complete portfolio website redesign embracing brutalist aesthetics with toxic color accents. The design focuses on bold typography, sharp edges, and high-contrast color combinations.\n\nFigma AI was used to generate layout variations and color scheme suggestions. The final design features electric lime CTAs, hot magenta highlights, and a dark base for maximum impact.`
  },
  {
    id: '4',
    title: 'Abstract Digital Landscape',
    description: 'Surreal landscape combining organic and geometric elements',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_106584dfb-1764689812608.png",
    alt: 'Surreal digital landscape artwork featuring floating geometric shapes and organic forms in vibrant toxic colors',
    category: 'art',
    tool: 'midjourney',
    complexity: 'experimental',
    date: '30.11.2025',
    tags: ['abstract', 'landscape', 'surreal', 'experimental'],
    views: 3421,
    likes: 234,
    fullDescription: `An experimental piece exploring the boundaries between organic and geometric forms in a surreal landscape setting. Created through iterative prompting and style mixing in Midjourney.\n\nThe artwork features floating geometric structures integrated with flowing organic elements, all rendered in the signature toxic color palette. Multiple generation passes were combined to achieve the final composition.`
  },
  {
    id: '5',
    title: 'Neural Network Visualization',
    description: 'Interactive visualization of AI decision-making process',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_113c8f6f0-1764648553585.png",
    alt: 'Interactive neural network visualization showing interconnected nodes with glowing connections in toxic lime and magenta',
    category: 'experiments',
    tool: 'chatgpt',
    complexity: 'advanced',
    date: '28.11.2025',
    tags: ['neural-network', 'visualization', 'interactive', 'ai'],
    views: 1876,
    likes: 142,
    fullDescription: `An interactive experiment visualizing how neural networks process information and make decisions. Built with JavaScript and enhanced with AI-generated explanations.\n\nChatGPT was used to generate the educational content and code structure, while the visual design incorporates toxic colors to highlight active neural pathways. Users can interact with the network to see real-time decision-making.`
  },
  {
    id: '6',
    title: 'Morphing Logo Animation',
    description: 'Smooth shape-shifting logo animation with glitch transitions',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c2178b4-1765109668383.png",
    alt: 'Animated logo sequence showing smooth morphing transitions between different geometric shapes with neon glow effects',
    category: 'animations',
    tool: 'runway',
    complexity: 'advanced',
    date: '26.11.2025',
    tags: ['animation', 'logo', 'motion', 'glitch'],
    views: 1543,
    likes: 118,
    fullDescription: `A mesmerizing logo animation featuring smooth morphing transitions between geometric shapes with integrated glitch effects. Created using Runway ML's motion tools.\n\nThe animation cycles through multiple logo variations, each transition enhanced with toxic color shifts and digital glitch artifacts. Perfect for brand intros and loading screens.`
  },
  {
    id: '7',
    title: 'Mobile App UI Kit',
    description: 'Complete UI kit with dark mode and toxic accent colors',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc0f48f3-1764661700984.png",
    alt: 'Mobile app UI kit showcase displaying multiple screens with dark theme and toxic lime accent buttons',
    category: 'ui-ux',
    tool: 'figma-ai',
    complexity: 'intermediate',
    date: '24.11.2025',
    tags: ['ui-kit', 'mobile', 'dark-mode', 'design-system'],
    views: 2987,
    likes: 201,
    fullDescription: `A comprehensive mobile UI kit featuring dark mode design with toxic color accents. Includes 50+ screens covering common app patterns and interactions.\n\nFigma AI assisted in generating component variations and ensuring design consistency. The kit features electric lime CTAs, hot magenta alerts, and cyber gold highlights throughout.`
  },
  {
    id: '8',
    title: 'Character Illustration Series',
    description: 'Cyberpunk character designs with unique toxic aesthetics',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_174669be9-1764677206555.png",
    alt: 'Cyberpunk character illustration featuring futuristic outfit with neon accents and toxic color scheme',
    category: 'illustrations',
    tool: 'stable-diffusion',
    complexity: 'advanced',
    date: '22.11.2025',
    tags: ['character', 'cyberpunk', 'illustration', 'series'],
    views: 4123,
    likes: 312,
    fullDescription: `A series of cyberpunk character illustrations exploring toxic aesthetics and futuristic fashion. Each character was generated using Stable Diffusion with custom LoRA models.\n\nThe series features consistent styling with toxic color palettes, neon accents, and brutalist design elements. Characters include diverse body types and fashion styles within the cyberpunk genre.`
  },
  {
    id: '9',
    title: 'Generative Art Experiment',
    description: 'Algorithm-driven abstract patterns with toxic color schemes',
    image: "https://images.unsplash.com/photo-1731860204028-b4b19d3c2aa7",
    alt: 'Abstract generative art pattern with flowing organic shapes in electric lime and hot magenta gradients',
    category: 'experiments',
    tool: 'stable-diffusion',
    complexity: 'experimental',
    date: '20.11.2025',
    tags: ['generative', 'abstract', 'algorithm', 'patterns'],
    views: 1654,
    likes: 127,
    fullDescription: `An experimental generative art project using custom algorithms to create unique abstract patterns. Each iteration produces completely unique results within defined parameters.\n\nThe algorithm incorporates toxic color palettes and organic flow patterns, generating endless variations. Stable Diffusion was used to enhance and refine the algorithmic outputs.`
  },
  {
    id: '10',
    title: 'E-commerce Landing Page',
    description: 'High-converting product page with bold brutalist design',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19e549b1b-1764651749305.png",
    alt: 'E-commerce landing page mockup with bold typography and toxic lime call-to-action buttons on dark background',
    category: 'websites',
    tool: 'chatgpt',
    complexity: 'intermediate',
    date: '18.11.2025',
    tags: ['e-commerce', 'landing-page', 'conversion', 'brutalist'],
    views: 2456,
    likes: 178,
    fullDescription: `A high-converting e-commerce landing page design featuring brutalist aesthetics and toxic color CTAs. ChatGPT was used to generate compelling copy and optimize conversion elements.\n\nThe design focuses on bold typography, clear hierarchy, and strategic use of toxic lime for primary actions. A/B testing suggestions were AI-generated to maximize conversion rates.`
  },
  {
    id: '11',
    title: 'Puzzle Game Prototype',
    description: 'Physics-based puzzle game with AI-generated level designs',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_114c934cb-1764679078303.png",
    alt: 'Puzzle game interface showing colorful geometric shapes and physics-based challenges with toxic color scheme',
    category: 'games',
    tool: 'chatgpt',
    complexity: 'advanced',
    date: '16.11.2025',
    tags: ['puzzle', 'physics', 'game-design', 'prototype'],
    views: 1234,
    likes: 94,
    fullDescription: `A physics-based puzzle game prototype featuring AI-generated level designs. ChatGPT was used to create level layouts and balance difficulty progression.\n\nThe game mechanics involve manipulating geometric shapes to solve puzzles, with toxic color coding for different element types. Includes 20 AI-designed levels with increasing complexity.`
  },
  {
    id: '12',
    title: 'Kinetic Typography Animation',
    description: 'Dynamic text animation with glitch effects and toxic colors',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1adf5f86d-1764655704801.png",
    alt: 'Kinetic typography animation frame showing dynamic text movement with neon glow and glitch effects',
    category: 'animations',
    tool: 'runway',
    complexity: 'intermediate',
    date: '14.11.2025',
    tags: ['typography', 'kinetic', 'animation', 'motion'],
    views: 1789,
    likes: 136,
    fullDescription: `A kinetic typography animation featuring dynamic text movements, glitch transitions, and toxic color shifts. Created using Runway ML's motion tools and effects.\n\nThe animation showcases various typographic techniques including morphing, splitting, and reassembly, all enhanced with neon glow effects and digital glitches in the signature toxic palette.`
  }];


  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
    prev.includes(categoryId) ?
    prev.filter((id) => id !== categoryId) :
    [...prev, categoryId]
    );
  };

  const handleToolChange = (toolId: string) => {
    setSelectedTools((prev) =>
    prev.includes(toolId) ?
    prev.filter((id) => id !== toolId) :
    [...prev, toolId]
    );
  };

  const handleComplexityChange = (complexity: string) => {
    setSelectedComplexity((prev) =>
    prev.includes(complexity) ?
    prev.filter((c) => c !== complexity) :
    [...prev, complexity]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedTools([]);
    setSelectedComplexity([]);
    setSearchQuery('');
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 12);
  };

  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category);
    const matchesTool = selectedTools.length === 0 || selectedTools.includes(project.tool);
    const matchesComplexity = selectedComplexity.length === 0 || selectedComplexity.includes(project.complexity);
    const matchesSearch = searchQuery === '' ||
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTool && matchesComplexity && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date.split('.').reverse().join('-')).getTime() -
        new Date(a.date.split('.').reverse().join('-')).getTime();
      case 'oldest':
        return new Date(a.date.split('.').reverse().join('-')).getTime() -
        new Date(b.date.split('.').reverse().join('-')).getTime();
      case 'popular':
        return b.views - a.views;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const displayedProjects = sortedProjects.slice(0, displayCount);
  const hasMore = displayCount < sortedProjects.length;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="w-full px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-surface w-1/3"></div>
            <div className="h-64 bg-surface"></div>
          </div>
        </div>
      </div>);

  }

 return (
  <div className="min-h-screen bg-background pt-24 pb-16">
    <div className="w-full px-6 lg:px-8">
      <ImageUploader className="mb-8" />
      {/* Hero Section */}
      <div className="mb-12 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-toxic-lime flex items-center justify-center">
              <Icon name="PhotoIcon" size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground">
                AI Creation Gallery
              </h1>
              <p className="text-text-secondary mt-2">
                Explore {mockProjects.length} AI-generated creations across multiple categories
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-card border-2 border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="SparklesIcon" size={20} className="text-toxic-lime" />
                <span className="text-xs text-text-secondary font-mono">Total Projects</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{mockProjects.length}</span>
            </div>
            <div className="p-4 bg-card border-2 border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TagIcon" size={20} className="text-toxic-gold" />
                <span className="text-xs text-text-secondary font-mono">Categories</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{categories.length}</span>
            </div>
            <div className="p-4 bg-card border-2 border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="WrenchScrewdriverIcon" size={20} className="text-toxic-magenta" />
                <span className="text-xs text-text-secondary font-mono">AI Tools</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{tools.length}</span>
            </div>
            <div className="p-4 bg-card border-2 border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="EyeIcon" size={20} className="text-toxic-orange" />
                <span className="text-xs text-text-secondary font-mono">Total Views</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {mockProjects.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-card text-foreground border-2 border-border hover:border-toxic-lime transition-smooth font-semibold">

              <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-toxic-lime" />
              <span>Filters</span>
            </button>
            <SortDropdown selectedSort={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              onClearAll={handleClearAll} />

            <ToolFilter
              tools={tools}
              selectedTools={selectedTools}
              onToolChange={handleToolChange} />

            <ComplexityFilter
              selectedComplexity={selectedComplexity}
              onComplexityChange={handleComplexityChange} />

          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedTools.length > 0 || selectedComplexity.length > 0 || searchQuery) &&
            <div className="mb-6 p-4 bg-card border-2 border-toxic-lime">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-foreground">Active Filters</span>
                  <button
                  onClick={handleClearAll}
                  className="text-xs text-toxic-magenta hover:text-foreground transition-smooth font-semibold">

                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchQuery &&
                <span className="px-3 py-1 bg-surface text-foreground text-sm font-mono border border-border flex items-center space-x-2">
                      <span>Search: {searchQuery}</span>
                      <button onClick={() => setSearchQuery('')}>
                        <Icon name="XMarkIcon" size={14} className="text-text-secondary hover:text-foreground" />
                      </button>
                    </span>
                }
                  {selectedCategories.map((catId) => {
                  const cat = categories.find((c) => c.id === catId);
                  return cat ?
                  <span key={catId} className="px-3 py-1 bg-surface text-foreground text-sm font-mono border border-border flex items-center space-x-2">
                        <span>{cat.name}</span>
                        <button onClick={() => handleCategoryChange(catId)}>
                          <Icon name="XMarkIcon" size={14} className="text-text-secondary hover:text-foreground" />
                        </button>
                      </span> :
                  null;
                })}
                  {selectedTools.map((toolId) => {
                  const tool = tools.find((t) => t.id === toolId);
                  return tool ?
                  <span key={toolId} className="px-3 py-1 bg-surface text-foreground text-sm font-mono border border-border flex items-center space-x-2">
                        <span>{tool.name}</span>
                        <button onClick={() => handleToolChange(toolId)}>
                          <Icon name="XMarkIcon" size={14} className="text-text-secondary hover:text-foreground" />
                        </button>
                      </span> :
                  null;
                })}
                  {selectedComplexity.map((comp) =>
                <span key={comp} className="px-3 py-1 bg-surface text-foreground text-sm font-mono border border-border flex items-center space-x-2">
                      <span>{comp}</span>
                      <button onClick={() => handleComplexityChange(comp)}>
                        <Icon name="XMarkIcon" size={14} className="text-text-secondary hover:text-foreground" />
                      </button>
                    </span>
                )}
                </div>
              </div>
            }

            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                Showing <span className="font-bold text-foreground">{displayedProjects.length}</span> of{' '}
                <span className="font-bold text-foreground">{sortedProjects.length}</span> projects
              </span>
            </div>

            {/* Projects Masonry Grid */}
            {displayedProjects.length > 0 ?
            <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedProjects.map((project) =>
                <ProjectCard
                  key={project.id}
                  project={project}
                  onProjectClick={setSelectedProject} />

                )}
                </div>

                {/* Load More */}
                {hasMore &&
              <div className="mt-12 text-center">
                    <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-toxic-lime text-primary font-bold text-sm font-cta hover:bg-toxic-gold transition-smooth shadow-toxic-lime hover:shadow-toxic-gold border-2 border-toxic-lime hover:border-toxic-gold inline-flex items-center space-x-2">

                      <Icon name="ArrowDownIcon" size={20} />
                      <span>Load More Projects</span>
                    </button>
                  </div>
              }
              </> :

            <div className="text-center py-16 bg-card border-2 border-border">
                <Icon name="FaceFrownIcon" size={64} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No Projects Found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                onClick={handleClearAll}
                className="px-6 py-2 bg-toxic-lime text-primary font-bold text-sm hover:bg-toxic-gold transition-smooth">

                  Clear All Filters
                </button>
              </div>
            }
          </div>
        </div>
      </div>

      {/* Project Lightbox */}
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)} />

    </div>);

};

export default GalleryInteractive;