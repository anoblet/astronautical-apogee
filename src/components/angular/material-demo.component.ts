import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Angular Material</mat-card-title>
        <mat-card-subtitle>Running as an Astro island</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>The button has been clicked {{ count() }} times.</p>
      </mat-card-content>
      <mat-card-actions>
        <button matButton="filled" type="button" (click)="increment()">
          Increment
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    :host {
      display: block;
      width: min(100%, 32rem);
    }

    mat-card {
      padding: 1rem;
    }
  `,
})
export class MaterialDemoComponent {
  protected readonly count = signal(0);

  protected increment(): void {
    this.count.update(count => count + 1);
  }
}
