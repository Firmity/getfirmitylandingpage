import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Shared page-width wrapper. One place to change the site's measure
 * instead of repeating max-w-* + px-* on every section.
 */
export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[1180px] px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
