export enum userType{
     /**
     * 普通用户
     */
    GENERAL_USER = 'GENERAL_USER',
    /**
     * 维护公益资讯的超级管理员
     */
    ADMINISTRATOR_INFORMATION = 'ADMINISTRATOR_INFORMATION',
    /**
     * 维护公益活动的超级管理员
     */
    ADMINISTRATOR_ACTIVITY = 'ADMINISTRATOR_ACTIVITY',
    /**
     * 维护求助信息的超级管理员
     */
    ADMINISTRATOR_HELP_INFORMATION = 'ADMINISTRATOR_HELP_INFORMATION',
    /**
     * 维护拍卖信息的超级管理员
     */
    ADMINISTRATOR_AUCTION_INFORMATION = 'ADMINISTRATOR_AUCTION_INFORMATION',
    /**
     * 维护公益商品的超级管理员
     */
    ADMINISTRATOR_PUBLIC_GOODS = 'ADMINISTRATOR_PUBLIC_GOODS'
}