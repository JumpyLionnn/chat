import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input()
  public placeholder: string = "";
  @Input()
  public autofocus: boolean = false;

  @ViewChild("textarea", {static: true})
  private textareaDivRef: ElementRef<HTMLDivElement>;

  @Output("submit")
  private submitEvent: EventEmitter<void> = new EventEmitter();
  @Output("change")
  private changeEvent: EventEmitter<{value: string}> = new EventEmitter();

  private readonly maxVisibleRowAmount = 6;
  private readonly isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  constructor() { }

  ngOnInit(): void {
    if(this.autofocus)
      this.textareaDivRef.nativeElement.focus();
    this.setMaxHeight();
  }

  public onInput(){
    const textarea = this.textareaDivRef.nativeElement;
    this.changeEvent.emit({value: textarea.innerText});
  }


  public onKeyDown(event: KeyboardEvent){
    if(event.key === "Enter"){
      const textarea = this.textareaDivRef.nativeElement;
      if(event.shiftKey || this.isMobile){
        const lines = textarea.innerText.split("\n").length;
        if(lines >= 10){
          event.preventDefault();
        }
      }
      else if(!event.repeat){
        textarea.innerHTML = "";
        this.submitEvent.emit();
        event.preventDefault();
      }
      
    }
  }

  private setMaxHeight(){
    const computedStyle = window.getComputedStyle(this.textareaDivRef.nativeElement);
    const fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
    const padding = parseFloat(computedStyle.getPropertyValue('padding-top')) + 
      parseFloat(computedStyle.getPropertyValue('padding-bottom'));
    const borderWidth = parseFloat(computedStyle.getPropertyValue("border-width"));
    this.textareaDivRef.nativeElement.style.maxHeight =  (fontSize * 1.5 * (this.maxVisibleRowAmount - 1) + padding + borderWidth * 2) + "px";
  }

  private setCurrentCursorPosition(chars: number) {
    if (chars >= 0) {
        const selection = window.getSelection();

        const range = this.createRange(this.textareaDivRef.nativeElement, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

  
  private createRange(node: ChildNode, chars: {count: number}, range: Range = null) {
      if (!range) {
          range = document.createRange()
          range.selectNode(node);
          range.setStart(node, 0);
      }

      if (chars.count === 0) {
          range.setEnd(node, chars.count);
      } 
      else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
              chars.count -= node.textContent.length;
            } 
            else {
              range.setEnd(node, chars.count);
              chars.count = 0;
            }
        } 
        else {
          for (let i = 0; i < node.childNodes.length; i++) {
              range = this.createRange(node.childNodes[i], chars, range);

              if (chars.count === 0) {
                  break;
              }
            }
        }
      } 

      return range;
  };

  
  private getCurrentCaretPosition() {
    const selection = window.getSelection();
    let charCount = -1;
    let node: HTMLElement;
    
    if (selection.focusNode) {
      if (this.isChildOf(<HTMLElement>selection.focusNode)) {
        node = <HTMLElement>selection.focusNode; 
        charCount = selection.focusOffset;
        console.log(selection.anchorNode);
        
        while (node) {
          if (node.id === this.textareaDivRef.nativeElement.id) {
            break;
          }
          if (node.previousSibling !== null) {
            node = <HTMLElement>node.previousSibling;
            charCount += node.textContent.length;
          } 
          else {
            node = <HTMLElement>node.parentNode;
            if (node === null) {
              break;
            }
          }
        }
      }
    }
    
    return charCount;
  };
  
  private isChildOf(node: HTMLElement) {
    while (node !== null) {
        if (node.id === this.textareaDivRef.nativeElement.id) {
            return true;
        }
        node = <HTMLElement>node.parentNode;
    }

    return false;
  };
}
