import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Bookmark,
  Calendar,
  Sparkles,
  Share2,
  X,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { BLOG_POSTS, DOCTOR_INFO } from '../../data/doctorData';
import { BlogPost, PageId } from '../../types';
import { BlogArticleModal } from '../BlogArticleModal';

interface BlogPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: PageId) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);

  const categories = [
    'All',
    'Cardiology',
    'Metabolism & Longevity',
    'Lifestyle Medicine',
    'Preventive Care',
  ];

  const handleToggleBookmark = (postId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = showBookmarksOnly ? bookmarkedIds.includes(post.id) : true;
    return matchesCategory && matchesSearch && matchesBookmark;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14">
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Evidence-Based Medical Journal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Clinical Insights & Longevity Notes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Practical takeaways on lipidology, continuous glucose monitoring, circadian biology, and metabolic health written directly by {DOCTOR_INFO.name}.
        </p>
      </div>

      {/* 2. Search & Category Filters Bar */}
      <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          {bookmarkedIds.length > 0 && (
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                showBookmarksOnly
                  ? 'bg-[#b5f63d] text-[#0a2321] font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search topics (e.g. ApoB, Zone 2)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Visual Articles Grid (Cards with Rich Photography, Clean Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => {
          const isBookmarked = bookmarkedIds.includes(post.id);
          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.imageUrl || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold">
                  {post.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleBookmark(post.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isBookmarked ? 'bg-[#b5f63d] text-[#0a2321]' : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Save article'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(post)}
                    className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors cursor-pointer line-clamp-2"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveArticle(post)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No articles matched your criteria</h4>
          <p className="text-xs text-slate-500">Try clearing your search query or selecting "All".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setShowBookmarksOnly(false);
            }}
            className="px-4 py-2 rounded-full bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Article Reader Modal */}
      <BlogArticleModal
        post={activeArticle}
        onClose={() => setActiveArticle(null)}
        onBookConsultation={() => {
          setActiveArticle(null);
          onOpenBooking();
        }}
        isBookmarked={activeArticle ? bookmarkedIds.includes(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
};
