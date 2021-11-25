import {XSVG} from "../../XSVG";
import {Point} from "../../model/Point";
import {XGroup} from "../edit/group/XGroup";
import {XDraggable} from "./XDraggable";

export class XDragTool {
  private draggableElement: XDraggable | null = null;
  private isDrag: boolean = false;
  private container: XSVG;

  private mouseStartPos: Point = {x: 0, y: 0};
  private elementStartPos: Point = {x: 0, y: 0};

  private dragStart = this.onDragStart.bind(this);
  private drag = this.onDrag.bind(this);
  private dragEnd = this.onDragEnd.bind(this);

  constructor(container: XSVG) {
    this.container = container;
  }

  set draggable(draggableElement: XGroup | null) {
    this.draggableElement = draggableElement;
  }

  private onDragStart(event: MouseEvent) {
    if(!this.container.focused) return;

    this.draggableElement = this.container.focused;
    this.mouseStartPos.x = event.clientX;
    this.mouseStartPos.y = event.clientY;
    this.elementStartPos = this.draggableElement?.position as Point;

    this.container.HTML.addEventListener("mousemove", this.drag);
  }
  private onDrag(event: MouseEvent) {
    if(!this.draggableElement) return;

    let newX = this.elementStartPos.x + event.clientX - this.mouseStartPos.x;
    let newY = this.elementStartPos.y + event.clientY - this.mouseStartPos.y;
    this.draggableElement.position = {x: newX, y: newY} as Point;
    this.container.focused?.highlight();

  }
  private onDragEnd(){
    this.container.HTML.removeEventListener("mousemove", this.drag);
    this.container.focused?.lowlight();
  }

  public on(): void {
    this.isDrag = true;
    this.container.HTML.addEventListener("mousedown", this.dragStart);
    document.addEventListener("mouseup", this.dragEnd);
  }

  public off(): void {
    this.isDrag = false;
    this.container.HTML.removeEventListener("mousedown", this.dragStart);
    this.container.HTML.removeEventListener("mousemove", this.drag);
    document.removeEventListener("mouseup", this.dragEnd);
  }

  public isOn(): boolean {
    return this.isDrag;
  }
}
