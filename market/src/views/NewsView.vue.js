import { onMounted, ref } from 'vue';
import { useNewsStore } from '@/stores/news';
import BaseLink from '@/components/base/BaseLink.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const loading = ref(false);
const newsStore = useNewsStore();
onMounted(async () => {
    loading.value = true;
    await newsStore.fetchAnalyticNews();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl text-primary-800 uppercase font-mont mb-12") }, });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center py-12") }, });
        // @ts-ignore
        [BaseSpinner,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(BaseSpinner, new BaseSpinner({}));
        const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
        ({}({}));
        // @ts-ignore
        [loading,];
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(BaseSpinner, __VLS_1);
    }
    else if (__VLS_ctx.newsStore.analyticNews.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6") }, });
        for (const [news] of __VLS_getVForSourceType((__VLS_ctx.newsStore.analyticNews))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((news.title)), ...{ class: ("bg-white rounded-xl shadow-sm p-6") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("font-bold text-xl mb-4 text-primary-800") }, });
            (news.title);
            // @ts-ignore
            [newsStore, newsStore,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("line-clamp-3 text-sm") }, });
            (news.description);
            if (news.link) {
                // @ts-ignore
                [BaseLink, BaseLink,];
                // @ts-ignore
                const __VLS_5 = __VLS_asFunctionalComponent(BaseLink, new BaseLink({ href: ((news.link)), ...{ class: ("font-normal mb-4 text-sm") }, target: ("_blank"), }));
                const __VLS_6 = __VLS_5({ href: ((news.link)), ...{ class: ("font-normal mb-4 text-sm") }, target: ("_blank"), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
                ({}({ href: ((news.link)), ...{ class: ("font-normal mb-4 text-sm") }, target: ("_blank"), }));
                (__VLS_9.slots).default;
                const __VLS_9 = __VLS_pickFunctionalComponentCtx(BaseLink, __VLS_6);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("capitalize text-sm") }, });
            (news.date);
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['text-primary-800'];
        __VLS_styleScopedClasses['uppercase'];
        __VLS_styleScopedClasses['font-mont'];
        __VLS_styleScopedClasses['mb-12'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['grid-cols-1'];
        __VLS_styleScopedClasses['lg:grid-cols-2'];
        __VLS_styleScopedClasses['xl:grid-cols-3'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['p-6'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-primary-800'];
        __VLS_styleScopedClasses['line-clamp-3'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-normal'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['capitalize'];
        __VLS_styleScopedClasses['text-sm'];
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
