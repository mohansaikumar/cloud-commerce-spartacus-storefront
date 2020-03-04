import { HttpClient } from '@angular/common/http';
import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { TranslationResources } from '../translation-resources';

export function i18nextInit(
  configInit: ConfigInitializerService,
  languageService: LanguageService,
  httpClient: HttpClient,
  serverRequestOrigin: string
): () => Promise<any> {
  return () =>
    configInit.getStableConfig('i18n').then(config => {
      let i18nextConfig: i18next.InitOptions = {
        ns: [], // don't preload any namespaces
        fallbackLng: config.i18n.fallbackLang,
        debug: config.i18n.debug,
        interpolation: {
          escapeValue: false,
        },
      };
      if (config.i18n.backend) {
        i18next.use(i18nextXhrBackend);
        const loadPath = getLoadPath(
          config.i18n.backend.loadPath,
          serverRequestOrigin
        );
        const backend = {
          loadPath,
          ajax: i18nextGetHttpClient(httpClient),
        };
        i18nextConfig = { ...i18nextConfig, backend };
      }

      return i18next.init(i18nextConfig, () => {
        // Don't use i18next's 'resources' config key for adding static translations,
        // because it will disable loading chunks from backend. We add resources here, in the init's callback.
        i18nextAddTranslations(config.i18n.resources);
        syncI18nextWithSiteContext(languageService);
      });
    });
}

export function i18nextAddTranslations(resources: TranslationResources = {}) {
  Object.keys(resources).forEach(lang => {
    Object.keys(resources[lang]).forEach(chunkName => {
      i18next.addResourceBundle(
        lang,
        chunkName,
        resources[lang][chunkName],
        true,
        true
      );
    });
  });
}

export function syncI18nextWithSiteContext(language: LanguageService) {
  // always update language of i18next on site context (language) change
  language.getActive().subscribe(lang => i18next.changeLanguage(lang));
}

/**
 * Returns a function appropriate for i18next to make http calls for JSON files.
 * See docs for `i18next-xhr-backend`: https://github.com/i18next/i18next-xhr-backend#backend-options
 *
 * It uses Angular HttpClient under the hood, so it works in SSR.
 * @param httpClient Angular http client
 */
export function i18nextGetHttpClient(
  httpClient: HttpClient
): (url: string, options: object, callback: Function, data: object) => void {
  return (url: string, _options: object, callback: Function, _data: object) => {
    httpClient.get(url, { responseType: 'text' }).subscribe(
      data => callback(data, { status: 200 }),
      error => callback(null, { status: error.status })
    );
  };
}

/**
 * Resolves the relative path to the absolute one in SSR, using the server request's origin.
 * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
 * - https://github.com/angular/angular/issues/19224
 * - https://github.com/angular/universal/issues/858
 */
export function getLoadPath(path: string, serverRequestOrigin: string): string {
  if (!path) {
    return undefined;
  }
  if (serverRequestOrigin && !path.match(/^http(s)?:\/\//)) {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    if (path.startsWith('./')) {
      path = path.slice(2);
    }
    const result = `${serverRequestOrigin}/${path}`;
    return result;
  }
  return path;
}
