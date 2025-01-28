declare module 'html-docx-js' {
  interface HtmlDocx {
    asBlob(html: string): Blob;
  }
  const htmlDocx: HtmlDocx;
  export default htmlDocx;
}
