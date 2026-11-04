import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | Raxadinha",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/about/about").then((m) => m.About),
    title: "Sobre | Raxadinha",
  },
  {
    path: "conteudos",
    loadComponent: () =>
      import("./features/contents/contents").then((m) => m.Contents),
    title: "Conteúdos | Raxadinha",
  },
  {
    path: "conteudos/:id",
    loadComponent: () =>
      import("./features/content-detail/content-detail").then(
        (m) => m.ContentDetail,
      ),
    title: "Detalhes do conteúdo | Raxadinha",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | Raxadinha",
  },
  {
    path: "admin/novo",
    loadComponent: () =>
      import("./features/content-management/content-management").then(
        (m) => m.ContentManagement,
      ),
    title: "Novo conteúdo | Raxadinha",
  },
  {
    path: "admin/editar/:id",
    loadComponent: () =>
      import("./features/content-management/content-management").then(
        (m) => m.ContentManagement,
      ),
    title: "Editar conteúdo | Raxadinha",
  },
  { path: "**", redirectTo: "" },
];
