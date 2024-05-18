# Step for Angular 17 CRUD with Node JS and MongoDB

- Step 1: Create Angular 17 Project
- Step 2: Install Bootstrap
- Step 3: Create Post Module
- Step 4: Create Component For Module
- Step 5: Create Routes
- Step 6: Create Interface
- Step 7: Create Service
- Step 8: Update Component Logic and Template
- Step 9: export provideHttpClient()
- Step 10: Create REST API using Node JS and MongoDB
- Run Node JS App
- Run Angular App

Now, let's follow the below step to create crud operations with angular 17.

## Step 1: Create Angular 17 Project

You can easily create your angular app using below command:

```
ng new my-new-app
```

## Step 2: Install Bootstrap

now, we will install bootstrap for our crud application, so let's run bellow command and import it to css file.

```
npm install bootstrap --save
```

Now after successfully run above command. let's import it in angular.json file.

> angular.json

```json
 "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "src/styles.css"
      ],
```

## Step 3: Create Post Module

After creating successfully app, we need to create post module using angular cli command. angular provide command to create module with routing in angular application. so let's run bellow command to create post module:

```
ng generate module post
```

run successfully command, it will create files as like bellow path:

> src/app/post/post.module.ts

## Step 4: Create Component For Module

Now we will add new component to our post module using bellow command, so let's create index, view, create and edit component for admin module:

```
ng generate component post/index
ng generate component post/view
ng generate component post/create
ng generate component post/edit
```

## Step 5: Create Routes

In this step, we will simply create route for index, create, edit and view using generated new component. so we have to update our app.routes.ts module file as like bellow code:

> src/app/app.routes.ts

```ts
import { Routes } from "@angular/router";

import { IndexComponent } from "./post/index/index.component";
import { ViewComponent } from "./post/view/view.component";
import { CreateComponent } from "./post/create/create.component";
import { EditComponent } from "./post/edit/edit.component";

export const routes: Routes = [
  { path: "post", redirectTo: "post/index", pathMatch: "full" },
  { path: "post/index", component: IndexComponent },
  { path: "post/:postId/view", component: ViewComponent },
  { path: "post/create", component: CreateComponent },
  { path: "post/:postId/edit", component: EditComponent },
];
```

## Step 6: Create Interface

In this step, we will create interface using angular command for post module. we will use post interface with Observable. so let's create interface with bellow code.

```
ng generate interface post/post
```

> src/app/post/post.ts

```ts
export interface Post {
  _id: number;
  title: string;
  body: string;
}
```
