export const parseErrorStack = (stack) => {
  if (!stack) {
    return
  }

  return String(stack)
    .replace(/([\s]{4}at[\s]{1})/gi, '🔥 ')
    .split(/\n/)
}
