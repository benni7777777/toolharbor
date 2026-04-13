const UK_EEA_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL',
  'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB',
]);

interface PagesFunctionContext {
  request: Request;
}

export const onRequest = async ({ request }: PagesFunctionContext) => {
  const country = request.headers.get('cf-ipcountry')?.toUpperCase() ?? 'UNKNOWN';
  const isUkEea = UK_EEA_COUNTRIES.has(country);

  return new Response(
    JSON.stringify({
      country,
      isUkEea,
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store, max-age=0',
      },
    },
  );
};
