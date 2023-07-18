
import {ClassValue,clsx} from 'clsx';
import { twMerge } from 'tailwind-merge';
//
// clsx is generally used to handle dynamic classname 
//classValue is the type of argument and rest operator make sure to take any number of arguments
//tailwind-merge utility function twMerge combine and optimize  multiple classname
export function cn(...inputs:ClassValue[]){
return twMerge(clsx(inputs));
}