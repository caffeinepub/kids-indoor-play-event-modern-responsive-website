import React from 'react';
import { BookOpen, PenTool, Edit3, Save, Plus, Tag, Trash2, Camera, Upload, CheckCircle, Zap, Sparkles, Heart } from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  publishDate: string;
  seoTitle?: string;
  seoDescription?: string;
  timestamp: bigint;
}

interface BlogTabProps {
  blogForm: Partial<BlogArticle>;
  setBlogForm: (form: Partial<BlogArticle>) => void;
  blogArticles: BlogArticle[];
  blogCategories: Array<{ value: string; label: string; icon: string; color: string }>;
  newTag: string;
  setNewTag: (tag: string) => void;
  isEditingArticle: boolean;
  saveBlogArticleMutation: any;
  deleteBlogArticleMutation: any;
  handleEditArticle: (article: BlogArticle) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  resetBlogForm: () => void;
  handleFeaturedImageUpload: (file: File) => void;
  formatDate: (timestamp: bigint) => string;
}

const BlogTab: React.FC<BlogTabProps> = ({
  blogForm,
  setBlogForm,
  blogArticles,
  blogCategories,
  newTag,
  setNewTag,
  isEditingArticle,
  saveBlogArticleMutation,
  deleteBlogArticleMutation,
  handleEditArticle,
  handleAddTag,
  handleRemoveTag,
  resetBlogForm,
  handleFeaturedImageUpload,
  formatDate
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-emerald-200">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 flex items-center">
        <BookOpen className="w-8 h-8 mr-3 text-emerald-600" />
        News Articles & Parent Resources Management
      </h3>

      {/* Enhanced Introduction */}
      <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
        <div className="flex items-start">
          <PenTool className="w-8 h-8 text-emerald-600 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-semibold text-emerald-900 mb-3">✍️ Create Engaging Content for Parents</h4>
            <div className="space-y-2 text-sm text-emerald-800">
              <p><strong>📝 Share valuable insights:</strong> Create articles about parenting tips, child development, and family activities</p>
              <p><strong>🎯 Build community:</strong> Connect with parents through helpful resources and local event information</p>
              <p><strong>📈 Boost SEO:</strong> Regular content helps families find your indoor playground online</p>
              <p><strong>🎉 Showcase expertise:</strong> Position yourself as a trusted resource for Oklahoma City families</p>
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>💡 Content Ideas:</strong> Birthday party planning tips, indoor play benefits, safety guidelines, local family events, seasonal activities, and developmental milestones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Blog Article Form */}
      <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <Edit3 className="w-5 h-5 mr-2" />
            {isEditingArticle ? '✏️ Edit Article' : '📝 Create New Article'}
          </h4>
          {isEditingArticle && (
            <button
              onClick={resetBlogForm}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center"
            >
              <Zap className="w-4 h-4 mr-1" />
              Cancel Edit
            </button>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveBlogArticleMutation.mutate(blogForm);
          }}
          className="space-y-6"
        >
          {/* Title and SEO Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Article Title *
              </label>
              <input
                type="text"
                value={blogForm.title || ''}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter an engaging article title"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{blogForm.title?.length || 0}/100 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 SEO Title (Optional)
              </label>
              <input
                type="text"
                value={blogForm.seoTitle || ''}
                onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="SEO optimized title"
              />
              <p className="text-xs text-gray-500 mt-1">{blogForm.seoTitle?.length || 0}/60 characters</p>
            </div>
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📂 Category *
              </label>
              <select
                value={blogForm.category || 'parenting-tips'}
                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              >
                {blogCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Status *
              </label>
              <select
                value={blogForm.status || 'draft'}
                onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as 'draft' | 'published' })}
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              >
                <option value="draft">📝 Draft</option>
                <option value="published">🌟 Published</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📄 Article Excerpt *
            </label>
            <textarea
              value={blogForm.excerpt || ''}
              onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Brief summary of the article (shown in article previews)"
              required
            />
            <p className="text-xs text-gray-500 mt-1">{blogForm.excerpt?.length || 0}/200 characters</p>
          </div>

          {/* Enhanced Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 Article Content *
            </label>
            <textarea
              value={blogForm.content || ''}
              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-sm"
              placeholder="Write your article content here. You can use HTML tags for formatting..."
              required
            />
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800 mb-2">
                <strong>💡 HTML Formatting Tips:</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-700">
                <div>
                  <p><code>&lt;h2&gt;Section Heading&lt;/h2&gt;</code></p>
                  <p><code>&lt;h3&gt;Subsection&lt;/h3&gt;</code></p>
                  <p><code>&lt;p&gt;Paragraph text&lt;/p&gt;</code></p>
                  <p><code>&lt;strong&gt;Bold text&lt;/strong&gt;</code></p>
                </div>
                <div>
                  <p><code>&lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;</code></p>
                  <p><code>&lt;a href="url"&gt;Link&lt;/a&gt;</code></p>
                  <p><code>&lt;em&gt;Italic text&lt;/em&gt;</code></p>
                  <p><code>&lt;br&gt;</code> for line breaks</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 SEO Description (Optional)
            </label>
            <textarea
              value={blogForm.seoDescription || ''}
              onChange={(e) => setBlogForm({ ...blogForm, seoDescription: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="SEO meta description for search engines"
            />
            <p className="text-xs text-gray-500 mt-1">{blogForm.seoDescription?.length || 0}/160 characters</p>
          </div>

          {/* Enhanced Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏷️ Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {blogForm.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Add a tag (e.g., parenting, safety, fun)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
          </div>

          {/* Featured Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🖼️ Featured Image (Optional)
            </label>
            <div className="border-2 border-dashed border-emerald-300 rounded-xl p-4 text-center">
              {blogForm.featuredImage ? (
                <div className="space-y-2">
                  <p className="text-sm text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    ✅ Featured image uploaded
                  </p>
                  <p className="text-xs text-gray-500">{blogForm.featuredImage}</p>
                  <button
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, featuredImage: undefined })}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <Camera className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">Upload featured image for article</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFeaturedImageUpload(file);
                      }
                    }}
                    className="hidden"
                    id="featured-image-upload"
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-all cursor-pointer inline-flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Image
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={saveBlogArticleMutation.isPending}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:from-emerald-300 disabled:to-teal-300 transition-all flex items-center shadow-lg transform hover:scale-105"
            >
              {saveBlogArticleMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isEditingArticle ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  {isEditingArticle ? 'Update Article' : 'Create Article'}
                </>
              )}
            </button>
            
            {blogForm.status === 'published' && (
              <div className="flex items-center text-sm text-emerald-600">
                <Sparkles className="w-4 h-4 mr-1" />
                Will be published immediately
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Enhanced Existing Articles */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            📚 Your Articles ({blogArticles.length})
          </h4>
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center text-green-600">
              <Sparkles className="w-4 h-4 mr-1" />
              {blogArticles.filter(a => a.status === 'published').length} Published
            </span>
            <span className="flex items-center text-yellow-600">
              <Edit3 className="w-4 h-4 mr-1" />
              {blogArticles.filter(a => a.status === 'draft').length} Drafts
            </span>
          </div>
        </div>
        
        {blogArticles.length > 0 ? (
          <div className="space-y-4">
            {blogArticles.map((article) => {
              const categoryInfo = blogCategories.find(cat => cat.value === article.category);
              return (
                <div key={article.id} className="border-2 border-emerald-200 rounded-xl p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-semibold text-gray-900">{article.title}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status === 'published' ? '🌟 Published' : '📝 Draft'}
                        </span>
                        {categoryInfo && (
                          <span className={`px-2 py-1 rounded-full text-xs ${categoryInfo.color}`}>
                            {categoryInfo.icon} {categoryInfo.label}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-gray-500">+{article.tags.length - 3} more</span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <span className="flex items-center">
                          📅 {formatDate(article.timestamp)}
                        </span>
                        {article.publishDate && (
                          <span className="flex items-center">
                            🌐 Published: {new Date(article.publishDate).toLocaleDateString()}
                          </span>
                        )}
                        <span className="flex items-center">
                          📖 ~{Math.ceil(article.content.length / 200)} min read
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-all flex items-center"
                        title="Edit article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this article?')) {
                            deleteBlogArticleMutation.mutate(article.id);
                          }
                        }}
                        disabled={deleteBlogArticleMutation.isPending}
                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-100 transition-all flex items-center"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No articles created yet</p>
            <p className="text-sm text-gray-400">Use the form above to create your first article!</p>
            <div className="mt-4 flex justify-center space-x-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-float" />
              <Heart className="w-6 h-6 text-red-500 animate-float" style={{ animationDelay: '0.2s' }} />
              <Sparkles className="w-6 h-6 text-blue-500 animate-float" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTab;
