import { Component  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetDashboardComponent } from './widget-dashboard/widget-dashboard.component';
import { CommonModule } from '@angular/common';
import { GridstackComponent } from 'gridstack/dist/angular';
import { AComponent, BComponent, CComponent, DComponent, EComponent } from './widgets.component';

@Component({
  selector: 'app-root',
  imports: [WidgetDashboardComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard_widget_new';
  constructor() {
    // register all our dynamic components types created by the grid
    GridstackComponent.addComponentToSelectorType([AComponent, BComponent,CComponent,DComponent,EComponent]) ;
  }
}
