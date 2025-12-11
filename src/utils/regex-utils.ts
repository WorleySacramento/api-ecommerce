/**
 * Regex para validar telefones brasileiros.
 * Formatos aceitos:
 * - Celular com 9 dígitos: (11) 99999-9999, 11 99999-9999, 11999999999
 * - Fixo com 8 dígitos: (11) 9999-9999, 11 9999-9999, 1199999999
 */
export const phoneRegexPatern = new RegExp(
  /^(\(?\d{2}\)?\s?)?(9?\d{4}[-.\s]?\d{4})$/
);