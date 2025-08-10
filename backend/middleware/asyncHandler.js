const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export default asyncHandler

// https://chatgpt.com/c/677807c3-e218-8001-a298-cc80fa486c1b