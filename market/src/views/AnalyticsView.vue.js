import { useRouter } from 'vue-router';
import BaseIcon from '@/components/base/icon/BaseIcon.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const reportList = [
    {
        title: 'Анализ цен',
        id: 'market',
        description: 'Анализ цен компании Северсталь в сравнении с конкурентами',
        icon: 'outline_document_report',
        action: () => {
            router.push('/analytics/compare');
        }
    },
    {
        title: 'Прогноз цен',
        id: 'company',
        description: 'Получить профессиональный прогноз цен с графиками с помощью машинного обучения на основании данных за 10 лет.',
        icon: 'outline_presentation_chart_line',
        action: () => {
            router.push('/analytics/prices');
        }
    },
    {
        title: 'Анализ компании',
        id: 'company',
        description: 'Проанализировать компанию-конкурента по готовому шаблону или применить свой с помощью LLM.',
        icon: 'outline_document_search',
        action: () => {
            router.push('/analytics/company');
        }
    },
    {
        title: 'Аналитика рынка',
        id: 'market',
        description: 'Получить краткую сводку анализа рынка металла на основе открытых источников из интернета.',
        icon: 'outline_chart_bar',
        action: () => {
            router.push('/analytics/market');
        }
    },
];
const __VLS_fnComponent = (await import('vue')).defineComponent({});
let __VLS_functionalComponentProps;
const __VLS_modelEmitsType = {};
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-12 w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl text-primary-800 uppercase font-mont mb-12") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xl font-bold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-3 gap-4") }, });
    for (const [report] of __VLS_getVForSourceType((__VLS_ctx.reportList))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    report.action;
                    // @ts-ignore
                    [reportList,];
                } }, key: ((report.id)), ...{ class: ("bg-white rounded-xl shadow-sm p-6 cursor-pointer transition duration-150 hover:shadow-lg") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 mb-2") }, });
        if (report.icon) {
            // @ts-ignore
            [BaseIcon,];
            // @ts-ignore
            const __VLS_0 = __VLS_asFunctionalComponent(BaseIcon, new BaseIcon({ name: ((report.icon)), size: ("sm"), }));
            const __VLS_1 = __VLS_0({ name: ((report.icon)), size: ("sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
            ({}({ name: ((report.icon)), size: ("sm"), }));
            const __VLS_4 = __VLS_pickFunctionalComponentCtx(BaseIcon, __VLS_1);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("font-bold text-lg leading-5") }, });
        (report.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        (report.description);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['text-primary-800'];
        __VLS_styleScopedClasses['uppercase'];
        __VLS_styleScopedClasses['font-mont'];
        __VLS_styleScopedClasses['mb-12'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['grid-cols-3'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-150'];
        __VLS_styleScopedClasses['hover:shadow-lg'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-2'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['leading-5'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                BaseIcon: BaseIcon,
                reportList: reportList,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
