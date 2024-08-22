import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  console.log(1111)
  console.log(req)
  return req.user;
});
