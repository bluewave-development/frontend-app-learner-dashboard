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

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    const hostname = window.location.hostname;
    // Dominio raíz compartido entre LMS y MFEs (ej. .academyv21.bluewavesdp.com)
    const rootDomain = hostname.startsWith('apps.') ? hostname.replace(/^apps/, '') : hostname;

    // 1. Guardar cookie en el host actual y en el dominio compartido de Open edX
    cookies.set(cookieName, newLanguage, { path: '/' });
    if (hostname !== 'localhost') {
      cookies.set(cookieName, newLanguage, { path: '/', domain: rootDomain });
    }

    // 2. Guardar respaldo en sessionStorage
    window.sessionStorage.setItem(cookieName, newLanguage);

    // 3. Recargar página para aplicar las traducciones
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
