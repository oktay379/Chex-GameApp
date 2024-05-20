import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    backend: {
      loadPath: 'http://localhost:4000/locales/{{lng}}/translation.json', // Backend URL'ini buraya ekliyoruz
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React zaten XSS koruması sağlıyor
    }
  });

export default i18n;
