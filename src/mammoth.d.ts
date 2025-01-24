declare module 'mammoth' {
  interface Options {
    includeEmbeddedStyleMap?: boolean;
    includeDefaultStyleMap?: boolean;
    styleMap?: string | string[];
    convertImage?: any;
  }
  
  interface Result {
    value: string;
    messages: string[];
  }

  function convertToHtml(input: { arrayBuffer: ArrayBuffer }, options?: Options): Promise<Result>;
}
