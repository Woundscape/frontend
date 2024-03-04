export interface ICanvasPath {
  drawMode: boolean;
  paths: any;
  strokeColor: string;
  strokeWidth: number;
}

export enum CANVAS_TOOLS {
  NONE = "none",
  PEN = "pen",
  ERASER = "eraser",
}

export enum CANVAS_POINTER {
  NONE = "none",
  MOUSE = "mouse",
}
