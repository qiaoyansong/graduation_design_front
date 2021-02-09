export enum StatusCode{
     /**
     * 发生请求参数校验失败异常
     */
    VALID_EXCEPTION = "100",
    /**
     * 邮件发送失败
     */
    SEND_EMAIL_FAILED =  "101",
    /**
     * 邮件发送成功
     */
    SEND_EMAIL_SUCCESS = "102",
    /**
     * 生成验证码成功
     */
    CREATE_VERIFICATION_CODE_COMPLETE = "103",
    /**
     * 验证码未失效，不再生成新的验证码
     */
    VERIFICATION_CODE_NOT_EXPIRED =  "104",
     /**
     * 验证码失效，需要用户重新申请验证码
     */
    VERIFICATION_CODE_FAILURE = "105",
    /**
     * 验证码验证失败，请到邮箱查看验证码
     */
    VERIFICATION_CODE_VERIFICATION_FAILED = "106",
    /**
     * 用户名已经存在
     */
    USERNAME_IS_EXISTS = "107",
    /**
     * 邮箱已经存在
     */
    MAILBOX_IS_EXISTS = "108",
    /**
     * 系统发生未知错误
     */
    UNKNOWN_ERROR = "109",
    /**
     * 成功
     */
    SUCCESS = "200"
}