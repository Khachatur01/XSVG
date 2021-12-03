import {XDrawable} from "../XDrawable";
import {XElement} from "../../../element/XElement";
import {XSVG} from "../../../XSVG";
import {Point} from "../../../model/Point";

export abstract class MoveDraw implements XDrawable {
  protected container: XSVG | null = null;
  private perfectMode: boolean = false;
  protected startPos: Point = {x: 0, y: 0}

  private drawStart = this._onStart.bind(this);
  private draw = this._onDraw.bind(this);
  private drawEnd = this._onEnd.bind(this);

  private drawableElement: XElement | null = null;

  private _onStart(event: MouseEvent) {
    if(!this.container) return;

    let containerRect = this.container.HTML.getBoundingClientRect();
    if(!containerRect) return;

    this.drawableElement = this.onStart(containerRect, event);
    this.container.add(this.drawableElement);
    this.container.HTML.addEventListener('mousemove', this.draw);
    this.container.drawTool.drawing();
  }
  private _onDraw(event: MouseEvent) {
    if(!this.container) return;

    let containerRect = this.container.HTML.getBoundingClientRect();
    if(!this.drawableElement || !containerRect) return;
    this.onDraw(containerRect, event, this.drawableElement, this.perfectMode);

    /* calculate and set bounding box position and size */
    this.container?.focused.fit();

  }
  private _onEnd(event: MouseEvent) {
    if(!this.container) return;

    this.container.HTML.removeEventListener('mousemove', this.draw);

    let containerRect = this.container.HTML.getBoundingClientRect();

    /* if element isn't drawn */
    if(this.drawableElement && containerRect && this.onEnd(containerRect, event, this.drawableElement)) {
      this.container.blur();
      this.container.focus(this.drawableElement);
    }
    this.container.drawTool.drawingEnd();
    this.drawableElement = null;
  }

  abstract onStart(containerRect: DOMRect, event: MouseEvent): XElement;
  onDraw(containerRect: DOMRect, event: MouseEvent, xElement: XElement, perfectMode: boolean): void {
    let width = event.clientX - containerRect.left - this.startPos.x;
    let height = event.clientY - containerRect.top - this.startPos.y;

    if(perfectMode) {
      let averageSize = (Math.abs(width) + Math.abs(height)) / 2
      if(width < 0)
        width = -averageSize;
      else
        width = averageSize;
      if(height < 0)
        height = -averageSize;
      else
        height = averageSize;
    }

    xElement.size = {
      width: width,
      height: height
    };
  };
  onEnd(containerRect?: DOMRect, event?: MouseEvent, xElement?: XElement): boolean {
    if(!xElement?.isComplete()) {
      xElement?.remove();
      return false;
    } else {
      return true;
    }
  };

  start(container: XSVG): void {
    this.container = container;
    container.HTML.addEventListener('mousedown', this.drawStart);
    document.addEventListener('mouseup', this.drawEnd);
  }

  stop(): void {
    this.container?.HTML.removeEventListener('mousemove', this.draw);
    this.container?.HTML.removeEventListener('mousedown', this.drawStart);
    document.removeEventListener('mouseup', this.drawEnd);
  }

  set perfect(mode: boolean) {
    this.perfectMode = mode;
  }

}
