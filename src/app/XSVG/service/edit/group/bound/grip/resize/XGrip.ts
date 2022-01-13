import {Point} from "../../../../../../model/Point";
import {XSVG} from "../../../../../../XSVG";
import {Rect} from "../../../../../../model/Rect";
import {XBox} from "../../../../../../element/shape/XBox";
import {Matrix} from "../../../../../math/Matrix";

export abstract class XGrip extends XBox {
  private resizing: boolean = false;
  protected _lastResize: Rect = {x: 0, y: 0, width: 0, height: 0};
  private _start = this.start.bind(this);
  private _move = this.move.bind(this);
  private _end = this.end.bind(this);

  protected side: number = 10;
  protected halfSide: number = 5;

  constructor(container: XSVG) {
    super(container, 0, 0, 10, 10);
    this.svgElement.style.cursor = "crosshair";
    this.setAttr({
      fill: "white",
      "stroke-width": 0.8,
      stroke: "#002fff"
    });

    this.svgElement.style.display = "none";
    this.on();
  }

  override highlight() {
    this.setAttr({
      stroke: "#00ff00"
    });
  }
  override lowlight() {
    this.setAttr({
      stroke: "#002fff"
    });
  }

  show() {
    this.svgElement.style.display = "block";
  }
  hide() {
    this.svgElement.style.display = "none";
  }

  abstract setPosition(points: Point[]): void;

  protected abstract onStart(): void;
  protected abstract onMove(client: Point): void;
  protected abstract onEnd(): void;

  private start() {
    this.resizing = true;
    this.container.activeTool.off();
    this.container.focused.fixRect();
    this.container.focused.fixRefPoint();

    this.container.HTML.addEventListener("mousemove", this._move);
    document.addEventListener("mouseup", this._end);
  }
  private move(event: MouseEvent) {
    let containerRect = this.container.HTML.getBoundingClientRect();

    let client: Point = Matrix.rotate(
      [{x: event.clientX - containerRect.x, y: event.clientY - containerRect.y}],
      this.container.focused.refPoint,
      this.container.focused.angle
    )[0];

    this.onMove(client);
  }
  private end() {
    if(!this.resizing) return;

    this.container.HTML.removeEventListener("mousemove", this._move);
    document.removeEventListener("mouseup", this._end);
    this.container.activeTool.on();
    this.resizing = false;
  }

  on() {
    this.svgElement.addEventListener("mousedown", this._start);
  }
  off() {
    this.svgElement.removeEventListener("mousedown", this._start);
  }
}
