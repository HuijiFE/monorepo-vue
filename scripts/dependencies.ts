/**
 * Force upgrade all dependencies
 */
// tslint:disable:no-any no-unsafe-any
import fs from 'fs';
import globby from 'globby';
import execa from 'execa';
import { genPathResolve } from '@huiji/shared-utils';

const resolvePath = genPathResolve(__dirname, '..');

const excludes = ['jest', '@types/jest'];

async function load(file: string): Promise<[string[], string[]]> {
  return new Promise<[string[], string[]]>((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf-8' }, (error, content) => {
      if (error) {
        return reject(error);
      }
      const pkg = JSON.parse(content);

      return resolve([
        Object.keys(pkg.dependencies || {}).filter(m => !excludes.includes(m)),
        Object.keys(pkg.devDependencies || {}).filter(m => !excludes.includes(m)),
      ]);
    });
  });
}

(async () => {
  const packagesDir = resolvePath('packages');
  const pkgJsons = await globby([
    resolvePath('package.json'),
    resolvePath('packages', '*', 'package.json'),
    resolvePath('packages', '@*', '*', 'package.json'),
  ]);
  pkgJsons.sort();
  const commands: string[] = [];

  for (const file of pkgJsons) {
    const cwd = file.replace(/\/package.json$/, '');
    const [dependencies, devDependencies] = await load(file);

    if (dependencies.length > 0) {
      const command = [
        ['yarn', '--cwd', cwd, 'add', '-W'].join(' '),
        ...dependencies,
      ].join(' \\\n  ');
      commands.push(command);
    }
    if (devDependencies.length > 0) {
      const command = [
        ['yarn', '--cwd', cwd, 'add', '-WD'].join(' '),
        ...devDependencies,
      ].join(' \\\n  ');
      commands.push(command);
    }
  }

  commands.push('rm yarn.lock', 'yarn');

  console.info(commands.join('\n\n'));

  return new Promise<void>((resolve, reject) =>
    fs.writeFile(resolvePath('.tmp.sh'), `${commands.join('\n\n')}\n`, error =>
      error ? reject(error) : resolve(),
    ),
  );
})();
