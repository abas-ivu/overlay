import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isOpen = false;
  // Short Texts
  items_short = Array.from({ length: 100 }).map((_, i) => `Item #- ${i}`);
  // Long Sentences
  items_long = Array.from({ length: 100 }).map((_, i) => `Item #- .  ${i}`);
  positions: ConnectionPositionPair[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ];
  @ViewChild('childDiv', { static: false }) childDiv: ElementRef | undefined;
  open: any;

  constructor(private renderer: Renderer2) {}

  onItemSelected(selectedValue: any) {
    console.log('Selected item:', selectedValue.target.value);
  }

  getParentWidth(): number {
    return this.sourceWidth;
  }

  isChildWidthExceeded(): boolean {
    const parentWidth = this.getParentWidth();
    const childWidth = this.childDiv?.nativeElement.offsetWidth;
    return childWidth > parentWidth;
  }

  getDynamicWidthClass(): string {
    if (!this.isChildWidthExceeded()) {
      const dynamicWidth = this.getParentWidth();
      return dynamicWidth + 'px';
    }
    return '';
  }

  sourceWidth: number = 0;

  openOverlay($event: any) {
    this.sourceWidth = $event.target.offsetWidth;
    this.isOpen = !this.isOpen;
  }

  normalWidth() {
    this.renderer.addClass(this.childDiv?.nativeElement, 'w-max');
  }

  expandedWidth() {
    this.renderer.addClass(
      this.childDiv?.nativeElement,
      'w-' + this.getParentWidth() + 'px'
    );
  }
}
