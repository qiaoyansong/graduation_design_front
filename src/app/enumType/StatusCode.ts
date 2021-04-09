export enum StatusCode {
    /**
    * 发生请求参数校验失败异常
    */
    VALID_EXCEPTION = "100",
    /**
     * 邮件发送失败
     */
    SEND_EMAIL_FAILED = "101",
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
    VERIFICATION_CODE_NOT_EXPIRED = "104",
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
    * 用户名不存在
    */
    USERNAME_IS_NOT_EXISTS = "110",
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
    SUCCESS = "200",
    /**
     * 密码错误
     */
    WRONG_PASSWORD = "111",
    /**
     * 别处登录，如果不是自己操作需要修改密码
     */
    LOGIN_ELSEWHERE = "112",
    /**
    * 权限不足
    */
    INSUFFICIENT_PERMISSIONS = "113",
    /**
     * 与绑定邮箱不一致
     */
    MAILBOX_ERROR = "114",
    /**
    * 用户未登录
    */
    USER_IS_NOT_LOGGED_IN = "115",
    /**
     * 文章标题已经存在
     */
    NEWS_TITLE_IS_EXISTS = "116",
    /**
     * 已经参加过该活动，请勿重复参加
     */
    REPEAT_THE_EVENT = "117",
    /**
     * 积分不足
     */
     INSUFFICIENT_POINTS = "118",
     /**
      * 库存不足
      */
     OUT_OF_STOCK = "119"
}