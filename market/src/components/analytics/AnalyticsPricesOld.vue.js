import { topicsOptions } from '@/models/topics';
import { ref, reactive } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const analysisBlock = ref(undefined);
const scrollTo = (id) => {
    let top = 0;
    const offset = 100;
    switch (id) {
        case 'analysis':
            top = (analysisBlock.value?.offsetTop || 0) - offset;
            break;
        case 'top':
            break;
        default:
            break;
    }
    window.scrollTo({ left: 0, top: top, behavior: 'smooth' });
};
const templates = ['финансовый анализ', 'рыночные исследования', 'анализ конкурентной среды'];
const selectedTemplate = ref(null);
const reportParams = reactive({
    dateFrom: '',
    dateTo: '',
    keywords: '',
    sources: '',
    depth: '',
    format: 'graphs'
});
const reportGenerated = ref(false);
const onTemplateChange = () => {
    if (selectedTemplate.value === 'custom') {
        selectedTemplate.value = null;
    }
};
const generateReport = () => {
    reportGenerated.value = true;
    // Здесь можно добавить логику для генерации отчета
};
const exportReport = (format) => {
    // Здесь можно добавить логику для экспорта отчета в выбранный формат
    alert(`Отчет экспортирован в формате ${format.toUpperCase()}`);
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-16") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-4") }, ref: ("analysisBlock"), });
    // @ts-ignore
    (__VLS_ctx.analysisBlock);
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl mb-2") }, });
    // @ts-ignore
    [analysisBlock,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ ...{ onChange: (__VLS_ctx.onTemplateChange) }, value: ((__VLS_ctx.selectedTemplate)), ...{ class: ("border p-2 rounded") }, });
    for (const [label, value] of __VLS_getVForSourceType((__VLS_ctx.topicsOptions))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((value)), value: ((value)), });
        (label);
        // @ts-ignore
        [onTemplateChange, selectedTemplate, topicsOptions,];
    }
    if (__VLS_ctx.selectedTemplate) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl mb-2") }, });
        // @ts-ignore
        [selectedTemplate,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block mb-1") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("date"), ...{ class: ("border p-2 rounded mb-1") }, });
        (__VLS_ctx.reportParams.dateFrom);
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("date"), ...{ class: ("border p-2 rounded") }, });
        (__VLS_ctx.reportParams.dateTo);
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block mb-1") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.reportParams.keywords)), ...{ class: ("border p-2 rounded w-full") }, });
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block mb-1") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.reportParams.sources)), ...{ class: ("border p-2 rounded w-full") }, });
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block mb-1") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), value: ((__VLS_ctx.reportParams.depth)), ...{ class: ("border p-2 rounded w-full") }, });
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block mb-1") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.reportParams.format)), ...{ class: ("border p-2 rounded w-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("graphs"), });
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("tables"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("text"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.generateReport) }, ...{ class: ("bg-blue-500 text-white p-2 rounded") }, });
        // @ts-ignore
        [generateReport,];
    }
    if (__VLS_ctx.reportGenerated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl mb-2") }, });
        // @ts-ignore
        [reportGenerated,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedTemplate);
        // @ts-ignore
        [selectedTemplate,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.reportParams.dateFrom);
        (__VLS_ctx.reportParams.dateTo);
        // @ts-ignore
        [reportParams, reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.reportParams.keywords);
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.reportParams.sources);
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.reportParams.depth);
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.reportParams.format);
        // @ts-ignore
        [reportParams,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.reportGenerated)))
                        return;
                    __VLS_ctx.exportReport('pdf');
                    // @ts-ignore
                    [exportReport,];
                } }, ...{ class: ("bg-green-500 text-white p-2 rounded mr-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.reportGenerated)))
                        return;
                    __VLS_ctx.exportReport('docx');
                    // @ts-ignore
                    [exportReport,];
                } }, ...{ class: ("bg-green-500 text-white p-2 rounded mr-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.reportGenerated)))
                        return;
                    __VLS_ctx.exportReport('xlsx');
                    // @ts-ignore
                    [exportReport,];
                } }, ...{ class: ("bg-green-500 text-white p-2 rounded") }, });
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['gap-16'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['bg-blue-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['bg-green-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['mr-2'];
        __VLS_styleScopedClasses['bg-green-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['mr-2'];
        __VLS_styleScopedClasses['bg-green-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                topicsOptions: topicsOptions,
                analysisBlock: analysisBlock,
                selectedTemplate: selectedTemplate,
                reportParams: reportParams,
                reportGenerated: reportGenerated,
                onTemplateChange: onTemplateChange,
                generateReport: generateReport,
                exportReport: exportReport,
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
