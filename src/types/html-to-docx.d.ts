declare module 'html-to-docx' {
  interface HtmlToDocxOptions {
    margin?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    orientation?: 'portrait' | 'landscape';
  }

  export default function HTMLToDocx(
    html: string,
    options?: HtmlToDocxOptions
  ): Promise<Buffer>;
}
