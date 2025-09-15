<template>
  <div class="admin-page">
    <!-- Authentication Section -->
    <div v-if="!isAuthenticated" class="auth-section">
      <div class="auth-container">
        <h1 class="auth-title">Admin Access</h1>
        <p class="auth-subtitle">Enter your credentials to manage resources</p>
        
        <form @submit.prevent="authenticate" class="auth-form">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="credentials.username"
              class="form-input"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="credentials.password"
              class="form-input"
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" class="btn btn-primary btn-md auth-btn" :disabled="submitting">
            <i class="fa-solid fa-lock"></i>
            Login
          </button>
        </form>
        
        <div v-if="authError" class="auth-error">
          <i class="fa-solid fa-exclamation-triangle"></i>
          {{ authError }}
        </div>
      </div>
    </div>

    <!-- Admin Dashboard -->
    <div v-else class="admin-dashboard">
      <!-- Selection Tabs -->
      <div class="admin-tabs">
        <!-- <button :class="['tab-btn', { active: adminTab === 'blogs' }]" @click="adminTab = 'blogs'">Manage Blogs</button> -->
        <button :class="['tab-btn', { active: adminTab === 'resources' }]" @click="adminTab = 'resources'">Manage Resources</button>
      </div>

      <!-- Blog Management Section -->
      <!-- <div v-if="adminTab === 'blogs'">
        <div class="admin-header">
          <h1 class="dashboard-title">Blog Management</h1>
          <button @click="logout" class="btn btn-tertiary btn-sm logout-btn">
            <i class="fa-solid fa-sign-out-alt"></i>
            Logout
          </button>
        </div>

        <div class="blog-form-section">
          <h2 class="section-title">{{ editingBlogId ? 'Edit Blog' : 'Add New Blog' }}</h2>
          <form @submit.prevent="editingBlogId ? updateBlog() : addBlog()" class="blog-form">
            <div class="form-row">
              <div class="form-group">
                <label for="blogTitle" class="form-label">Title *</label>
                <input type="text" id="blogTitle" v-model="blogForm.title" class="form-input" placeholder="Blog Title" required />
              </div>
              <div class="form-group">
                <label for="blogAuthor" class="form-label">Author *</label>
                <input type="text" id="blogAuthor" v-model="blogForm.author" class="form-input" placeholder="Author Name" required />
              </div>
            </div>
            <div class="form-group">
              <label for="blogContent" class="form-label">Content *</label>
              <textarea id="blogContent" v-model="blogForm.content" class="form-textarea" placeholder="Blog content..." rows="6" required></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="blogTags" class="form-label">Tags (comma-separated)</label>
                <input type="text" id="blogTags" v-model="blogForm.tagsInput" class="form-input" placeholder="e.g., Vue, Firebase, Portfolio" />
              </div>
              <div class="form-group">
                <label for="blogImageUrl" class="form-label">Image URL</label>
                <input type="url" id="blogImageUrl" v-model="blogForm.imageUrl" class="form-input" placeholder="https://example.com/image.jpg" />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-md" :disabled="blogSubmitting">
                <i v-if="blogSubmitting" class="fa-solid fa-spinner fa-spin"></i>
                <i v-else :class="editingBlogId ? 'fa-solid fa-save' : 'fa-solid fa-plus'"></i>
                {{ blogSubmitting ? (editingBlogId ? 'Saving...' : 'Adding...') : (editingBlogId ? 'Save Changes' : 'Add Blog') }}
              </button>
              <button type="button" @click="resetBlogForm" class="btn btn-tertiary btn-md">
                <i class="fa-solid fa-undo"></i>
                Reset Form
              </button>
            </div>
          </form>
          <div v-if="blogMessage" :class="['message', blogMessageType]">
            <i :class="blogMessageIcon"></i>
            {{ blogMessage }}
          </div>
        </div>

        <div class="recent-blogs-section">
          <h2 class="section-title">Recent Blogs</h2>
          <div class="recent-blogs">
            <div v-for="blog in recentBlogs" :key="blog.id" class="recent-blog-item">
              <div class="blog-info">
                <div class="blog-details">
                  <h3 class="blog-title">{{ blog.title }}</h3>
                  <p class="blog-meta">By {{ blog.author }} | {{ formatDate(blog.date) }}</p>
                  <p class="blog-tags">Tags: <span v-for="tag in blog.tags" :key="tag" class="blog-tag">{{ tag }}</span></p>
                  <p class="blog-content-preview">{{ blog.content.slice(0, 120) }}<span v-if="blog.content.length > 120">...</span></p>
                </div>
                <div v-if="blog.imageUrl" class="blog-image-preview">
                  <img :src="blog.imageUrl" alt="Blog cover" style="max-width: 120px; max-height: 80px; border-radius: 0.25rem;" />
                </div>
              </div>
              <div class="blog-actions">
                <button @click="editBlog(blog)" class="btn btn-secondary btn-sm">
                  <i class="fa-solid fa-edit"></i>
                </button>
                <button @click="deleteBlog(blog.id)" class="btn btn-primary btn-sm">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Resource Management Section -->
      <div v-if="adminTab === 'resources'">
        <!-- Header -->
        <div class="admin-header">
          <h1 class="dashboard-title">Resource Management</h1>
          <button @click="logout" class="btn btn-tertiary btn-sm logout-btn">
            <i class="fa-solid fa-sign-out-alt"></i>
            Logout
          </button>
        </div>

        <!-- Add Category Form Section -->
        <div class="category-form-section">
          <h2 class="section-title">Add New Category</h2>
          
          <form @submit.prevent="addCategory" class="category-form">
            <div class="form-row">
              <div class="form-group">
                <label for="categoryId" class="form-label">Category ID *</label>
                <input
                  type="text"
                  id="categoryId"
                  v-model="newCategory.id"
                  class="form-input"
                  placeholder="e.g., developmentTools"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="categoryName" class="form-label">Category Name *</label>
                <input
                  type="text"
                  id="categoryName"
                  v-model="newCategory.name"
                  class="form-input"
                  placeholder="e.g., Development Tools"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="categoryIcon" class="form-label">Icon (Emoji)</label>
              <input
                type="text"
                id="categoryIcon"
                v-model="newCategory.icon"
                class="form-input"
                placeholder="e.g., 🛠️"
                maxlength="2"
              />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-md" :disabled="submittingCategory">
                <i v-if="submittingCategory" class="fa-solid fa-spinner fa-spin"></i>
                <i v-else class="fa-solid fa-plus"></i>
                {{ submittingCategory ? 'Adding...' : 'Add Category' }}
              </button>
              <button type="button" @click="resetCategoryForm" class="btn btn-tertiary btn-md">
                <i class="fa-solid fa-undo"></i>
                Reset Form
              </button>
            </div>
          </form>

          <!-- Success/Error Messages -->
          <div v-if="categoryMessage" :class="['message', categoryMessageType]">
            <i :class="categoryMessageIcon"></i>
            {{ categoryMessage }}
          </div>
        </div>

        <!-- Recent Categories -->
        <div class="recent-categories-section">
          <h2 class="section-title">Existing Categories</h2>
          <div class="recent-categories">
            <div v-for="category in categories" :key="category.id" class="recent-category-item">
              <div class="category-info">
                <div class="category-icon">{{ category.icon || '📁' }}</div>
                <div class="category-details">
                  <h3 class="category-name">{{ category.name }}</h3>
                  <p class="category-id">ID: {{ category.id }}</p>
                </div>
              </div>
              <div class="category-actions">
                <button @click="editCategory(category)" class="btn btn-secondary btn-sm">
                  <i class="fa-solid fa-edit"></i>
                </button>
                <button @click="deleteCategory(category.id)" class="btn btn-primary btn-sm">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Resource Form -->
        <div class="resource-form-section">
          <h2 class="section-title">Add New Resource</h2>
          
          <form @submit.prevent="addResource" class="resource-form">
            <div class="form-row">
              <div class="form-group">
                <label for="resourceName" class="form-label">Resource Name *</label>
                <input
                  type="text"
                  id="resourceName"
                  v-model="newResource.name"
                  class="form-input"
                  placeholder="e.g., VS Code"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="resourceIcon" class="form-label">Icon (Emoji)</label>
                <input
                  type="text"
                  id="resourceIcon"
                  v-model="newResource.icon"
                  class="form-input"
                  placeholder="e.g., 💻"
                  maxlength="2"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="resourceDescription" class="form-label">Description *</label>
              <textarea
                id="resourceDescription"
                v-model="newResource.description"
                class="form-textarea"
                placeholder="Brief description of the resource..."
                rows="3"
                required
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="resourceCategory" class="form-label">Category *</label>
                <select
                  id="resourceCategory"
                  v-model="newResource.category"
                  class="form-select"
                  required
                >
                  <option value="">Select a category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="resourceUrl" class="form-label">URL *</label>
                <input
                  type="url"
                  id="resourceUrl"
                  v-model="newResource.url"
                  class="form-input"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="resourceTags" class="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                id="resourceTags"
                v-model="newResource.tagsInput"
                class="form-input"
                placeholder="e.g., Free, JavaScript, Frontend"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Features</label>
                <div class="checkbox-group">
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="newResource.tutorial" />
                    <span class="checkbox-label">Has Tutorial</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="newResource.examples" />
                    <span class="checkbox-label">Has Examples</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="newResource.free" />
                    <span class="checkbox-label">Free</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="newResource.featured" />
                    <span class="checkbox-label">Featured</span>
                  </label>
                </div>
              </div>
              
              <div class="form-group">
                <label for="resourcePricing" class="form-label">Pricing Info</label>
                <input
                  type="text"
                  id="resourcePricing"
                  v-model="newResource.pricing"
                  class="form-input"
                  placeholder="e.g., Free + Paid"
                />
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-md" :disabled="submitting">
                <i v-if="submitting" class="fa-solid fa-spinner fa-spin"></i>
                <i v-else class="fa-solid fa-plus"></i>
                {{ submitting ? 'Adding...' : 'Add Resource' }}
              </button>
              <button type="button" @click="resetForm" class="btn btn-tertiary btn-md">
                <i class="fa-solid fa-undo"></i>
                Reset Form
              </button>
            </div>
          </form>

          <!-- Success/Error Messages -->
          <div v-if="message" :class="['message', messageType]">
            <i :class="messageIcon"></i>
            {{ message }}
          </div>
        </div>

        <!-- Recent Resources -->
        <div class="recent-resources-section">
          <h2 class="section-title">Recent Resources</h2>
          <div class="recent-resources">
            <div v-for="resource in recentResources" :key="resource.id" class="recent-resource-item">
              <div class="resource-info">
                <div class="resource-icon">{{ resource.icon }}</div>
                <div class="resource-details">
                  <h3 class="resource-name">{{ resource.name }}</h3>
                  <p class="resource-category">{{ getCategoryName(resource.category) }}</p>
                  <p class="resource-description">{{ resource.description }}</p>
                </div>
              </div>
              <div class="resource-actions">
                <button @click="editResource(resource)" class="btn btn-secondary btn-sm">
                  <i class="fa-solid fa-edit"></i>
                </button>
                <button @click="deleteResource(resource.id)" class="btn btn-primary btn-sm">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourcesService } from '../services/resourcesService.js';
// import { blogService } from '../services/blogService.js';

export default {
  name: 'Admin',
  data() {
    return {
      isAuthenticated: false,
      credentials: {
        username: '',
        password: ''
      },
      authError: '',
      categories: [],
      recentResources: [],
      submitting: false,
      message: '',
      messageType: 'success',
      newResource: {
        name: '',
        description: '',
        icon: '',
        category: '',
        url: '',
        tagsInput: '',
        tutorial: false,
        examples: false,
        free: false,
        featured: false,
        pricing: ''
      },
      newCategory: {
        id: '',
        name: '',
        icon: ''
      },
      categoryMessage: '',
      categoryMessageType: 'success',
      submittingCategory: false,
      adminTab: 'resources',
      // recentBlogs: [],
      // blogForm: {
      //   title: '',
      //   content: '',
      //   author: '',
      //   tagsInput: '',
      //   imageUrl: ''
      // },
      // editingBlogId: null,
      // blogSubmitting: false,
      // blogMessage: '',
      // blogMessageType: 'success',
    };
  },
  async mounted() {
    // Check if already authenticated
    const authToken = localStorage.getItem('adminAuth');
    if (authToken) {
      this.isAuthenticated = true;
      await this.loadData();
      // await this.loadBlogs();
    }
  },
  methods: {
    authenticate() {
      // Simple authentication - you should replace this with proper auth
      const validUsername = 'admin';
      const validPassword = 'ricardo2024';
      
      if (this.credentials.username === validUsername && 
          this.credentials.password === validPassword) {
        this.isAuthenticated = true;
        localStorage.setItem('adminAuth', 'true');
        this.authError = '';
        this.loadData();
      } else {
        this.authError = 'Invalid credentials. Please try again.';
      }
    },
    
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('adminAuth');
      this.credentials = { username: '', password: '' };
      this.authError = '';
    },
    
    async loadData() {
      try {
        const [categoriesData, resourcesData] = await Promise.all([
          resourcesService.getCategories(),
          resourcesService.getAllResources()
        ]);
        
        this.categories = categoriesData;
        this.recentResources = resourcesData.slice(0, 5); // Show last 5
        // await this.loadBlogs();
      } catch (error) {
        this.showMessage('Failed to load data', 'error');
      }
    },
    
    // async loadBlogs() {
    //   try {
    //     const blogs = await blogService.getAllBlogs();
    //     this.recentBlogs = blogs.slice(0, 5); // Show last 5
    //   } catch (error) {
    //     this.showBlogMessage('Failed to load blogs', 'error');
    //   }
    // },
    
    async addResource() {
      this.submitting = true;
      
      try {
        // Process tags
        const tags = this.newResource.tagsInput
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);
        
        const resourceData = {
          name: this.newResource.name,
          description: this.newResource.description,
          icon: this.newResource.icon || '🔗',
          category: this.newResource.category,
          url: this.newResource.url,
          tags: tags,
          tutorial: this.newResource.tutorial,
          examples: this.newResource.examples,
          free: this.newResource.free,
          featured: this.newResource.featured,
          pricing: this.newResource.pricing || null
        };
        
        await resourcesService.addResource(resourceData);
        this.showMessage('Resource added successfully!', 'success');
        this.resetForm();
        await this.loadData(); // Refresh recent resources
      } catch (error) {
        this.showMessage('Failed to add resource: ' + error.message, 'error');
      } finally {
        this.submitting = false;
      }
    },
    
    resetForm() {
      this.newResource = {
        name: '',
        description: '',
        icon: '',
        category: '',
        url: '',
        tagsInput: '',
        tutorial: false,
        examples: false,
        free: false,
        featured: false,
        pricing: ''
      };
      this.message = '';
    },
    
    async deleteResource(id) {
      if (confirm('Are you sure you want to delete this resource?')) {
        try {
          await resourcesService.deleteResource(id);
          this.showMessage('Resource deleted successfully!', 'success');
          await this.loadData();
        } catch (error) {
          this.showMessage('Failed to delete resource: ' + error.message, 'error');
        }
      }
    },
    
    editResource(resource) {
      // Populate form with resource data for editing
      this.newResource = {
        name: resource.name,
        description: resource.description,
        icon: resource.icon,
        category: resource.category,
        url: resource.url,
        tagsInput: resource.tags ? resource.tags.join(', ') : '',
        tutorial: resource.tutorial || false,
        examples: resource.examples || false,
        free: resource.free || false,
        featured: resource.featured || false,
        pricing: resource.pricing || ''
      };
      
      // Scroll to form
      document.querySelector('.resource-form').scrollIntoView({ 
        behavior: 'smooth' 
      });
    },
    
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown';
    },
    
    showMessage(text, type = 'success') {
      this.message = text;
      this.messageType = type;
      setTimeout(() => {
        this.message = '';
      }, 5000);
    },
    
    async addCategory() {
      this.submittingCategory = true;
      
      try {
        const categoryData = {
          id: this.newCategory.id,
          name: this.newCategory.name,
          icon: this.newCategory.icon || '📁'
        };
        
        await resourcesService.addCategory(categoryData);
        this.showMessage('Category added successfully!', 'success');
        this.resetCategoryForm();
        await this.loadData(); // Refresh categories
      } catch (error) {
        this.showMessage('Failed to add category: ' + error.message, 'error');
      } finally {
        this.submittingCategory = false;
      }
    },
    
    resetCategoryForm() {
      this.newCategory = {
        id: '',
        name: '',
        icon: ''
      };
      this.categoryMessage = '';
    },
    
    async deleteCategory(id) {
      if (confirm('Are you sure you want to delete this category?')) {
        try {
          await resourcesService.deleteCategory(id);
          this.showMessage('Category deleted successfully!', 'success');
          await this.loadData();
        } catch (error) {
          this.showMessage('Failed to delete category: ' + error.message, 'error');
        }
      }
    },
    
    editCategory(category) {
      // Populate form with category data for editing
      this.newCategory = {
        id: category.id,
        name: category.name,
        icon: category.icon || '📁'
      };
      
      // Scroll to form
      document.querySelector('.category-form').scrollIntoView({ 
        behavior: 'smooth' 
      });
    },
    // async addBlog() {
    //   this.blogSubmitting = true;
    //   try {
    //     const tags = this.blogForm.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    //     const blogData = {
    //       title: this.blogForm.title,
    //       content: this.blogForm.content,
    //       author: this.blogForm.author,
    //       date: new Date(),
    //       tags,
    //       imageUrl: this.blogForm.imageUrl || null
    //     };
    //     await blogService.addBlog(blogData);
    //     this.showBlogMessage('Blog added successfully!', 'success');
    //     this.resetBlogForm();
    //     await this.loadBlogs();
    //   } catch (error) {
    //     this.showBlogMessage('Failed to add blog: ' + error.message, 'error');
    //   } finally {
    //     this.blogSubmitting = false;
    //   }
    // },
    // async updateBlog() {
    //   this.blogSubmitting = true;
    //   try {
    //     const tags = this.blogForm.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    //     const blogData = {
    //       title: this.blogForm.title,
    //       content: this.blogForm.content,
    //       author: this.blogForm.author,
    //       tags,
    //       imageUrl: this.blogForm.imageUrl || null
    //     };
    //     await blogService.updateBlog(this.editingBlogId, blogData);
    //     this.showBlogMessage('Blog updated successfully!', 'success');
    //     this.resetBlogForm();
    //     await this.loadBlogs();
    //   } catch (error) {
    //     this.showBlogMessage('Failed to update blog: ' + error.message, 'error');
    //   } finally {
    //     this.blogSubmitting = false;
    //   }
    // },
    // async deleteBlog(id) {
    //   if (confirm('Are you sure you want to delete this blog?')) {
    //     try {
    //       await blogService.deleteBlog(id);
    //       this.showBlogMessage('Blog deleted successfully!', 'success');
    //       await this.loadBlogs();
    //     } catch (error) {
    //       this.showBlogMessage('Failed to delete blog: ' + error.message, 'error');
    //     }
    //   }
    // },
    // editBlog(blog) {
    //   this.blogForm = {
    //     title: blog.title,
    //     content: blog.content,
    //     author: blog.author,
    //     tagsInput: blog.tags ? blog.tags.join(', ') : '',
    //     imageUrl: blog.imageUrl || ''
    //   };
    //   this.editingBlogId = blog.id;
    //   document.querySelector('.blog-form').scrollIntoView({ behavior: 'smooth' });
    // },
    // resetBlogForm() {
    //   this.blogForm = {
    //     title: '',
    //     content: '',
    //     author: '',
    //     tagsInput: '',
    //     imageUrl: ''
    //   };
    //   this.editingBlogId = null;
    //   this.blogMessage = '';
    // },
    // showBlogMessage(text, type = 'success') {
    //   this.blogMessage = text;
    //   this.blogMessageType = type;
    //   setTimeout(() => {
    //     this.blogMessage = '';
    //   }, 5000);
    // },
    formatDate(date) {
      if (!date) return '';
      const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    },
  },
  computed: {
    messageIcon() {
      return this.messageType === 'success' 
        ? 'fa-solid fa-check-circle' 
        : 'fa-solid fa-exclamation-triangle';
    },
    categoryMessageIcon() {
      return this.categoryMessageType === 'success' 
        ? 'fa-solid fa-check-circle' 
        : 'fa-solid fa-exclamation-triangle';
    },
    // blogMessageIcon() {
    //   return this.blogMessageType === 'success' 
    //     ? 'fa-solid fa-check-circle' 
    //     : 'fa-solid fa-exclamation-triangle';
    // },
  }
};
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  padding: 2rem 0;
}

/* Authentication Section */
.auth-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.auth-container {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 3rem;
  backdrop-filter: blur(0.5rem);
  max-width: 25rem;
  width: 90%;
  text-align: center;
  animation: slideInUp var(--animation-duration-subtle) ease-out;
}

.auth-title {
  font-family: var(--font-family-pixel);
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

.auth-subtitle {
  color: var(--secondary-color);
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.auth-btn {
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  padding: 1rem 2rem;
  border-radius: 0;
  border-width: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.auth-error {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(220, 20, 60, 0.2);
  border: 0.125rem solid var(--primary-color);
  color: var(--primary-color);
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Admin Dashboard */
.admin-dashboard {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 0.125rem solid var(--primary-color);
}

.dashboard-title {
  font-family: var(--font-family-pixel);
  font-size: 2.5rem;
  color: var(--primary-color);
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin: 0;
}

.logout-btn {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0;
  border-width: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Form Sections */
.resource-form-section,
.recent-resources-section,
.category-form-section,
.recent-categories-section {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(0.5rem);
}

.section-title {
  font-family: var(--font-family-pixel);
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
}

/* Form Styles */
.resource-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 15rem;
}

.form-label {
  display: block;
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border: 0.125rem solid rgba(245, 245, 220, 0.3);
  border-radius: 0;
  color: var(--text-color);
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  transition: all var(--transition-duration) ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.125rem rgba(220, 20, 60, 0.3);
  background: rgba(0, 0, 0, 0.5);
}

.form-textarea {
  resize: vertical;
  min-height: 6rem;
}

/* Checkbox Group */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-item input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.checkbox-label {
  font-family: var(--font-family-pixel);
  font-size: 0.8rem;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.submit-btn,
.reset-btn {
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  padding: 1rem 2rem;
  border-radius: 0;
  border-width: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 10rem;
  justify-content: center;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: var(--text-color);
}

.btn-danger:hover {
  background-color: transparent;
  color: #dc3545;
  border-color: #dc3545;
}

/* Messages */
.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0;
  font-family: var(--font-family-pixel);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.message.success {
  background: rgba(40, 167, 69, 0.2);
  border: 0.125rem solid #28a745;
  color: #28a745;
}

.message.error {
  background: rgba(220, 20, 60, 0.2);
  border: 0.125rem solid var(--primary-color);
  color: var(--primary-color);
}

/* Recent Resources */
.recent-resources {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recent-resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid rgba(245, 245, 220, 0.2);
  border-radius: 0;
  transition: all var(--transition-duration) ease;
}

.recent-resource-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
}

.resource-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.resource-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.5));
}

.resource-details {
  flex: 1;
}

.resource-name {
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  color: var(--primary-color);
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.resource-category {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--secondary-color);
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.resource-description {
  font-size: 0.8rem;
  color: var(--text-color);
  margin: 0;
  opacity: 0.8;
  line-height: 1.4;
}

.resource-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0;
  border-width: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 0 1rem;
  }
  
  .admin-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .dashboard-title {
    font-size: 2rem;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .form-group {
    min-width: auto;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn,
  .reset-btn {
    min-width: auto;
  }
  
  .recent-resource-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .resource-info {
    flex-direction: column;
    text-align: center;
  }
  
  .resource-actions {
    justify-content: center;
  }
  
  .checkbox-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 576px) {
  .auth-container {
    padding: 2rem 1.5rem;
  }
  
  .auth-title {
    font-size: 1.5rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .resource-form-section,
  .recent-resources-section,
  .category-form-section,
  .recent-categories-section {
    padding: 1.5rem;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
  
  .submit-btn,
  .reset-btn {
    font-size: 0.8rem;
    padding: 0.8rem 1.5rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .auth-container,
  .resource-form-section,
  .recent-resources-section,
  .category-form-section,
  .recent-categories-section {
    border-color: #ffffff;
    background: #000000;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    border-color: #ffffff;
    background: #000000;
  }
}

/* Recent Categories */
.recent-categories {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recent-category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid rgba(245, 245, 220, 0.2);
  border-radius: 0;
  transition: all var(--transition-duration) ease;
}

.recent-category-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.category-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.5));
}

.category-details {
  flex: 1;
}

.category-name {
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  color: var(--primary-color);
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.category-id {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--secondary-color);
  margin: 0;
  opacity: 0.8;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

/* Category Form */
.category-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Selection Tabs */
.admin-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.tab-btn {
  background: none;
  border: none;
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all var(--transition-duration) ease;
  color: var(--primary-color);
}

.tab-btn.active {
  border-bottom: 0.2rem solid var(--primary-color);
}

/* Blog Management Section */
.blog-form-section {
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid var(--primary-color);
  border-radius: 0;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(0.5rem);
}

.blog-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-details {
  flex: 1;
}

.blog-title {
  font-family: var(--font-family-pixel);
  font-size: 1rem;
  color: var(--primary-color);
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.blog-meta {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--secondary-color);
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.blog-tags {
  font-family: var(--font-family-pixel);
  font-size: 0.7rem;
  color: var(--secondary-color);
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.blog-content-preview {
  font-size: 0.8rem;
  color: var(--text-color);
  margin: 0;
  opacity: 0.8;
  line-height: 1.4;
}

.blog-image-preview {
  flex: 1;
  text-align: right;
}

.blog-actions {
  display: flex;
  gap: 0.5rem;
}

/* Recent Blogs */
.recent-blogs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recent-blog-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 0.125rem solid rgba(245, 245, 220, 0.2);
  border-radius: 0;
  transition: all var(--transition-duration) ease;
}

.recent-blog-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
}
</style> 