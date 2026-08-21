import {
  Droplets,
  Flame,
  Wrench,
  CalendarClock,
  Box,
  IdCard,
  Activity,
  UserCheck,
  ShieldOff,
  Eraser,
  CircleOff,
  Home,
  Building2,
  Factory,
  HeartPulse,
  GraduationCap,
  Hotel,
  type LucideIcon,
} from "lucide-react";

/**
 * String → icon map so content.ts can reference icons by name without
 * importing React components into plain data. Add new keys here as
 * new sections need them.
 */
export const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  flame: Flame,
  wrench: Wrench,
  "calendar-clock": CalendarClock,
  box: Box,
  "id-card": IdCard,
  activity: Activity,
  "user-check": UserCheck,
  "shield-off": ShieldOff,
  eraser: Eraser,
  "circle-off": CircleOff,
  home: Home,
  "building-2": Building2,
  factory: Factory,
  "heart-pulse": HeartPulse,
  "graduation-cap": GraduationCap,
  hotel: Hotel,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Activity;
}
