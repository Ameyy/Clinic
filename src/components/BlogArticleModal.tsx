import React from 'react';
import { X, Clock, Calendar, Bookmark, Share2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onBookConsultation: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (postId: string) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  post,
  onClose,
  onBookConsultation,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="px-6 py-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(post.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'border-stone-200 text-stone-500 hover:bg-stone-100'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Save article'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-100 transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          
          {/* Article Title & Metadata */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 leading-tight">
              {post.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-2 border-b border-stone-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-serif-display font-bold text-base shadow-xs shrink-0">
                S
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">{post.author.name}</div>
                <div className="text-[11px] text-stone-500 font-medium">
                  {post.author.role} • Published {post.publishedAt}
                </div>
              </div>
            </div>
          </div>

          {/* Key Clinical Takeaways Box */}
          <div className="p-5 rounded-2xl bg-[#0f2b26] text-white space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Physician's Clinical Takeaways</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-50/90">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Narrative Content */}
          <div className="space-y-5 text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Citation & Scientific Guidance Note */}
          {post.citationNote && (
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-700 block">Scientific Reference:</strong>
                <span>{post.citationNote}</span>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* In-Article CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold font-serif-display text-stone-900">
                Discuss Your Biomarkers With {post.author.name}
              </h4>
              <p className="text-xs text-stone-600">
                Personalized testing and preventative protocols available at our Bengaluru clinic or via pan-India telehealth.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="px-5 py-2.5 bg-[#0f2b26] hover:bg-[#18443c] text-white text-xs font-bold rounded-xl shadow-xs shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Schedule Visit</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
