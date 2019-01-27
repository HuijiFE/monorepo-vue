/**
 * Auto Generate Files
 */
import { GenFilesOptions, genFiles } from '@huiji/shared-utils';

const optionsList: GenFilesOptions[] = [
  {
    comments: ['All components'],
    patterns: [
      ...['ts', 'tsx'].reduce<string[]>(
        (agg, ext) =>
          agg.concat(
            // includes all ts(x) files,
            `src/components/**/*.${ext}`,
            // excludes all ts(x) files those start with '_'
            `!src/components/**/_*.${ext}`,
          ),
        [],
      ),
    ],
    output: 'src/components/all.ts',
  },
  {
    comments: ['All components style'],
    patterns: ['src/components/**/*.scss'],
    output: 'src/components/all.scss',
  },
];

Promise.all(optionsList.map(genFiles)).catch((e: Error) => {
  console.error(e.message);
  console.error(e.stack);
});
