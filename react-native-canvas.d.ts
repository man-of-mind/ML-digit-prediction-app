declare module 'react-native-canvas' {
    import { Component } from 'react';
    
    export interface CanvasProps {
      style?: object;
      width?: number;
      height?: number;
      ref?: (canvas: Canvas | null) => void;
    }
  
    export default class Canvas extends Component<CanvasProps> {
      getContext(contextType: '2d'): CanvasRenderingContext2D;
      toDataURL(type: string): Promise<string>;
      addEventListener(event: string, handler: (e: any) => void): void;
    }
  }
  