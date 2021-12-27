import {Point} from "../model/Point";
import {Size} from "../model/Size";
import {XResizeable} from "../service/edit/resize/XResizeable";
import {Rect} from "../model/Rect";
import {XDraggable} from "../service/tool/drag/XDraggable";

export abstract class XElement implements XResizeable, XDraggable {
  public static readonly svgURI: "http://www.w3.org/2000/svg" = "http://www.w3.org/2000/svg";

  protected style: any = {
    fill: "none",
    stroke: "#24ff24",
    highlight: "red",
    strokeWidth: 10
  }
  protected _lastPosition: Point = {x: 0, y: 0};
  protected _lastSize: Size = {width: 0, height: 0};

  protected _angle: number = 0;
  protected _refPoint: Point = {x: 0, y: 0};

  protected svgElement: SVGElement = document.createElementNS(XElement.svgURI, "rect"); // default element

  private _highlight = this.highlight.bind(this);
  private _lowlight = this.lowlight.bind(this);

  abstract get size(): Size;
  abstract setSize(rect: Rect): void;
  abstract isComplete(): boolean;
  abstract get position(): Point;
  abstract set position(delta: Point);
  abstract get points(): Point[];

  get center(): Point {
    let position = this.position;
    let size = this.size;

    return {
      x: position.x + size.width / 2,
      y: position.y + size.height / 2
    }
  }

  get refPoint(): Point {
    return this._refPoint;
  }
  set refPoint(refPoint: Point) {
    this.svgElement.style.transformOrigin = refPoint.x + "px " + refPoint.y + "px";
    this._refPoint = refPoint;
  }

  get angle(): number {
    return this._angle;
  }
  rotate(angle: number): void {
    this.svgElement.style.transform = "rotate(" + angle + "deg)";
    this._angle = angle;
  }

  get SVG(): SVGElement {
    return this.svgElement;
  }
  getAttr(attribute: string): string {
    let value = this.SVG.getAttribute(attribute);
    if (!value)
      return "0";
    return value;
  }

  setAttr(attributes: object): void {
    for (const [key, value] of Object.entries(attributes))
      if (key && value)
        this.SVG.setAttribute(key, value + "");
  }

  setStyle(attributes: object): void {
    this.setAttr(attributes);
  }

  setDefaultStyle(): void {
    this.setAttr({
      fill: this.style.fill,
      stroke: this.style.stroke,
      "stroke-width": this.style.strokeWidth
    });
  }

  setOverEvent(): void {
    this.svgElement.addEventListener("mouseover", this._highlight);
    this.svgElement.addEventListener("mouseout", this._lowlight);
  }
  removeOverEvent(): void {
    this.svgElement.removeEventListener("mouseover", this._highlight);
    this.svgElement.removeEventListener("mouseout", this._lowlight);
  }

  remove() {
    this.svgElement.remove();
  }

  highlight(): void {
    this.setAttr({
      stroke: this.style.highlight
    });
  }

  lowlight(): void {
    this.setAttr({
      stroke: this.style.stroke
    });
  }

  fixRect(): void {
    this._lastPosition = this.position;
    this._lastSize = this.size;
  }
  fixPosition(): void {
    this._lastPosition = this.position;
  }
  fixSize(): void {
    this._lastSize = this.size;
  }
  get lastRect(): Rect {
    return {
      x: this._lastPosition.x,
      y: this._lastPosition.y,
      width: this._lastSize.width,
      height: this._lastSize.height
    }
  }

  centerRefPoint() {
    this.refPoint = {
      x: this._lastPosition.x + this._lastSize.width / 2,
      y: this._lastPosition.y + this._lastSize.height / 2
    };
  }
}


