import en from "../../../i18n/en.json";
import de from "../../../i18n/de.json";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IChildrenProp } from "../models/code.models";
import { IntlProvider } from "use-intl";


const messages = {
  en,
  de,
};

export interface ILocale {
  locale: string;
  setLocale: any;
}

const lang = localStorage.getItem("locale") || "en";

const LocaleContext = createContext<ILocale>({
  locale: lang,
  setLocale: () => null,
});
export const useLocale = () => useContext(LocaleContext);

const LocaleProvider = ({ children }: IChildrenProp) => {
  const [locale, setLocale] = useState<string>(lang);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
