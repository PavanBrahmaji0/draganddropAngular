import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, signal } from '@angular/core';
import { BaseWidget, NgCompInputs } from 'gridstack/dist/angular';


@Component({
  selector: 'app-hoc-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-wrapper">
      <div class="close-btn-container">
        <button class="close-btn" (click)="removeWidget($event)">×</button>
      </div>
      <ng-content></ng-content> <!-- This is where your component will be projected -->
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    .content-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 6px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .close-btn-container {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      padding: 5px;
    }
    
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      border: none;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0;
      line-height: 1;
    }
    
    .close-btn:hover {
      background-color: rgba(255, 0, 0, 0.2);
      color: #ff0000;
      transform: scale(1.1);
    }
  `]
})
export class HocWrapperComponent {
  constructor(private el: ElementRef) {}
  
  /**
   * Removes the widget from the GridStack grid when close button is clicked
   * @param event The click event
   */
  removeWidget(event: Event): void {
    // Stop event propagation to prevent other handlers
    event.stopPropagation();
    
    // Get the closest grid-stack-item ancestor
    const gridItem = this.el.nativeElement.closest('.grid-stack-item');
    
    if (gridItem) {
      // Try multiple methods to get the GridStack instance
      this.removeWidgetFromGrid(gridItem);
    }
  }
  
  /**
   * Attempts multiple methods to get the GridStack instance and remove the widget
   * @param gridItem The grid item element to remove
   */
  private removeWidgetFromGrid(gridItem: Element): void {
    // Method 1: Try to get the grid instance from the global variable
    if ((window as any).gridstack) {
      (window as any).gridstack.removeWidget(gridItem);
      return;
    }
    
    // Method 2: Try to get the grid from GridStack API if available
    if ((window as any).GridStack) {
      // Try to get grid from the closest parent .grid-stack
      const gridContainer = this.el.nativeElement.closest('.grid-stack');
      if (gridContainer) {
        const grid = (window as any).GridStack.getGridFromElement(gridContainer);
        if (grid) {
          grid.removeWidget(gridItem);
          return;
        }
      }
      
      // Alternative: Get the grid instance using the static method
      const grid = (window as any).GridStack.getGridStackInstance();
      if (grid) {
        grid.removeWidget(gridItem);
        return;
      }
    }
    
    // Fallback: If all else fails, try to remove the element directly
    console.warn('GridStack instance not found, removing element directly');
    gridItem.parentElement?.removeChild(gridItem);
  }
}

// Component A
@Component({
  selector: 'app-a',
  standalone: true,
  imports:[HocWrapperComponent],
  template: `
   <app-hoc-wrapper> 
    <div class="widget-content">Component A </div>
    </app-hoc-wrapper>
 `,
  styles: [`
    .widget-content {
      padding: 15px;
      background: #f0f8ff;
      border: 1px solid #d0e0f0;
      border-radius: 4px;
      height: 100%;
    }
  `]
})
export class AComponent extends BaseWidget {
  text = signal('Default Text');
  
  override serialize(): NgCompInputs | undefined {
    return this.text() ? {text: this.text()} : undefined;
  }

  constructor() { 
    super(); 
    console.log('Component A created');
  }
}

// Component B
@Component({
  selector: 'app-b',
  standalone: true,
  imports:[HocWrapperComponent],
  template: `
   <app-hoc-wrapper> <div class="widget-content">Component B (Wide)</div>
</app-hoc-wrapper> `,
  styles: [`
    .widget-content {
      padding: 15px;
      background: #fff0f5;
      border: 1px solid #f0d0e0;
      border-radius: 4px;
      height: 100%;
    }
  `]
})
export class BComponent extends BaseWidget {
  constructor() { 
    super(); 
    console.log('Component B created');
  }
}

// Component C
@Component({
  selector: 'app-c',
  standalone: true,
  imports:[HocWrapperComponent],
  template: `
   <app-hoc-wrapper><div class="widget-content">Component C</div></app-hoc-wrapper>`,
  styles: [`
    .widget-content {
      padding: 15px;
      background: #f5f5f0;
      border: 1px solid #e0e0d0;
      border-radius: 4px;
      height: 100%;
    }
  `]
})
export class CComponent extends BaseWidget {
  constructor() { 
    super(); 
    console.log('Component C created');
  }
}

// Component D
@Component({
  selector: 'app-d',
  standalone: true,
  template: '<div class="widget-content">Component D (Wide)</div>',
  styles: [`
    .widget-content {
      padding: 15px;
      background: #f0fff0;
      border: 1px solid #d0f0d0;
      border-radius: 4px;
      height: 100%;
    }
  `]
})
export class DComponent extends BaseWidget {
  constructor() { 
    super(); 
    console.log('Component D created');
  }
}

// Component E
@Component({
  selector: 'app-e',
  standalone: true,
  template: '<div class="widget-content">Component E</div>',
  styles: [`
    .widget-content {
      padding: 15px;
      background: #fff8f0;
      border: 1px solid #f0e0d0;
      border-radius: 4px;
      height: 100%;
    }
  `]
})
export class EComponent extends BaseWidget {
  constructor() { 
    super(); 
    console.log('Component E created');
  }
}

