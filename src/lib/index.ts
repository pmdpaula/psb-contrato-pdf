export function randomCuid2() {
  const timestamp = Date.now().toString(36);
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join("");
  return timestamp + randomPart;
}
