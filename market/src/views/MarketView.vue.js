import { onMounted, ref } from 'vue';
import { useNewsStore } from '@/stores/news';
import BaseLink from '@/components/base/BaseLink.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import MarkdownBlock from '@/components/MarkdownBlock.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
import { RouterLink } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const loading = ref(false);
const newsStore = useNewsStore();
onMounted(async () => {
    loading.value = true;
    await newsStore.fetchAnalytic();
    loading.value = false;
});
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
    const __VLS_11 = {}
        .BaseIcon;
    ({}.BaseIcon);
    __VLS_components.BaseIcon;
    // @ts-ignore
    [BaseIcon,];
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({ name: ("outline_arrow_left"), size: ("xs"), }));
    const __VLS_13 = __VLS_12({ name: ("outline_arrow_left"), size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    ({}({ name: ("outline_arrow_left"), size: ("xs"), }));
    const __VLS_16 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_10.slots).default;
    const __VLS_10 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_7);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl text-primary-800 uppercase font-mont mb-12") }, });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center py-12") }, });
        // @ts-ignore
        [BaseSpinner,];
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(BaseSpinner, new BaseSpinner({}));
        const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
        ({}({}));
        // @ts-ignore
        [loading,];
        const __VLS_21 = __VLS_pickFunctionalComponentCtx(BaseSpinner, __VLS_18);
    }
    else if (__VLS_ctx.newsStore.analytic.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("div") }, });
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.newsStore.analytic))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((item.link)), ...{ class: ("px-10 py-5 bg-white shadow-sm rounded-xl") }, });
            if (item.content) {
                // @ts-ignore
                [MarkdownBlock,];
                // @ts-ignore
                const __VLS_22 = __VLS_asFunctionalComponent(MarkdownBlock, new MarkdownBlock({ content: ((item.content)), }));
                const __VLS_23 = __VLS_22({ content: ((item.content)), }, ...__VLS_functionalComponentArgsRest(__VLS_22));
                ({}({ content: ((item.content)), }));
                // @ts-ignore
                [newsStore, newsStore,];
                const __VLS_26 = __VLS_pickFunctionalComponentCtx(MarkdownBlock, __VLS_23);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            if (item.link) {
                // @ts-ignore
                [BaseLink, BaseLink,];
                // @ts-ignore
                const __VLS_27 = __VLS_asFunctionalComponent(BaseLink, new BaseLink({ href: ((item.link)), ...{ class: ("font-normal mb-4 text-md") }, target: ("_blank"), }));
                const __VLS_28 = __VLS_27({ href: ((item.link)), ...{ class: ("font-normal mb-4 text-md") }, target: ("_blank"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
                ({}({ href: ((item.link)), ...{ class: ("font-normal mb-4 text-md") }, target: ("_blank"), }));
                (item.source);
                (__VLS_31.slots).default;
                const __VLS_31 = __VLS_pickFunctionalComponentCtx(BaseLink, __VLS_28);
            }
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
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
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['div'];
        __VLS_styleScopedClasses['px-10'];
        __VLS_styleScopedClasses['py-5'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['font-normal'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-md'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                BaseLink: BaseLink,
                BaseSpinner: BaseSpinner,
                MarkdownBlock: MarkdownBlock,
                BaseButton: BaseButton,
                RouterLink: RouterLink,
                loading: loading,
                newsStore: newsStore,
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
