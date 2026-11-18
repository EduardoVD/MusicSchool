import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | Music School",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/about/about").then((m) => m.About),
    title: "Sobre | Music School",
  },
  {
    path: "conteudos",
    loadComponent: () =>
      import("./features/contents/contents").then((m) => m.Contents),
    title: "Conteúdos | Music School",
  },
  {
    path: "conteudos/:id",
    loadComponent: () =>
      import("./features/content-detail/content-detail").then(
        (m) => m.ContentDetail,
      ),
    title: "Detalhes do conteúdo | Music School",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | Music School",
  },
  {
    path: "admin/form",
    loadComponent: () =>
      import("./features/content-management/content-management").then(
        (m) => m.ContentManagement,
      ),
    title: "Novo conteúdo | Music School",
  },
  {
    path: "admin/form/:id",
    loadComponent: () =>
      import("./features/content-management/content-management").then(
        (m) => m.ContentManagement,
      ),
    title: "Editar conteúdo | Music School",
  },
  { path: "**", redirectTo: "" },
];
