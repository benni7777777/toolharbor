type FAQTranslator = (key: string) => string;

export type FAQCategoryKey = 'general' | 'privacy' | 'features' | 'technical' | 'languages';

export interface FAQPageItem {
  question: string;
  answer: string;
  category: FAQCategoryKey;
  categoryLabel: string;
}

const FAQ_CATEGORIES: Array<{
  key: FAQCategoryKey;
  questionKeys: string[];
}> = [
  { key: 'general', questionKeys: ['whatIs', 'isFree', 'account'] },
  { key: 'privacy', questionKeys: ['uploaded', 'safe', 'storage'] },
  { key: 'features', questionKeys: ['operations', 'merge', 'images', 'edit'] },
  { key: 'technical', questionKeys: ['browsers', 'sizeLimit', 'slow', 'offline'] },
  { key: 'languages', questionKeys: ['supported', 'change'] },
];

export function getFAQPageItems(t: FAQTranslator): FAQPageItem[] {
  return FAQ_CATEGORIES.flatMap(({ key, questionKeys }) => {
    const categoryLabel = t(`categories.${key}`);

    return questionKeys.map((questionKey) => ({
      category: key,
      categoryLabel,
      question: t(`sections.${key}.${questionKey}.question`),
      answer: t(`sections.${key}.${questionKey}.answer`),
    }));
  });
}

export function getFAQPageCategories(t: FAQTranslator): Array<{ key: FAQCategoryKey | 'all'; label: string }> {
  return [
    { key: 'all', label: t('categories.all') },
    ...FAQ_CATEGORIES.map(({ key }) => ({
      key,
      label: t(`categories.${key}`),
    })),
  ];
}
