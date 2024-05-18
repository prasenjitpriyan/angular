# Angular

## Components in Angular

Components are the foundational building blocks for any Angular application. Each component has three parts:

- HTML template
- CSS styles
- TypeScript class

> app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` Hello `,
  styles: `
    :host {
      color: blue;
    }
  `,
  standalone: true,
})
export class AppComponent {}
```

In Angular, you can use all the browser supported CSS and HTML that's available. If you'd like, you can store your template and styles in separate files.

## Updating the Component Class

In Angular, the component's logic and behavior are defined in the component's TypeScript class.

> app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` Hello {{ city }}, {{ 1 + 1 }} `,
  standalone: true,
})
export class AppComponent {
  city = "San Francisco";
}
```

## Composing Components

The <b>selector</b> property of the component configuration gives you a name to use when referencing the component in another template. You use the selector like an HTML tag, for example app-user would be <app-user /> in the template.

In this example, there are two components UserComponent and AppComponent.

> app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-user",
  template: ` Username: {{ username }} `,
  standalone: true,
})
export class UserComponent {
  username = "youngTech";
}

@Component({
  selector: "app-root",
  template: `<section><app-user /></section>`,
  standalone: true,
  imports: [UserComponent],
})
export class AppComponent {}
```

## Control Flow in Components - @if and @else

Deciding what to display on the screen for a user is a common task in application development. Many times, the decision is made programmatically using conditions.

To express conditional displays in templates, Angular uses the @if template syntax. There is an @ prefix for the if because it is a special type of syntax called Angular template syntax

> app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    @if (isServerRunning) {
    <p>Yes, the server is running</p>
    } @else{
    <p>No, the server is not running</p>
    }
  `,
  standalone: true,
})
export class AppComponent {
  isServerRunning = false;
}
```

This type of functionality is called conditional control flow.

## Control Flow in Components - @for

Often when building web applications, you need to repeat some code a specific number of times - for example, given an array of names, you may want to display each name in a <p> tag.

In this activity, you'll learn how to use @for to repeat elements in a template.

> app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    @for (user of users; track user.id) {
    <p>{{ user.name }}</p>
    }
  `,
  standalone: true,
})
export class AppComponent {
  users = [
    { id: 0, name: "Sarah" },
    { id: 1, name: "Amy" },
    { id: 2, name: "Rachel" },
    { id: 3, name: "Jessica" },
    { id: 4, name: "Poornima" },
  ];
}
```

> Preview

```
Sarah
Amy
Rachel
Jessica
Poornima
```

## Property Binding in Angular

Property binding in Angular enables you to set values for properties of HTML elements, Angular components and more.

Use property binding to dynamically set values for properties and attributes. You can do things such as toggle button features, set image paths programmatically, and share values between components.

To bind to an element's attribute, wrap the attribute name in square brackets. Here's an example:

```html
<img alt="photo" [src]="imageURL" />
```

In this example, the value of the src attribute will be bound to the class property imageURL. Whatever value imageURL has will be set as the src attribute of the img tag.

> app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  styleUrls: ["app.component.css"],
  template: ` <div [contentEditable]="isEditable"></div> `,
  standalone: true,
})
export class AppComponent {
  isEditable = true;
}
```

The div is now editable. Nice work 👍

## Event handling

Event handling enables interactive features on web apps. It gives you the ability as a developer to respond to user actions like button presses, form submissions and more.

In Angular you bind to events with the parentheses syntax (). On a given element, wrap the event you want to bind to with parentheses and set an event handler. Consider this button example:

> app/app.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <section>
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
  `,
  standalone: true,
})
export class AppComponent {
  message = "";

  onMouseOver() {
    this.message = "Way to go 🚀";
  }
}
```

## Component Communication with @Input

Sometimes app development requires you to send data into a component. This data can be used to customize a component or perhaps send information from a parent component to a child component.

Angular uses a concept called Input. This is similar to props in other frameworks. To create an Input property, use the @Input decorator.

> Parent Components app/app.component.ts

```ts
import { Component } from "@angular/core";
import { UserComponent } from "./user.component";

@Component({
  selector: "app-root",
  template: `
    <app-user occupation="Angular Developer" name="Simran"
      ><app-user />
    </app-user>
  `,
  standalone: true,
  imports: [UserComponent],
})
export class AppComponent {}
```

> Child Components app/user.component.ts

```ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-user",
  template: `
    <p>The user's name is {{ name }} & occupation is an {{ occupation }}</p>
  `,
  standalone: true,
})
export class UserComponent {
  @Input() occupation = "";
  @Input() name = "";
}
```

## Component Communication with @Output

When working with components it may be required to notify other components that something has happened. Perhaps a button has been clicked, an item has been added/removed from a list or some other important update has occurred. In this scenario components need to communicate with parent components.

Angular uses the @Output decorator to enable this type of behavior.

> app/child.component.ts

```ts
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-child",
  styles: `.btn { padding: 5px; }`,
  template: ` <button class="btn" (click)="addItem()">Add Item</button> `,
  standalone: true,
})
export class ChildComponent {
  @Output() addItemEvent = new EventEmitter<string>();
  addItem() {
    this.addItemEvent.emit("🐢");
  }
}
```

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { ChildComponent } from "./child.component";

@Component({
  selector: "app-root",
  template: `
    <app-child (addItemEvent)="addItem($event)" />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  standalone: true,
  imports: [ChildComponent],
})
export class AppComponent {
  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }
}
```

## Deferrable Views

Sometimes in app development, you end up with a lot of components that you need to reference in your app, but some of those don't need to be loaded right away for various reasons.

Maybe they are below the visible fold or are heavy components that aren't interacted with until later. In that case, we can load some of those resources later with deferrable views.

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { CommentsComponent } from "./comments.component";

@Component({
  selector: "app-root",
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article>
        <p>
          Angular is my favorite framework, and this is why. Angular has the
          coolest deferrable view feature that makes defer loading content the
          easiest and most ergonomic it could possibly be. The Angular community
          is also filled with amazing contributors and experts that create
          excellent content. The community is welcoming and friendly, and it
          really is the best community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It
          offers the best developer experience I've ever had. I love that the
          Angular team puts their developers first and takes care to make us
          very happy. They genuinely want Angular to be the best framework it
          can be, and they're doing such an amazing job at it, too. This
          statement comes from my heart and is not at all copied and pasted. In
          fact, I think I'll say these exact same things again a few times.
        </p>
        <p>
          Angular is my favorite framework, and this is why. Angular has the
          coolest deferrable view feature that makes defer loading content the
          easiest and most ergonomic it could possibly be. The Angular community
          is also filled with amazing contributors and experts that create
          excellent content. The community is welcoming and friendly, and it
          really is the best community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It
          offers the best developer experience I've ever had. I love that the
          Angular team puts their developers first and takes care to make us
          very happy. They genuinely want Angular to be the best framework it
          can be, and they're doing such an amazing job at it, too. This
          statement comes from my heart and is not at all copied and pasted. In
          fact, I think I'll say these exact same things again a few times.
        </p>
        <p>
          Angular is my favorite framework, and this is why. Angular has the
          coolest deferrable view feature that makes defer loading content the
          easiest and most ergonomic it could possibly be. The Angular community
          is also filled with amazing contributors and experts that create
          excellent content. The community is welcoming and friendly, and it
          really is the best community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It
          offers the best developer experience I've ever had. I love that the
          Angular team puts their developers first and takes care to make us
          very happy. They genuinely want Angular to be the best framework it
          can be, and they're doing such an amazing job at it, too. This
          statement comes from my heart and is not at all copied and pasted.
        </p>
      </article>
      @defer (on viewport) {
      <comments />
      } @placeholder {
      <p>Future comments</p>
      } @loading (minimum 2s) {
      <p>Loading comments...</p>
      }
    </div>
  `,
  standalone: true,
  imports: [CommentsComponent],
})
export class AppComponent {}
```

> app/comments.component.ts

```ts
import { Component } from "@angular/core";

@Component({
  selector: "comments",
  template: `
    <ul>
      <li>Building for the web is fantastic!</li>
      <li>The new template syntax is great</li>
      <li>I agree with the other comments!</li>
    </ul>
  `,
  standalone: true,
})
export class CommentsComponent {}
```

## Optimizing images

Images are a big part of many applications, and can be a major contributor to application performance problems, including low Core Web Vitals scores.

Image optimization can be a complex topic, but Angular handles most of it for you, with the NgOptimizedImage directive to ensure your images are loaded efficiently.

> app/users.component.ts

```ts
import { Component } from "@angular/core";
import { NgOptimizedImage, provideImgixLoader } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-user",
  providers: [provideImgixLoader("https://images.unsplash.com/")],
  template: `
    <p>Username: {{ username }}</p>
    <p>Preferred Framework:</p>
    <ul>
      <li>
        Static Image:
        <div>
          <img
            ngSrc="/assets/logo.svg"
            alt="Angular logo"
            width="32"
            height="32"
          />
        </div>
      </li>
      <li>
        Dynamic Image:
        <img
          [ngSrc]="logoUrl"
          [alt]="logoAlt"
          width="32"
          height="32"
          priority
        />
      </li>
      <li>
        priority Hello:
        <img
          ngSrc="photo-1522777183857-cb4be6839fbe?q=80&w=3384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          height="100"
        />
      </li>
    </ul>
  `,
  imports: [NgOptimizedImage],
})
export class UserComponent {
  logoUrl = "/assets/logo.svg";
  logoAlt = "Angular logo";
  username = "youngTech";
}
```

- In order to leverage the NgOptimizedImage directive, first import it from the @angular/common library and add it to the component imports array.
- To enable the NgOptimizedImage directive, swap out the src attribute for ngSrc. This applies for both static image sources (i.e., src) and dynamic image sources (i.e., [src]).
- Note that in the above code example, each image has both width and height attributes. In order to prevent layout shift, the NgOptimizedImage directive requires both size attributes on each image. In situations where you can't or don't want to specify a static height and width for images, you can use the fill attribute to tell the image to act like a "background image", filling its containing element:

> Note: For the fill image to render properly, its parent element must be styled with position: "relative", position: "fixed", or position: "absolute".

- One of the most important optimizations for loading performance is to prioritize any image which might be the "LCP element", which is the largest on-screen graphical element when the page loads. To optimize your loading times, make sure to add the priority attribute to your "hero image" or any other images that you think could be an LCP element.
- NgOptimizedImage allows you to specify an image loader, which tells the directive how to format URLs for your images. Using a loader allows you to define your images with short, relative URLs: Image loaders are for more than just convenience--they allow you to use the full capabilities of NgOptimizedImage. Learn more about these optimizations and the built-in loaders for popular CDNs here.

By adding this directive to your workflow, your images are now loading using best practices with the help of Angular 🎉

## Routing Overview

For most apps, there comes a point where the app requires more than a single page. When that time inevitably comes, routing becomes a big part of the performance story for users.

In this activity, you'll learn how to setup and configure your app to use Angular Router.

> app/app.routes.ts

```ts
import { Routes } from "@angular/router";
export const routes: Routes = [];
```

> app/app.config.ts

```ts
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
  selector: "app-root",
  template: `
    <nav>
      <a routerLink="/">Home</a>
      ||
      <a routerLink="/user">User</a>
    </nav>
    <router-outlet />
  `,
  standalone: true,
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent {}
```

Your app is now setup to use Angular Router. Nice work! 🙌

## Define a Route

> app/app.routes.ts

```ts
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";

export const routes: Routes = [
  { path: "/", title: "App Home Page", component: HomeComponent },
  { path: "/user", title: "App User Page", component: UserComponent },
];
```

## Forms Overview

Forms are a big part of many apps because they enable your app to accept user input. Let's learn about how forms are handled in Angular.

In Angular, there are two types of forms: template-driven and reactive. You'll learn about both over the next few activities.

> app/user.component.ts

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user",
  template: `
    <p>Username: {{ username }}</p>
    <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
    <label for="framework"
      >Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class UserComponent {
  username = "youngTech";
  favoriteFramework = "";
}
```

The FormsModule has a directive called ngModel that binds the value of the input to a property in your class.

Update the input to use the ngModel directive, specifically with the following syntax [(ngModel)]="favoriteFramework" to bind to the favoriteFramework property.

After you've made changes, try entering a value in the input field. Notice how it updates on the screen (yes, very cool).

Note: The syntax [()] is known as "banana in a box" but it represents two-way binding: property binding and event binding.

## Getting form control value

Now that your forms are setup with Angular, the next step is to access the values from the form controls.

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user",
  template: `
    <p>Username: {{ username }}</p>
    <p>Framework: {{ favoriteFramework }}</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
    <button (click)="showFramework()">Show Framework</button>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class UserComponent {
  favoriteFramework = "";
  username = "youngTech";
  showFramework() {
    alert(this.favoriteFramework);
  }
}
```

## Reactive Forms

When you want to manage your forms programmatically instead of relying purely on the template, reactive forms are the answer.

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
    <h2>Profile Form</h2>
    <p>Name: {{ profileForm.value.name }}</p>
    <p>Email: {{ profileForm.value.email }}</p>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
  });
  handleSubmit() {
    alert(this.profileForm.value.name + " | " + this.profileForm.value.email);
  }
}
```

- In app.component.ts, import ReactiveFormsModule from @angular/forms and add it to the imports array of the component.
- Reactive forms use the FormControl class to represent the form controls (e.g., inputs). Angular provides the FormGroup class to serve as a grouping of form controls into a helpful object that makes handling large forms more convenient for developers. Add FormControl and FormGroup to the import from @angular/forms so that you can create a FormGroup for each form, with the properties name and email as FormControls.
- Each FormGroup should be attached to a form using the [formGroup] directive. In addition, each FormControl can be attached with the formControlName directive and assigned to the corresponding property. Update the template with the following form code:
- When you want to access data from the FormGroup, it can be done by accessing the value of the FormGroup. Update the template to display the form values:
- Add a new method to the component class called handleSubmit that you'll later use to handle the form submission. This method will display values from the form, you can access the values from the FormGroup.
- In the component class, add the handleSubmit() method to handle the form submission.
- You have access to the form values, now it is time to handle the submission event and use the handleSubmit method. Angular has an event handler for this specific purpose called ngSubmit. Update the form element to call the handleSubmit method when the form is submitted.

## Validating forms

Another common scenario when working with forms is the need to validate the inputs to ensure the correct data is submitted.

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  template: `
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" name="name" />
      <input type="email" formControlName="email" name="email" />
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });
}
```

- Angular provides a set of validation tools. To use them, first update the component to import Validators from @angular/forms.
- Every FormControl can be passed the Validators you want to use for validating the FormControl values. For example, if you want to make the name field in profileForm required then use Validators.required. For the email field in our Angular form, we want to ensure it's not left empty and follows a valid email address structure. We can achieve this by combining the Validators.required and Validators.email validators in an array. Update the name and email FormControl:
- To determine if a form is valid, the FormGroup class has a valid property. You can use this property to dynamically bind attributes. Update the submit button to be enabled based on the validity of the form.

You now know the basics around how validation works with reactive forms.

## Creating an injectable service

Dependency injection (DI) in Angular is one of the framework's most powerful features. Consider dependency injection to be the ability for Angular to provide resources you need for your application at runtime. A dependency could be a service or some other resources.

One way to use a service is to act as a way to interact with data and APIs. To make a service reusable you should keep the logic in the service and share it throughout the application when it is needed.

To make a service eligible to be injected by the DI system use the @Injectable decorator. For example:

```ts
@Injectable({
  providedIn: "root",
})
class UserService {
  // methods to retrieve and return data
}
```

The @Injectable decorator notifies the DI system that the UserService is available to be requested in a class. providedIn sets the scope in which this resource is available. For now, it is good enough to understand that providedIn: 'root' means that the UserService is available to the entire application.

> app/car.service.ts

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CarService {
  cars = ["Sunflower GT", "Flexus Sport", "Sprout Mach One"];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
```

> app/app.component.ts

```ts
import { Component, inject } from "@angular/core";
import { CarService } from "./car.service";

@Component({
  selector: "app-root",
  template:
    "<p> {{ carService.getCars() }} </p><p> {{ carService.getCar((1)) }} </p>",
  standalone: true,
})
export class AppComponent {
  carService = inject(CarService);
}
```

> Preview

```
Sunflower GT,Flexus Sport,Sprout Mach One

Flexus Sport
```

## Inject-based dependency injection

Creating an injectable service is the first part of the dependency injection (DI) system in Angular. How do you inject a service into a component? Angular has a convenient function called inject() that can be used in the proper context.

> Note: Injection contexts are beyond the scope of this tutorial, but you can find more information in the Angular Docs if you would like to learn more.

> app/car.service.ts

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CarService {
  cars = ["Sunflower GT", "Flexus Sport", "Sprout Mach One"];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
```

> app/app.component.ts

```ts
import { Component, inject } from "@angular/core";
import { CarService } from "./car.service";

@Component({
  selector: "app-root",
  template: ` <p>Car Listing: {{ display }}</p> `,
  standalone: true,
})
export class AppComponent {
  display = "";
  carService = inject(CarService);
  constructor() {
    this.display = this.carService.getCars().join(" ⭐️ ");
  }
}
```

> Preview

```
Car Listing: Sunflower GT ⭐️ Flexus Sport ⭐️ Sprout Mach One
```

## Constructor-based dependency injection

In previous activities you used the inject() function to make resources available, "providing" them to your components. The inject() function is one pattern and it is useful to know that there is another pattern for injecting resources called constructor-based dependency injection.

You specify the resources as parameters to the constructor function of a component. Angular will make those resources available to your component.

> app/car.service.ts

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CarService {
  cars = ["Sunflower GT", "Flexus Sport", "Sprout Mach One"];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
```

> app/app.component.ts

```ts
import { Component, inject } from "@angular/core";
import { CarService } from "./car.service";

@Component({
  selector: "app-root",
  template: ` <p>Car Listing: {{ display }}</p> `,
  standalone: true,
})
export class AppComponent {
  display = "";

  constructor(private carService: CarService) {
    this.display = this.carService.getCars().join(" ⭐️ ");
  }
}
```

> Preview

```
Car Listing: Sunflower GT ⭐️ Flexus Sport ⭐️ Sprout Mach One
```

## Pipes

Pipes are functions that are used to transform data in templates. In general, pipes are "pure" functions that don't cause side effects. Angular has a number of helpful built-in pipes you can import and use in your components. You can also create a custom pipe. To use a pipe in a template include it in an interpolated expression.

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { LowerCasePipe } from "@angular/common";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    {{ username | lowercase }}
    <br />
    {{ username | uppercase }}
  `,
  standalone: true,
  imports: [LowerCasePipe, UpperCasePipe],
})
export class AppComponent {
  username = "yOunGTECh";
}
```

> Preview

```
youngtech
YOUNGTECH
```

## Formatting data with pipes

You can take your use of pipes even further by configuring them. Pipes can be configured by passing options to them.

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { DecimalPipe, DatePipe, CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <ul>
      <li>Number with "decimal" {{ num }}</li>
      <li>Date with "date" {{ birthday }}</li>
      <li>Currency with "currency" {{ cost }}</li>
      <li>Number with "decimal" {{ num | number : "3.2-2" }}</li>
      <li>Date with "date" {{ birthday | date : "medium" }}</li>
      <li>Currency with "currency" {{ cost | currency }}</li>
    </ul>
  `,
  standalone: true,
  imports: [DecimalPipe, DatePipe, CurrencyPipe],
})
export class AppComponent {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}
```

> Preview

```
* Number with "decimal" 103.1234
* Date with "date" Sun Apr 02 2023 00:00:00 GMT+0530 (India Standard Time)
* Currency with "currency" 4560.34
* Number with "decimal" 103.12
* Date with "date" Apr 2, 2023, 12:00:00 AM
* Currency with "currency" $4,560.34
```

## Create a custom pipe

You can create custom pipes in Angular to fit your data transformation needs.

> app/reverse.pipe.ts

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: "reverse",
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    let reverse = "";
    for (let i = value.length - 1; i >= 0; i--) {
      reverse += value[i];
    }
    return reverse;
  }
}
```

> app/app.component.ts

```ts
import { Component } from "@angular/core";
import { ReversePipe } from "./reverse.pipe";

@Component({
  selector: "app-root",
  template: ` Reverse Machine: {{ word | reverse }} `,
  standalone: true,
  imports: [ReversePipe],
})
export class AppComponent {
  word = "You are a champion";
}
```

> Preview

```
Reverse Machine: noipmahc a era uoY
```
