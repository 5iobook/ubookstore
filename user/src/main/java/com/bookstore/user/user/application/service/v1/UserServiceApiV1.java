package com.bookstore.user.user.application.service.v1;

import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSigninDtoApiV1;
import com.bookstore.user.user.application.dto.v1.req.ReqUserPostSignupDtoApiV1;
import com.bookstore.user.user.application.dto.v1.res.ResTokenDtoApiV1;

public interface UserServiceApiV1 {

    void signUp(ReqUserPostSignupDtoApiV1 dto);

    ResTokenDtoApiV1 signIn(ReqUserPostSigninDtoApiV1 dto);

}
