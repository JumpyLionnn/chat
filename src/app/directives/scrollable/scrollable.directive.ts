import { ComponentRef, Directive, OnInit, AfterViewChecked, Renderer2, ViewContainerRef } from '@angular/core';
import {ScrollDownButtonComponent} from './scroll-down-button/scroll-down-button.component'

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective implements OnInit, AfterViewChecked {
  public adjustNextTime: boolean = false;

  private scrollDownButtonRef: ComponentRef<ScrollDownButtonComponent>;
  private scrollableContainer: HTMLDivElement;

  constructor(private viewContainerRef: ViewContainerRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.scrollDownButtonRef = this.viewContainerRef.createComponent(ScrollDownButtonComponent);
    this.scrollDownButtonRef.instance.scrollDownEvent.subscribe(()=>{this.scrollDown();});
    this.renderer.listen(this.viewContainerRef.element.nativeElement, 'scroll', () => {this.checkScrollDownButton();});
    this.scrollableContainer = this.viewContainerRef.element.nativeElement;
  }
  
  public ngAfterViewChecked(){
    if(this.adjustNextTime){
      // adjusting scroll
      this.scrollableContainer.scrollTop = this.scrollableContainer.scrollHeight;
      this.adjustNextTime = false;
    }
  }

  public adjustScroll(){
    this.adjustNextTime = this.scrollableContainer.scrollTop + this.scrollableContainer.clientHeight >= this.scrollableContainer.scrollHeight - 250;
  }

  private scrollDown(){
    this.viewContainerRef.element.nativeElement.scrollTo({
      top: this.viewContainerRef.element.nativeElement.scrollHeight, 
      behavior: "smooth"
    });
  }

  public checkScrollDownButton(){
    const shouldShow = this.scrollableContainer.scrollTop + this.scrollableContainer.clientHeight < this.scrollableContainer.scrollHeight - 250;
    if(shouldShow){
      this.scrollDownButtonRef.instance.showScrollDownButton = true;
      this.scrollDownButtonRef.instance.shrinkScrollDownButton = false;
    }
    else if(this.scrollDownButtonRef.instance.showScrollDownButton !== shouldShow){
      this.scrollDownButtonRef.instance.shrinkScrollDownButton = true;
      setTimeout(() => {
        // calculating the result again to see if it got changed
        this.scrollDownButtonRef.instance.showScrollDownButton = this.scrollableContainer.scrollTop + this.scrollableContainer.clientHeight < this.scrollableContainer.scrollHeight - 250;
        this.scrollDownButtonRef.instance.shrinkScrollDownButton = false;
      }, 250/* animation time */);
    } 
  }
}
