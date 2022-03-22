//非同期処理
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//ファイル名前が被らないように
export function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}