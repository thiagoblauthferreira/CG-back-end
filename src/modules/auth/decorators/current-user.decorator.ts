import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
  const user = req.user || req.args[0].user || req.args[0].authUser;
  return user;
});
