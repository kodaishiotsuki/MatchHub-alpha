//非同期処理
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
