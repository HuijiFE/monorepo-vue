import { escape } from './escape';

// The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements.
// Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta

/**
 * The `name-content` model for basic metadata content.
 * Utility for SEO.
 * Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name
 */
export interface MetaData {
  /**
   * which defines the name of the document's author.
   */
  author?: string;
  /**
   * which contains a short and accurate summary of the content of the page. Several browsers,
   * like Firefox and Opera, use this as the default description of bookmarked pages.
   */
  description?: string;
  /**
   * which contains the identifier of the software that generated the page.
   */
  generator?: string;
  /**
   * which contains words relevant to the page's content separated by commas.
   */
  keywords?: string[];
}

/**
 * Merge a set of `MetaData`.
 * Values of the next one will overwrite the previous one, except `keywords`.
 * @param metaArray the array of `MetaData`
 */
export function mergeMetaData(metaArray: MetaData[]): MetaData {
  const result: MetaData = {};
  let keywords: string[] = [];
  metaArray.forEach(one => {
    if (one.keywords) {
      keywords = keywords.concat(one.keywords);
    }
    Object.assign(result, one);
  });
  if (keywords.length > 0) {
    result.keywords = keywords;
  }

  return result;
}

/**
 * Render `MetaData` to HTML string, for inserting to document.
 * @param meta the `MetaData`
 * @param indent the indent text, default is 2 spaces
 */
export function renderMetaData(meta: MetaData, indent: string = '  '): string {
  return Object.entries(meta)
    .map(
      ([name, content]) => `${indent}<meta name="${name}" content="${escape(content)}">`,
    )
    .join('\n');
}
