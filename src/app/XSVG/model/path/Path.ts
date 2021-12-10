import {Command} from "./Command";
import {Point} from "../Point";

export class Path {
  private commands:Command[] = [];

  get points(): Point[] {
    let points: Point[] = [];
    for(let command of this.commands)
      points.push(command.point);
    return points;
  }
  getAll(): Command[] {
    return this.commands;
  }
  setAll(commands: Command[]) {
    this.commands = commands;
  }
  get(index: number): Command {
    if(index < 0)
      index = this.commands.length - index;

    return this.commands[index];
  }
  set(index: number, command: Command) {
    if(index < 0)
      index = this.commands.length - index;

    this.commands[index] = command;
  }
  add(command: Command) {
    this.commands.push(command);
  }
  remove(index: number) {
    if(index < 0)
      index = this.commands.length - index;

    this.commands = this.commands.splice(index, 1);
  }

  toString(close: boolean = false): string {
    let result = "";
    for(let command of this.commands) {
      result += command.command + " ";
    }
    if(close)
      return result + "Z";
    else {
      return result.trimRight();
    }
  }
}
