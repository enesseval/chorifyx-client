// zod ve next-intl birlikte çalışması için gerekiyor. nasıl kullanıldığı için login.ts e bakabilirsin.

import tr from "../messages/tr.json";

type Messages = typeof tr;

declare global {
   interface IntlMessages extends Messages {}
}

type IntlPath = Paths<IntlMessages>;
