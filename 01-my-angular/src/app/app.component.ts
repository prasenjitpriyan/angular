import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: ` <h1 class="text-red-500">Hello world! {{ title }}</h1> `,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = '01-my-angular';
}
