const routes = [
  { path: "/popup", component: () => import("pages/Popup.vue") },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/options", component: () => import("pages/Options.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
