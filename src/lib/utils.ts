import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleepDate(dateObj: Date) {
  let formatted: string | number = 0;
  let pm = false;

  if (dateObj.getHours() > 12) {
    formatted = dateObj.getHours() - 12;
    pm = true;
  } else if (dateObj.getHours() < 12 && dateObj.getHours() != 0) {
    formatted = dateObj.getHours();
  } else if (dateObj.getHours() == 0) {
    formatted = 12;
  } else if (dateObj.getHours() == 12) {
    formatted = 12;
    pm = true;
  }
  if (dateObj.getMinutes() < 10) {
    formatted = formatted + ':0' + dateObj.getMinutes();
  } else {
    formatted = formatted + ':' + dateObj.getMinutes();
  }
  if (pm) {
    formatted = formatted + ' PM';
  } else {
    formatted = formatted + ' AM';
  }

  return formatted;
}
