/* ============================================================================
 * [BW Custom]
 * Componente personalizado de Blue Wave (BW) para selección de idioma:
 * - Inglés ('en')
 * - Español Latinoamericano ('es-419')
 * ============================================================================ */
import React from 'react';
import Cookies from 'universal-cookie';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

const BW_SUPPORTED_LANGUAGES = [
  { value: 'en', label: 'English (EN)' },
  { value: 'es-419', label: 'Español Latinoamérica (ES)' },
];

export const BwLanguageSelector = () => {
  const intl = useIntl();
  const cookies = new Cookies();
  const cookieName = getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME || 'openedx-language-preference';
  const currentLang = cookies.get(cookieName) || intl.locale || 'en';

  // Si existe una cookie host-only duplicada en apps.* junto con la cookie compartida del LMS,
  // eliminar la cookie host-only local para que prevalezca siempre el idioma compartido.
  React.useEffect(() => {
    const rawCookies = document.cookie.split(';').map((c) => c.trim());
    const langCookies = rawCookies.filter((c) => c.startsWith(`${cookieName}=`));
    if (langCookies.length > 1) {
      cookies.remove(cookieName, { path: '/' });
      window.location.reload();
    }
  }, [cookieName]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    const { hostname } = window.location;
    // Dominio raíz compartido entre LMS y MFEs (ej. .bwaulmo.plenumsoftamericas.com / .academyv21.bluewavesdp.com)
    let rootDomain = '';
    if (hostname !== 'localhost' && hostname.includes('.')) {
      if (hostname.startsWith('apps.')) {
        rootDomain = hostname.replace(/^apps\./, '.');
      } else if (hostname.startsWith('studio.')) {
        rootDomain = hostname.replace(/^studio\./, '.');
      } else {
        rootDomain = `.${hostname}`;
      }
    }

    // 1. Eliminar cookie host-only local (en apps.*) para que no bloquee la cookie compartida del LMS
    cookies.remove(cookieName, { path: '/' });

    // 2. Guardar una única cookie en el dominio compartido entre LMS y todos los MFEs
    if (rootDomain) {
      cookies.set(cookieName, newLanguage, { path: '/', domain: rootDomain, maxAge: 31536000 });
    } else {
      cookies.set(cookieName, newLanguage, { path: '/', maxAge: 31536000 });
    }

    // 3. Guardar respaldo en sessionStorage
    window.sessionStorage.setItem(cookieName, newLanguage);

    // 4. Recargar página para aplicar las traducciones
    window.location.reload();
  };

  return (
    /* === [BW Custom - INICIO] Botón Selector de Idioma Blue Wave === */
    <div
      id="bw-language-selector-container"
      className="bw-lang-selector-bar"
    >
      <select
        id="bw-language-selector"
        aria-label="Blue Wave Language Selector"
        className="bw-lang-selector-btn"
        value={currentLang}
        onChange={handleLanguageChange}
      >
        {BW_SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
    /* === [BW Custom - FIN] === */
  );
};

export default BwLanguageSelector;
