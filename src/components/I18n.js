// I18n.js
import React, { createContext, useState, useContext, useMemo } from 'react';

// I18n context, it's private
const I18nContext = createContext();

// A provider
export function I18nProvider({ translations, defaultLocale, children }) {
  // TODO: with the help of "useState", create a value to inject in the context.
  // The object will have the following keys: `translations`, `locale` and `setLocale`.
  const [locale, setLocale] = useState(defaultLocale);
  const value = useMemo(() => ({ locale, setLocale, translations }), [
    locale,
    translations
  ]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// A collector
export function useT(id) {
  // TODO: With the help of "useContext", collect the translations for the key "id"
  const { translations, locale } = useI18n();
  return translations[locale][id];
}

// A simple component to render a translation key
export function T({ id }) {
  return useT(id);
}

// Hook permettant de récupérer le contexte i18n
export function useI18n() {
  return useContext(I18nContext);
}
