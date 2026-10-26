import type { ReactNode } from "react";

/** Shared form primitives for the contact form and the survey dialog. */

export const inputClass =
  "block h-10 w-full rounded-md border bg-white px-3 text-[15px] text-ink placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export function borderFor(hasError: boolean): string {
  return hasError ? "border-red" : "border-line-strong";
}

export function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13.5px] font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-[12.5px] text-red">
          {error}
        </p>
      )}
    </div>
  );
}
