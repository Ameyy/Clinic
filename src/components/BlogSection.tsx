import React, { useState } from 'react';
import { BookOpen, Search, Clock, ArrowRight, Bookmark, Filter, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/doctorData';
import { BlogPost } from '../types';
import { BlogArticleModal } from './BlogArticleModal';

interface BlogSectionProps {
  onBookConsultation: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onBookConsultation }) => {
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

  // Filtering
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = showBookmarksOnly ? bookmarkedIds.includes(post.id) : true;
    return matchesCategory && matchesSearch && matchesBookmark;
  });

  const featuredPost = BLOG_POSTS[0];
  const isDisplayingAll = selectedCategory === 'All' && !searchQuery && !showBookmarksOnly;

  return (
    <section id="blog" className="py-16 sm:py-24 bg-[#fafbfa] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subhead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Evidence-Based Health Journal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
              Clinical Insights & Longevity Notes
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Dr. Vance's clinical essays on lipidology, continuous glucose monitoring, circadian rhythm alignment, and midlife endocrine health.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 self-start md:self-auto">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, labs, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Tabs & Bookmark Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200/80 mb-10">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0f2b26] text-white shadow-xs'
                    : 'bg-stone-100/90 text-stone-600 hover:bg-stone-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bookmarks Toggle Pill */}
          <button
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              showBookmarksOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
            <span>Saved Reads ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* FEATURED LEAD STORY (when viewing all & no search query) */}
        {isDisplayingAll && featuredPost && (
          <div className="mb-12">
            <div
              onClick={() => setActiveArticle(featuredPost)}
              className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-700/60 p-6 sm:p-8 cursor-pointer transition-all hover:shadow-lg group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured Essay
                  </span>
                  <span className="text-xs text-stone-400 font-medium">•</span>
                  <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">•</span>
                  <span className="text-xs text-stone-500 font-medium">{featuredPost.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 group-hover:text-emerald-950 transition-colors leading-tight">
                  {featuredPost.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-serif-display text-xs font-bold">
                      V
                    </div>
                    <span className="text-xs font-bold text-stone-800">{featuredPost.author.name}</span>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Essay</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Lead Story Highlight Box */}
              <div className="lg:col-span-5 bg-[#0f2b26] text-white rounded-xl p-5 sm:p-6 space-y-3">
                <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  Inside This Clinical Protocol
                </div>
                <ul className="space-y-2 text-xs text-emerald-100/90">
                  {featuredPost.keyTakeaways.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 text-[10px] text-emerald-200/60 border-t border-emerald-800/60">
                  Click card to read complete guidance and citations.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESPONSIVE ARTICLES GRID */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-stone-800">No articles matched your filter</h4>
            <p className="text-xs text-stone-500 mt-1">Try clearing your search terms or selecting another category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setShowBookmarksOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const isSaved = bookmarkedIds.includes(post.id);
              return (
                <article
                  key={post.id}
                  onClick={() => setActiveArticle(post)}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-700/60 p-6 flex flex-col justify-between transition-all hover:shadow-md cursor-pointer group"
                >
                  <div className="space-y-3">
                    {/* Header info */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleBookmark(post.id);
                          }}
                          className={`p-1 text-stone-400 hover:text-emerald-800 transition-colors ${
                            isSaved ? 'text-emerald-800' : ''
                          }`}
                          title={isSaved ? 'Remove bookmark' : 'Bookmark article'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold font-serif-display text-stone-900 group-hover:text-emerald-950 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer & Read Link */}
                  <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-400 font-medium">{post.publishedAt}</span>
                    <span className="font-semibold text-emerald-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      <BlogArticleModal
        post={activeArticle}
        onClose={() => setActiveArticle(null)}
        onBookConsultation={() => {
          setActiveArticle(null);
          onBookConsultation();
        }}
        isBookmarked={activeArticle ? bookmarkedIds.includes(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </section>
  );
};
