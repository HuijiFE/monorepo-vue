import { escape } from './escape';

/**
 * Merge a set of custom meta data.
 * @param metaArray the array of the custom meta data
 */
export function mergeCustomMetaData(
  metaArray: Record<string, string>[],
): Record<string, string> {
  const result: Record<string, string> = {};

  metaArray.forEach(one => {
    Object.assign(result, one);
  });

  return result;
}

/**
 * Render custom meta data to HTML string, for inserting to document.
 * @param meta the custom meta data, key-value object
 * @param indent the indent text, default is 2 spaces
 */
export function renderCustomMetaData(
  meta: Record<string, string>,
  indent: string = '  ',
): string {
  return Object.entries(meta)
    .map(
      ([itemprop, content]) =>
        `${indent}<meta itemprop="${escape(itemprop)}" content="${escape(content)}">`,
    )
    .join('\n');
}
