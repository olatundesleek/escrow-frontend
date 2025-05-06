// types/react-slick.d.ts
declare module "react-slick" {
  import * as React from "react";

  export interface ResponsiveObject {
    breakpoint: number;
    settings: Partial<Settings>;
  }

  export interface CustomArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  }

  export interface Settings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    centerMode?: boolean;
    centerPadding?: string;
    cssEase?: string;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    edgeFriction?: number;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: "ondemand" | "progressive";
    nextArrow?: React.ReactNode;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    prevArrow?: React.ReactNode;
    responsive?: ResponsiveObject[];
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    waitForAnimate?: boolean;
    afterChange?: (currentSlide: number) => void;
    beforeChange?: (currentSlide: number, nextSlide: number) => void;
    onEdge?: (swipeDirection: string) => void;
    onInit?: () => void;
    onLazyLoad?: (slidesToLoad: number[]) => void;
    onReInit?: () => void;
    slickGoTo?: number;
  }

  export interface SliderMethods {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slideNumber: number, dontAnimate?: boolean): void;
  }

  const Slider: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Settings> &
      React.RefAttributes<SliderMethods> &
      React.PropsWithChildren<Children>
  >;
  export default Slider;
}
