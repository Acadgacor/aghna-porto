import 'server-only';

const dictionaries: { [key: string]: () => Promise<any> } = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    id: () => import('@/dictionaries/id.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    return dictionaries[locale]?.() ?? dictionaries.id();
};
