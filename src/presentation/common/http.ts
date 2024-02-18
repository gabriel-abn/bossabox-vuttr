export type HttpRequest<T = any> = {
  data?: T;
  query?: any;
};

export type HttpResponse = {
  body: any;
  status: number;
  success: boolean;
};

export const ok = (body: any, status: number = 200): HttpResponse => ({
  body,
  status,
  success: true,
});

export const badRequest = (body: any, status: number = 400): HttpResponse => ({
  body,
  status,
  success: false,
});

export const serverError = (body: any, status: number = 500): HttpResponse => ({
  body,
  status,
  success: false,
});
