// widget-dashboard.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AComponent, BComponent, CComponent, DComponent, EComponent } from '../widgets.component';


import { 
  GridstackComponent, 
  GridstackItemComponent, 
  NgGridStackOptions, 
  nodesCB, 
  NgGridStackWidget, 
  gsCreateNgComponents, 
  BaseWidget,
} from 'gridstack/dist/angular';
import { GridStack } from 'gridstack';

@Component({
  selector: 'app-widget-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    GridstackComponent,
    AComponent, BComponent, CComponent, DComponent, EComponent

  ],
  templateUrl: './widget-dashboard.component.html',
  styleUrls: ['./widget-dashboard.component.css']
})
export class WidgetDashboardComponent implements OnInit {

  @ViewChild(GridstackComponent) gridComp?: GridstackComponent;
  @ViewChild('origTextArea', {static: false}) origTextEl?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('textArea', {static: false}) textEl?: ElementRef<HTMLTextAreaElement>;

  isEditMode = false;
  revenue = 25000;

  public gridOptions: NgGridStackOptions = {
    column: 6,
    cellHeight: 50,
    margin: 5,
    minRow: 150,
    acceptWidgets: true,
    float: true,
    children: [
      {x: 0, y: 0, minW: 2, selector: 'app-a'},
      {x: 1, y: 0, minW: 2, selector: 'app-a', input: { text: 'bar' }},
      {x: 2, y: 0, selector: 'app-b'},
    ] 
  };

  public sidebarContent: NgGridStackWidget[] = [
    {selector: 'app-a'},
    {selector: 'app-b', w: 10, h: 10, maxW: 3},
    {selector: 'app-c'},
    {selector: 'app-d', w: 2, maxW: 3},
    {selector: 'app-e'}
  ];

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    // Update gridOptions with the new disableDrag value
    this.gridOptions = {
      ...this.gridOptions,
      disableDrag: this.isEditMode
    };
  }

  ngOnInit(): void {
    this.onShow();
  }

  public onShow(): void {
    
    // Set the callback for creating Angular components
    GridStack.addRemoveCB = gsCreateNgComponents;

    // Setup drag-in functionality for sidebar items
    GridStack.setupDragIn('.sidebar-item', { appendTo: 'body' }, this.sidebarContent);

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      if (this.origTextEl) {
        this.origTextEl.nativeElement.value = JSON.stringify(this.gridOptions, null, '  ');
      }
      if (this.textEl) {
        this.textEl.nativeElement.value = '';
      }
    });
  }

 
}