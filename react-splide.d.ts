// react-splide.d.ts
declare module '@splidejs/react-splide' {
    import * as React from 'react';
  
    export interface SplideProps {
      options?: object;
      [key: string]: any;
    }
  
    export class Splide extends React.Component<SplideProps> {}
  
    export interface SplideSlideProps {
      className?: string;
      children?: React.ReactNode;
    }
  
    export class SplideSlide extends React.Component<SplideSlideProps> {}
  }
  