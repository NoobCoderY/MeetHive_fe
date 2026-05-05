import en from "../../../i18n/en.json";
import de from "../../../i18n/de.json";
import {
  createContext,
  useContext,
  useEffect,
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

const APP_LOCALE = "en" as const;

const LocaleContext = createContext<ILocale>({
  locale: APP_LOCALE,
  setLocale: () => null,
});
export const useLocale = () => useContext(LocaleContext);

const LocaleProvider = ({ children }: IChildrenProp) => {
  useEffect(() => {
    localStorage.setItem("locale", APP_LOCALE);
  }, []);

  return (
    <LocaleContext.Provider
      value={{ locale: APP_LOCALE, setLocale: () => {} }}
    >
      <IntlProvider locale={APP_LOCALE} messages={messages[APP_LOCALE]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
