import { useEffect, useRef, MouseEvent } from "react";

type OnDrawFunction = (ctx: CanvasRenderingContext2D, point: { x: number; y: number }, prevPoint: { x: number; y: number } | null) => void;

interface UseOnDrawProps {
  onDraw: OnDrawFunction;
}

interface UseOnDrawResult {
  setCanvasRef: (ref: HTMLCanvasElement | null) => void;
  onCanvasMouseDown: () => void;
}

export function useOnDraw({ onDraw }: UseOnDrawProps): UseOnDrawResult {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const prevPointRef = useRef<{ x: number; y: number } | null>(null);

  const mouseMoveListenerRef = useRef<EventListener | null>(null);
  const mouseUpListenerRef = useRef<EventListener | null>(null);

  function setCanvasRef(ref: HTMLCanvasElement | null) {
    canvasRef.current = ref;
  }

  function onCanvasMouseDown() {
    isDrawingRef.current = true;
  }

  useEffect(() => {
    function computePointInCanvas(clientX: number, clientY: number): { x: number; y: number } | null {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top
        };
      } else {
        return null;
      }
    }

    function initMouseMoveListener() {
      const mouseMoveListener: EventListener = (e: MouseEvent) => {
        if (isDrawingRef.current && canvasRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY);
          const ctx = canvasRef.current.getContext('2d');
          if (onDraw) onDraw(ctx, point, prevPointRef.current);
          prevPointRef.current = point;
          console.log(point);
        }
      };
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);
    }

    function initMouseUpListener() {
      const listener: EventListener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      };
      mouseUpListenerRef.current = listener;
      window.addEventListener("mouseup", listener);
    }

    function cleanup() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    }

    initMouseMoveListener();
    initMouseUpListener();
    return () => cleanup();
  }, [onDraw]);

  return {
    setCanvasRef,
    onCanvasMouseDown
  };
}
