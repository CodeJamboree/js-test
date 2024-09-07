import { Module, ModuleList } from "./getModules";

export const isModule = (value: ModuleList | Module): value is Module => {
  return Object.keys(value).some(key => typeof value[key] === 'function');
}