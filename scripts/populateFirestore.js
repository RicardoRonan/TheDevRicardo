import { db } from '../src/firebase.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Categories data
const categories = [
  { id: 'developmentTools', name: 'Development Tools', icon: '🛠️' },
  { id: 'libraries', name: 'Libraries & Frameworks', icon: '📚' },
  { id: 'learningResources', name: 'Learning Resources', icon: '🎓' },
  { id: 'productivityTools', name: 'Productivity Tools', icon: '⚡' },
  { id: 'browserExtensions', name: 'Browser Extensions', icon: '🖼️' },
  { id: 'codeEditors', name: 'Code Editors & IDEs', icon: '💻' },
  { id: 'onlineDevTools', name: 'Online Development Tools', icon: '🌐' },
  { id: 'developerResources', name: 'Developer Resources', icon: '🔧' },
  { id: 'cssDesignTools', name: 'CSS & Design Tools', icon: '🎨' },
  { id: 'testingTools', name: 'Testing & Debugging', icon: '🧪' },
  { id: 'versionControl', name: 'Version Control', icon: '📝' },
  { id: 'wordpressPlugins', name: 'WordPress Plugins', icon: '📱' }
];

// Resources data (duplicates removed)
const resources = [
  // Development Tools
  {
    name: 'VS Code',
    description: 'Powerful code editor with extensive plugin ecosystem',
    icon: '💻',
    category: 'developmentTools',
    tags: ['Editor', 'Free', 'Cross-platform'],
    url: 'https://code.visualstudio.com/',
    tutorial: true
  },
  {
    name: 'GitHub',
    description: 'Version control and collaboration platform',
    icon: '🐙',
    category: 'developmentTools',
    tags: ['Version Control', 'Collaboration', 'Free'],
    url: 'https://github.com/',
    tutorial: true
  },
  {
    name: 'Postman',
    description: 'API development and testing platform',
    icon: '📮',
    category: 'developmentTools',
    tags: ['API', 'Testing', 'Free Tier'],
    url: 'https://www.postman.com/',
    tutorial: false
  },

  // Libraries & Frameworks
  {
    name: 'Vue.js',
    description: 'Progressive JavaScript framework for building user interfaces',
    icon: '🟢',
    category: 'libraries',
    tags: ['Frontend', 'JavaScript', 'Free'],
    url: 'https://vuejs.org/',
    examples: true
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    icon: '🎨',
    category: 'libraries',
    tags: ['CSS', 'Utility-first', 'Free'],
    url: 'https://tailwindcss.com/',
    examples: true
  },
  {
    name: 'Axios',
    description: 'Promise-based HTTP client for browser and Node.js',
    icon: '📡',
    category: 'libraries',
    tags: ['HTTP', 'JavaScript', 'Free'],
    url: 'https://axios-http.com/',
    examples: false
  },
  {
    name: 'React',
    description: 'JavaScript UI library for building user interfaces',
    icon: '⚛️',
    category: 'libraries',
    tags: ['Frontend', 'JavaScript', 'Free'],
    url: 'https://reactjs.org/'
  },
  {
    name: 'Angular',
    description: 'Google\'s comprehensive framework',
    icon: '🅰️',
    category: 'libraries',
    tags: ['Frontend', 'TypeScript', 'Free'],
    url: 'https://angular.io/'
  },
  {
    name: 'Bootstrap',
    description: 'CSS framework for responsive web design',
    icon: '🎨',
    category: 'libraries',
    tags: ['CSS', 'Responsive', 'Free'],
    url: 'https://getbootstrap.com/'
  },

  // Learning Resources
  {
    name: 'freeCodeCamp',
    description: 'Comprehensive web development curriculum',
    icon: '🏕️',
    category: 'learningResources',
    tags: ['Tutorials', 'Interactive', 'Free'],
    url: 'https://www.freecodecamp.org/',
    free: true
  },
  {
    name: 'MDN Web Docs',
    description: 'Mozilla\'s developer documentation',
    icon: '📖',
    category: 'learningResources',
    tags: ['Documentation', 'Web', 'Free'],
    url: 'https://developer.mozilla.org/',
    free: true
  },
  {
    name: 'The Odin Project',
    description: 'Free full-stack curriculum',
    icon: '⚡',
    category: 'learningResources',
    tags: ['Full-stack', 'Curriculum', 'Free'],
    url: 'https://www.theodinproject.com/',
    free: true
  },
  {
    name: 'Frontend Mentor',
    description: 'Real-world coding challenges',
    icon: '🎯',
    category: 'learningResources',
    tags: ['Challenges', 'Practice', 'Free'],
    url: 'https://www.frontendmentor.io/',
    free: true
  },

  // Productivity Tools
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and collaboration',
    icon: '📝',
    category: 'productivityTools',
    tags: ['Productivity', 'Notes', 'Free Tier'],
    url: 'https://www.notion.so/',
    pricing: 'Free + Paid'
  },
  {
    name: 'Figma',
    description: 'Collaborative interface design tool',
    icon: '🎨',
    category: 'productivityTools',
    tags: ['Design', 'Collaboration', 'Free Tier'],
    url: 'https://www.figma.com/',
    pricing: 'Free + Paid'
  },
  {
    name: 'Trello',
    description: 'Visual project management and collaboration tool',
    icon: '📋',
    category: 'productivityTools',
    tags: ['Project Management', 'Kanban', 'Free'],
    url: 'https://trello.com/',
    pricing: 'Free + Paid'
  },

  // Browser Extensions
  {
    name: 'Usersnap',
    description: 'Visual feedback and bug reporting tool',
    icon: '🖼️',
    category: 'browserExtensions',
    tags: ['Chrome', 'Feedback'],
    url: 'https://chrome.google.com/webstore/category/extensions'
  },
  {
    name: 'Web Developer',
    description: 'Comprehensive toolbar with developer tools',
    icon: '🛠️',
    category: 'browserExtensions',
    tags: ['Chrome', 'Firefox', 'Toolbar'],
    url: 'https://chrome.google.com/webstore/detail/web-developer/'
  },
  {
    name: 'Wappalyzer',
    description: 'Technology profiler to identify website technologies',
    icon: '🔍',
    category: 'browserExtensions',
    tags: ['Chrome', 'Firefox', 'Profiler'],
    url: 'https://www.wappalyzer.com/'
  },
  {
    name: 'ColorZilla',
    description: 'Advanced eyedropper and color picker',
    icon: '🎨',
    category: 'browserExtensions',
    tags: ['Chrome', 'Firefox', 'Color'],
    url: 'https://chrome.google.com/webstore/detail/colorzilla/'
  },
  {
    name: 'WhatFont',
    description: 'Font identification tool',
    icon: '🔤',
    category: 'browserExtensions',
    tags: ['Chrome', 'Font'],
    url: 'https://chrome.google.com/webstore/detail/whatfont/'
  },

  // Code Editors & IDEs
  {
    name: 'Sublime Text',
    description: 'Fast, elegant text editor',
    icon: '💻',
    category: 'codeEditors',
    tags: ['Editor', 'Cross-platform'],
    url: 'https://www.sublimetext.com/'
  },
  {
    name: 'WebStorm',
    description: 'Professional JavaScript IDE',
    icon: '🌩️',
    category: 'codeEditors',
    tags: ['IDE', 'JavaScript'],
    url: 'https://www.jetbrains.com/webstorm/'
  },

  // Online Development Tools
  {
    name: 'CodePen',
    description: 'Online code editor and community',
    icon: '🌐',
    category: 'onlineDevTools',
    tags: ['HTML', 'CSS', 'JS'],
    url: 'https://codepen.io/'
  },
  {
    name: 'JSFiddle',
    description: 'Online JavaScript testing',
    icon: '🧪',
    category: 'onlineDevTools',
    tags: ['JavaScript', 'Testing'],
    url: 'https://jsfiddle.net/'
  },
  {
    name: 'CodeSandbox',
    description: 'Cloud development environment',
    icon: '☁️',
    category: 'onlineDevTools',
    tags: ['Full-stack', 'Collaboration'],
    url: 'https://codesandbox.io/'
  },

  // Developer Resources
  {
    name: 'web.dev',
    description: 'Google\'s web development guidance',
    icon: '🌐',
    category: 'developerResources',
    tags: ['Documentation', 'Google', 'Free'],
    url: 'https://web.dev/'
  },
  {
    name: 'Can I Use',
    description: 'Browser compatibility tables',
    icon: '🔍',
    category: 'developerResources',
    tags: ['Compatibility', 'Browser', 'Free'],
    url: 'https://caniuse.com/'
  },
  {
    name: 'Stack Overflow',
    description: 'Developer Q&A community',
    icon: '💬',
    category: 'developerResources',
    tags: ['Q&A', 'Community', 'Free'],
    url: 'https://stackoverflow.com/'
  },
  {
    name: 'DevDocs',
    description: 'API documentation browser',
    icon: '📚',
    category: 'developerResources',
    tags: ['API', 'Documentation', 'Free'],
    url: 'https://devdocs.io/'
  },

  // CSS & Design Tools
  {
    name: 'NES.css',
    description: 'NES-style (8bit-like) CSS Framework - The tool I used to build this website!',
    icon: '🎮',
    category: 'cssDesignTools',
    tags: ['CSS', 'Framework', 'Retro', 'Free', 'Featured'],
    url: 'https://nostalgic-css.github.io/NES.css/',
    featured: true,
    usedForThisSite: true
  },
  {
    name: 'CSS Gradient',
    description: 'Gradient generator for CSS',
    icon: '🌈',
    category: 'cssDesignTools',
    tags: ['CSS', 'Generator', 'Free'],
    url: 'https://cssgradient.io/'
  },
  {
    name: 'Colorhunt',
    description: 'Color palette inspiration',
    icon: '🎨',
    category: 'cssDesignTools',
    tags: ['Colors', 'Inspiration', 'Free'],
    url: 'https://colorhunt.co/'
  },
  {
    name: 'CSS Tricks',
    description: 'Tips and code snippets',
    icon: '💡',
    category: 'cssDesignTools',
    tags: ['CSS', 'Tips', 'Free'],
    url: 'https://css-tricks.com/'
  },
  {
    name: 'Haikei',
    description: 'Visual content generators',
    icon: '🎭',
    category: 'cssDesignTools',
    tags: ['Generator', 'Visual', 'Free'],
    url: 'https://haikei.app/'
  },
  {
    name: 'FFFuel',
    description: 'SVG generators and tools',
    icon: '🔥',
    category: 'cssDesignTools',
    tags: ['SVG', 'Generator', 'Free'],
    url: 'https://fffuel.co/'
  },

  // Testing & Debugging
  {
    name: 'BrowserStack',
    description: 'Cross-browser testing platform',
    icon: '🌐',
    category: 'testingTools',
    tags: ['Testing', 'Cross-browser', 'Paid'],
    url: 'https://www.browserstack.com/'
  },
  {
    name: 'Google PageSpeed Insights',
    description: 'Performance analysis tool',
    icon: '⚡',
    category: 'testingTools',
    tags: ['Performance', 'Analysis', 'Free'],
    url: 'https://pagespeed.web.dev/'
  },
  {
    name: 'GTmetrix',
    description: 'Website speed testing',
    icon: '📊',
    category: 'testingTools',
    tags: ['Performance', 'Speed', 'Free'],
    url: 'https://gtmetrix.com/'
  },
  {
    name: 'WebPageTest',
    description: 'Performance diagnostics',
    icon: '🔍',
    category: 'testingTools',
    tags: ['Performance', 'Diagnostics', 'Free'],
    url: 'https://www.webpagetest.org/'
  },

  // Version Control
  {
    name: 'Git',
    description: 'Distributed version control system',
    icon: '📝',
    category: 'versionControl',
    tags: ['Version Control', 'Command Line', 'Free'],
    url: 'https://git-scm.com/'
  },
  {
    name: 'GitLab',
    description: 'DevOps platform with Git repository',
    icon: '🦊',
    category: 'versionControl',
    tags: ['DevOps', 'CI/CD', 'Free'],
    url: 'https://gitlab.com/'
  },
  {
    name: 'Bitbucket',
    description: 'Atlassian\'s Git solution',
    icon: '🪣',
    category: 'versionControl',
    tags: ['Hosting', 'Atlassian', 'Free'],
    url: 'https://bitbucket.org/'
  },

  // WordPress Plugins
  {
    name: 'Yoast SEO',
    description: 'Search engine optimization plugin',
    icon: '🎯',
    category: 'wordpressPlugins',
    tags: ['SEO', 'WordPress', 'Free'],
    url: 'https://wordpress.org/plugins/wordpress-seo/'
  },
  {
    name: 'Elementor',
    description: 'Page builder for WordPress',
    icon: '🏗️',
    category: 'wordpressPlugins',
    tags: ['Page Builder', 'WordPress', 'Free'],
    url: 'https://elementor.com/'
  },
  {
    name: 'WP Rocket',
    description: 'Caching and performance plugin',
    icon: '🚀',
    category: 'wordpressPlugins',
    tags: ['Caching', 'Performance', 'Paid'],
    url: 'https://wp-rocket.me/'
  },
  {
    name: 'Wordfence Security',
    description: 'Security plugin for WordPress',
    icon: '🛡️',
    category: 'wordpressPlugins',
    tags: ['Security', 'WordPress', 'Free'],
    url: 'https://wordpress.org/plugins/wordfence/'
  },
  {
    name: 'Contact Form 7',
    description: 'Form builder plugin',
    icon: '📝',
    category: 'wordpressPlugins',
    tags: ['Forms', 'WordPress', 'Free'],
    url: 'https://wordpress.org/plugins/contact-form-7/'
  }
];

// Helper function to check if item already exists
async function checkIfExists(collectionName, field, value) {
  try {
    const q = query(collection(db, collectionName), where(field, '==', value));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    return false;
  }
}

// Function to populate Firestore with duplicate prevention
async function populateFirestore() {
  try {
    // Add categories with duplicate prevention
    for (const category of categories) {
      const exists = await checkIfExists('categories', 'id', category.id);
      if (exists) {
        continue;
      }
      await addDoc(collection(db, 'categories'), category);
    }

    // Add resources with duplicate prevention
    for (const resource of resources) {
      const exists = await checkIfExists('resources', 'name', resource.name);
      if (exists) {
        continue;
      }
      await addDoc(collection(db, 'resources'), resource);
    }
  } catch (error) {
    throw new Error(`Failed to populate Firestore: ${error.message}`);
  }
}

// Export the function
export { populateFirestore }; 