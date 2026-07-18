import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";

// this file is primary meant to try and get into compliance with localization with varius difference locales and languages
// it follows the guides of electronjs localization. https://react.i18next.com

export type SupportedLanguages =
  "en-US" | "fr-FR" | "fr-CA" | "es-ES" | "es-MX" | "de-DE";

const TranslationContext = createContext<{
  lang: SupportedLanguages;
  onChange(newLang: string): void;
}>({
  lang: "en-US",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (_: string) => {
    throw new Error("not implemented");
  },
});

export interface LanguageProviderProps {
  lang: SupportedLanguages;
  onChange(newLang: SupportedLanguages): void;
}
export const LanguageProvider = ({
  lang,
  onChange,
  children,
}: PropsWithChildren<LanguageProviderProps>) => {
  return (
    <TranslationContext.Provider
      value={{
        lang,
        onChange,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const UseTranslation = () => {
  const { lang } = useContext(TranslationContext);

  const translate = useCallback(
    (translationKey: string): string => {
      return translationKey;
    },
    [lang],
  );

  return { lang, translate };
};
