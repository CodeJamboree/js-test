import fs from 'fs';
import path from 'path';

export type Module = {
  file: string,
  name: string,
  filePath: string,
  imported: Record<string, Function>
}
export type ModuleList = {
  [key: string]: ModuleList | Module
}

export const getModules = async (dir: fs.PathLike, pattern: RegExp, replacement: string | ((substring: string, ...args: any[]) => string) | undefined): Promise<ModuleList | undefined> => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  if (files.length === 0) return;

  const modules: ModuleList = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir.toString(), file);
    if (fs.lstatSync(filePath).isDirectory()) {
      const children = await getModules(filePath, pattern, replacement);
      if (children) {
        modules[file] = children;
      }
    } else {
      if (pattern.test(file)) {
        let name;
        switch (typeof replacement) {
          case 'string':
            name = file.replace(pattern, replacement);
            break;
          case 'function':
            name = file.replace(pattern, replacement);
            break;
          default:
            name = file;
            break;
        }
        const fullPath = path.resolve(process.cwd(), filePath);
        const imported = await import(fullPath);
        const module: Module = {
          file,
          name,
          filePath,
          imported
        };
        modules[name] = module;
      }
    }
  }

  if (Object.keys(modules).length === 0) return;
  return modules;
}