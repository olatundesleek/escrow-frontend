"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaSpinner } from "react-icons/fa";

interface ButtonIconProps {
  children: React.ReactNode;
  onClick?: React.Dispatch<boolean> | (() => void);
  isActive?: boolean;
  style?: string;
  toolTip?: string;
  tipPosition?: "top" | "bottom" | "left" | "right";
  isLoading?: boolean;
  ariaLabel?: string;
}

export default function ButtonIcon({
  children,
  onClick,
  isActive = false,
  style = "",
  toolTip,
  tipPosition = "top",
  isLoading = false,
  ariaLabel = "",
}: ButtonIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [actualPosition, setActualPosition] = useState<
    "top" | "bottom" | "left" | "right"
  >(tipPosition);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Calculate tooltip position and adjust if near screen edges
  useEffect(() => {
    if (showTooltip && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const padding = 12; // gap from button
      let top = 0;
      let left = 0;
      let chosenPosition = tipPosition;

      switch (tipPosition) {
        case "top":
          top = rect.top + window.scrollY - padding;
          left = rect.left + rect.width / 2 + window.scrollX;
          if (top < 0) chosenPosition = "bottom"; // flip if clipped
          break;
        case "bottom":
          top = rect.bottom + window.scrollY + padding;
          left = rect.left + rect.width / 2 + window.scrollX;
          if (top + 40 > window.innerHeight) chosenPosition = "top";
          break;
        case "left":
          top = rect.top + rect.height / 2 + window.scrollY;
          left = rect.left + window.scrollX - padding;
          if (left < 0) chosenPosition = "right";
          break;
        case "right":
          top = rect.top + rect.height / 2 + window.scrollY;
          left = rect.right + window.scrollX + padding;
          if (left + 150 > window.innerWidth) chosenPosition = "left";
          break;
      }

      setTooltipPos({ top, left });
      setActualPosition(chosenPosition);
    }
  }, [showTooltip, tipPosition]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => onClick && onClick(!isActive)}
        type='button'
        className={`relative p-2 border border-db-border cursor-pointer 
          rounded-lg transition-all duration-300 ease-in-out mx-0.5 
          focus:outline-none focus:ring-2 focus:ring-db-primary lg:hover:bg-db-primary lg:hover:text-db-surface 
          ${
            isActive
              ? 'bg-db-primary text-db-surface'
              : 'bg-db-background text-db-primary'
          } 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} 
          ${style}`}
        disabled={isLoading}
        aria-label={ariaLabel}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)} // accessibility
        onBlur={() => setShowTooltip(false)}
      >
        {isLoading ? <FaSpinner className='h-4 w-4 animate-spin' /> : children}
      </button>

      {/* Tooltip via Portal */}
      {toolTip &&
        showTooltip &&
        createPortal(
          <div
            className={`absolute z-[9999] px-3 py-1.5 rounded-md shadow-lg 
              bg-db-primary text-white text-xs font-medium pointer-events-none border border-db-border 
              opacity-0 scale-95 animate-fadeIn`}
            style={{
              position: 'absolute',
              top: tooltipPos.top,
              left: tooltipPos.left,
              transform:
                actualPosition === 'top'
                  ? 'translate(-50%, -100%)'
                  : actualPosition === 'bottom'
                  ? 'translate(-50%, 0%)'
                  : actualPosition === 'left'
                  ? 'translate(-100%, -50%)'
                  : 'translate(0%, -50%)',
            }}
          >
            {toolTip}
            {/* Arrow */}
            <span
              className={`absolute w-2 h-2 bg-db-primary rotate-45`}
              style={{
                [actualPosition === 'top'
                  ? 'bottom'
                  : actualPosition === 'bottom'
                  ? 'top'
                  : actualPosition === 'left'
                  ? 'right'
                  : 'left']: '-4px',
                top:
                  actualPosition === 'left' || actualPosition === 'right'
                    ? '50%'
                    : undefined,
                left:
                  actualPosition === 'top' || actualPosition === 'bottom'
                    ? '50%'
                    : undefined,
                transform:
                  actualPosition === 'left' || actualPosition === 'right'
                    ? 'translateY(-50%)'
                    : 'translateX(-50%)',
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
