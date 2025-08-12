import { Response } from 'express';


export function respondWithError(res: Response, code: number, message: string) {
  return res.status(code).json({
    success: false,
    message: message
  });
}

export function respondWithSuccess(res: Response, code: number, data: any) {
  return res.status(code).json({
    success: true,
    data: data
  });
}


export function getYearRange(year: number) {
  return {
    start: new Date(year, 0, 1),
    end: new Date(year + 1, 0, 1)
  };
}
