import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./i18n-resources/en.json";
import es from "./i18n-resources/es.json";
import fr from "./i18n-resources/fr.json";
// 【第 1 处修改】：导入中文
import zhCN from "./i18n-resources/zh-CN.json";

// 【第 2 处修改】：加入 resources
const resources = { 
    en, 
    es, 
    fr, 
    "zh-CN": zhCN 
};

export { en, es, fr, zhCN };

export async function initI18n(): Promise<void> {
    await i18next
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: "en",
            defaultNS: "translation",
            interpolation: {
                escapeValue: false,
            },
            detection: {
                // 自动检测浏览器语言
                order: ["navigator", "htmlTag"],
                caches: [],
            },
        });
}

export const i18n = i18next;
