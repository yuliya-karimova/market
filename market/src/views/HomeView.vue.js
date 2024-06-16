import AboutBlock from '@/components/AboutBlock.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
import { RouterLink } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center py-16 gap-6 font-mont") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-1/2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xl lg:text-3xl uppercase") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("font-bold text-4xl lg:text-6xl uppercase") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-lg lg:text-2xl mb-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.br)({});
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
    const __VLS_6 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ size: ("xl"), theme: ("secondary"), }));
    const __VLS_7 = __VLS_6({ size: ("xl"), theme: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    ({}({ size: ("xl"), theme: ("secondary"), }));
    (__VLS_10.slots).default;
    const __VLS_10 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_7);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ alt: ("home pic"), ...{ class: ("w-1/2 h-auto") }, src: ("/pic2.png"), });
    // @ts-ignore
    [AboutBlock,];
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(AboutBlock, new AboutBlock({}));
    const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
    ({}({}));
    const __VLS_15 = __VLS_pickFunctionalComponentCtx(AboutBlock, __VLS_12);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['py-16'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['font-mont'];
        __VLS_styleScopedClasses['w-1/2'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['lg:text-3xl'];
        __VLS_styleScopedClasses['uppercase'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['lg:text-6xl'];
        __VLS_styleScopedClasses['uppercase'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['lg:text-2xl'];
        __VLS_styleScopedClasses['mb-8'];
        __VLS_styleScopedClasses['w-1/2'];
        __VLS_styleScopedClasses['h-auto'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                AboutBlock: AboutBlock,
                BaseButton: BaseButton,
                RouterLink: RouterLink,
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
