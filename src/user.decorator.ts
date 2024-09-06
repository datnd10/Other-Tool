import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        request.user = { id: 1, name: 'Jane Done' };
        return request.user;
    },
);
