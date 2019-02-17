import { MetaData, mergeMetaData } from './meta-data';
import { mergeCustomMetaData } from './meta-data-custom';
/**
 * Contents for HTML <head> element.
 */
export interface HeadData {
  /**
   * defines the document's title that is shown in a browser's title bar or a page's tab.
   */
  title?: string;
  meta?: MetaData;
  customMeta?: Record<string, string>;
}

const filterMeta = <T>(meta: T | undefined): meta is T =>
  !(meta && typeof meta === 'object' && !Array.isArray(meta));

/**
 * Create a function to merge a set of `HeadData`.
 * @param defaultHead the default `HeadData`
 * @param separator the separator text for joining title
 */
export function mergeHeadDataFunction(
  defaultHead?: HeadData,
  separator: string = ' | ',
): (headArray: HeadData[]) => HeadData {
  return headArray => {
    const headArrayConcat = defaultHead ? [defaultHead].concat(headArray) : headArray;

    return {
      title: headArrayConcat
        .map(one => one.title)
        .filter(t => !!t)
        .join(separator),
      meta: mergeMetaData(headArrayConcat.map(one => one.meta).filter(filterMeta)),
      customMeta: mergeCustomMetaData(
        headArrayConcat.map(one => one.customMeta).filter(filterMeta),
      ),
    };
  };
}
