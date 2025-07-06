import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/Projects.vue"),
  },
  {
    path: "/experience",
    name: "experience",
    component: () => import("../views/Experience.vue"),
  },
  {
    path: "/testimonials",
    name: "testimonials",
    component: () => import("../views/Testimonials.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/Blog.vue"),
  },
  {
    path: "/blog/:id",
    name: "single-blog",
    component: () => import("../views/SingleBlog.vue"),
  },
  {
    path: "/resources",
    name: "resources",
    component: () => import("../views/Resources.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0, left: 0 };
  },
});

export default router;
