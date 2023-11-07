// Use type safe message keys with `next-intl`
type Messages = typeof import('../messages/ja.json');
// declare interface IntlMessages extends Messages;
declare type IntlMessages = Messages;
