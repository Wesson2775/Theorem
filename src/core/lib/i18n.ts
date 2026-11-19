import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./i18n-resources/en.json";
import es from "./i18n-resources/es.json";
import fr from "./i18n-resources/fr.json";
import zhCN from "./i18n-resources/zh-CN.json";

const resources = { en, es, fr, "zh-CN": zhCN };

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
                order: ["navigator", "htmlTag"],
                caches: [],
            },
            // 【优雅的修复】：拦截获取到的语言代码，如果是以 zh 开头，统统标准化为 zh-CN
            supportedLngs: ["en", "es", "fr", "zh-CN"],
            load: "languageOnly", 
            nonExplicitSupportedLngs: true,
            // 关键点：把复杂的 locale（如 zh-Hans-CN, zh-TW）统一映射
            lowerCaseLng: true,
            cleanCode: true,
        });

    // 最硬核也最兼容的兜底逻辑：如果检测到的语言是以 zh 开头，强行切到 zh-CN
    if (i18next.language && i18next.language.startsWith("zh")) {
        await i18next.changeLanguage("zh-CN");
    }
}

export const i18n = i18next;
