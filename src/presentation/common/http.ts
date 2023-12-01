export type HttpResponse = {
  body: any;
  status: number;
  success: boolean;
};

export const ok = (body: any): HttpResponse => ({
  body,
  status: 200,
  success: true,
});

export const badRequest = (body: any): HttpResponse => ({
  body,
  status: 400,
  success: false,
});

export const serverError = (body: any): HttpResponse => ({
  body,
  status: 500,
  success: false,
});
