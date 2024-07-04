import deepmerge from 'deepmerge';
import { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import acceptLanguage from 'accept-language';

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    acceptLanguage.languages(['en', 'ar']);
    let locale = headers().get("Accept-Language");
    if (locale == null) { locale = "en" }
    const shortLocale = locale?.split("-")[0];
    let userMsg, baseMsg;

    try {
        baseMsg = (await import(`../messages/${shortLocale}.json`)).default
    } catch (err) {
        baseMsg = (await import(`../messages/en.json`)).default
    }

    try {
        userMsg = (await import(`../messages/${locale}.json`)).default
    } catch (err) {
        userMsg = baseMsg
    }


    return {
        locale,
        messages: deepmerge(baseMsg, userMsg)
    };
});