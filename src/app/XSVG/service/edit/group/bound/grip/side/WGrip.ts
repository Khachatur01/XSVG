import {XGrip} from "../XGrip";
import {Point} from "../../../../../../model/Point";
import {XSVG} from "../../../../../../XSVG";
import {Rect} from "../../../../../../model/Rect";

export class WGrip extends XGrip {
  constructor(container: XSVG) {
    super(container, "ew-resize");
  }

  setPosition(points: Point[]): void {
    let x = Math.abs(points[3].x + points[0].x) / 2;
    let y = Math.abs(points[3].y + points[0].y) / 2;
    this.position = {
      x: x - this.side,
      y: y - this.side / 2
    }
  }

  protected onEnd(): void {
  }

  protected onMove(containerRect: Rect, event: MouseEvent): void {
    let elementRect = this.container.focused.lastRect;
    let width = (event.clientX - containerRect.x) - (elementRect.x + elementRect.width);

    this.container.focused.setSize({
      x: elementRect.x + elementRect.width,
      y: elementRect.y,
      width: width,
      height: elementRect.height
    });
  }

  protected onStart(): void {
  }
}
