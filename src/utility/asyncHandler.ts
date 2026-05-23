import type { NextFunction, Request, Response, RequestHandler } from "express"

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>

const asyncHandler = (callback: AsyncFunction): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncHandler