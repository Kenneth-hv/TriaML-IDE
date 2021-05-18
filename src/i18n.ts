import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'
import { mappings } from "./lang/mappings";
import Store from "electron-store";

/**
 * Load locale messages
 * 
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages<VueMessageType> = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages;
}

const store = new Store();

export default (() => {
  const lang = store.get('config.display.language.selected') as string;
  return createI18n({
    locale: mappings[lang] || 'en',
    fallbackLocale: 'en',
    messages: loadLocaleMessages()
  })
})();
