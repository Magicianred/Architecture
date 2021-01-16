import { Routes } from "@angular/router";
import { AppGuard } from "./app.guard";
import { AppLayoutMainComponent } from "./layouts/layout-main/layout-main.component";
import { AppLayoutComponent } from "./layouts/layout/layout.component";

export const ROUTES: Routes = [
    {
        path: "",
        component: AppLayoutComponent,
        children: [
            { path: "", loadChildren: () => import("./views/signin/signin.module").then((module) => module.AppSigninModule) }
        ]
    },
    {
        path: "main",
        component: AppLayoutMainComponent,
        canActivate: [AppGuard],
        children: [
            { path: "files", loadChildren: () => import("./views/main/files/files.module").then((module) => module.AppFilesModule) },
            { path: "form", loadChildren: () => import("./views/main/form/form.module").then((module) => module.AppFormModule) },
            { path: "home", loadChildren: () => import("./views/main/home/home.module").then((module) => module.AppHomeModule) },
            { path: "list", loadChildren: () => import("./views/main/list/list.module").then((module) => module.AppListModule) }
        ]
    },
    {
        path: "**",
        redirectTo: ""
    }
];
