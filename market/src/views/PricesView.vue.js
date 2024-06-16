import { ref } from 'vue';
import { useReportStore } from '@/stores/report';
import BaseButton from '@/components/base/button/BaseButton.vue';
import BaseIcon from '@/components/base/icon/BaseIcon.vue';
import MarkdownBlock from '@/components/MarkdownBlock.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import { RouterLink } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const error = ref('');
const loading = ref(false);
const reportStore = useReportStore();
const getPrediction = async () => {
    loading.value = true;
    error.value = '';
    try {
        await reportStore.getNextYearPrediction();
    }
    catch (err) {
        error.value = err.message || 'An error occurred';
    }
    finally {
        loading.value = false;
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-12 w-full") }, });
    // @ts-ignore
    const __VLS_0 = {}
        .RouterLink;
    ({}.RouterLink);
    ({}.RouterLink);
    __VLS_components.RouterLink;
    __VLS_components.RouterLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/analytics"), }));
    const __VLS_2 = __VLS_1({ to: ("/analytics"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ to: ("/analytics"), }));
    // @ts-ignore
    [BaseButton, BaseButton,];
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ look: ("link"), theme: ("secondary"), ...{ class: ("!p-0 max-w-min") }, }));
    const __VLS_7 = __VLS_6({ look: ("link"), theme: ("secondary"), ...{ class: ("!p-0 max-w-min") }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    ({}({ look: ("link"), theme: ("secondary"), ...{ class: ("!p-0 max-w-min") }, }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 items-center font-normal") }, });
    // @ts-ignore
    [BaseIcon,];
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(BaseIcon, new BaseIcon({ name: ("outline_arrow_left"), size: ("xs"), }));
    const __VLS_12 = __VLS_11({ name: ("outline_arrow_left"), size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    ({}({ name: ("outline_arrow_left"), size: ("xs"), }));
    const __VLS_15 = __VLS_pickFunctionalComponentCtx(BaseIcon, __VLS_12);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_10.slots).default;
    const __VLS_10 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_7);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl text-primary-800 uppercase font-mont mb-12") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-6") }, });
    // @ts-ignore
    [BaseButton, BaseButton,];
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("secondary"), }));
    const __VLS_17 = __VLS_16({ ...{ 'onClick': {} }, theme: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    ({}({ ...{ 'onClick': {} }, theme: ("secondary"), }));
    let __VLS_21;
    const __VLS_22 = {
        onClick: (__VLS_ctx.getPrediction)
    };
    // @ts-ignore
    [getPrediction,];
    (__VLS_20.slots).default;
    const __VLS_20 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_17);
    let __VLS_18;
    let __VLS_19;
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center py-12") }, });
        // @ts-ignore
        [BaseSpinner,];
        // @ts-ignore
        const __VLS_23 = __VLS_asFunctionalComponent(BaseSpinner, new BaseSpinner({}));
        const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
        ({}({}));
        // @ts-ignore
        [loading,];
        const __VLS_27 = __VLS_pickFunctionalComponentCtx(BaseSpinner, __VLS_24);
    }
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        (__VLS_ctx.error);
        // @ts-ignore
        [error, error,];
    }
    if (__VLS_ctx.reportStore.prediction) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("px-10 pt-10 pb-5 bg-white shadow-sm rounded-xl mt-12") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("font-bold text-3xl mb-2") }, });
        // @ts-ignore
        [reportStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-12") }, });
        // @ts-ignore
        const __VLS_28 = {}
            .BaseLink;
        ({}.BaseLink);
        ({}.BaseLink);
        __VLS_components.BaseLink;
        __VLS_components.BaseLink;
        // @ts-ignore
        [BaseLink, BaseLink,];
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({ href: ((__VLS_ctx.reportStore.prediction.link)), target: ("_blank"), }));
        const __VLS_30 = __VLS_29({ href: ((__VLS_ctx.reportStore.prediction.link)), target: ("_blank"), }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        ({}({ href: ((__VLS_ctx.reportStore.prediction.link)), target: ("_blank"), }));
        (__VLS_ctx.reportStore.prediction.link);
        // @ts-ignore
        [reportStore, reportStore,];
        (__VLS_33.slots).default;
        const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_28, __VLS_30);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: (('data:image/png;base64,' + __VLS_ctx.reportStore.prediction.acf_pacf_chart)), alt: ("ACF and PACF Chart"), });
        // @ts-ignore
        [reportStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: (('data:image/png;base64,' + __VLS_ctx.reportStore.prediction.forecast_chart)), alt: ("Forecast Chart"), });
        // @ts-ignore
        [reportStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("font-bold text-3xl mt-12 mb-4") }, });
        // @ts-ignore
        [MarkdownBlock,];
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(MarkdownBlock, new MarkdownBlock({ content: ((__VLS_ctx.reportStore.prediction.report)), }));
        const __VLS_35 = __VLS_34({ content: ((__VLS_ctx.reportStore.prediction.report)), }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        ({}({ content: ((__VLS_ctx.reportStore.prediction.report)), }));
        // @ts-ignore
        [reportStore,];
        const __VLS_38 = __VLS_pickFunctionalComponentCtx(MarkdownBlock, __VLS_35);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['max-w-min'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-2'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['font-normal'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['text-primary-800'];
        __VLS_styleScopedClasses['uppercase'];
        __VLS_styleScopedClasses['font-mont'];
        __VLS_styleScopedClasses['mb-12'];
        __VLS_styleScopedClasses['mb-6'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['px-10'];
        __VLS_styleScopedClasses['pt-10'];
        __VLS_styleScopedClasses['pb-5'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['mt-12'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['mb-12'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['mt-12'];
        __VLS_styleScopedClasses['mb-4'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                BaseButton: BaseButton,
                BaseIcon: BaseIcon,
                MarkdownBlock: MarkdownBlock,
                BaseSpinner: BaseSpinner,
                RouterLink: RouterLink,
                error: error,
                loading: loading,
                reportStore: reportStore,
                getPrediction: getPrediction,
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
