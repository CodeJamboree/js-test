import { Module, ModuleList } from "./getModules";

export const isModule = (value: ModuleList | Module): value is Module => {
  return 'imported' in value && 'filePath' in value && typeof value.filePath === 'string';
}