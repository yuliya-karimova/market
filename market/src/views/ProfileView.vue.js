import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseButton from '@/components/base/button/BaseButton.vue';
import BaseCheckboxGroup from '@/components/base/BaseCheckboxGroup.vue';
import { topicsOptions } from '@/models/topics';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const handleSave = () => {
    isLoading.value = true;
    authStore.updateTopics(authStore.topics);
    isLoading.value = false;
};
const handleLogout = async () => {
    await authStore.logout();
    router.push('/');
};
onMounted(() => {
    if (!authStore.user) {
        router.push('/');
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-12 flex flex-col items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full max-w-3xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl text-primary-800 uppercase font-mont mb-12") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleSave) }, ...{ class: ("mb-2 bg-white shadow-sm rounded-xl px-8 py-8") }, });
    // @ts-ignore
    [BaseCheckboxGroup,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseCheckboxGroup, new BaseCheckboxGroup({ modelValue: ((__VLS_ctx.authStore.topics)), title: ("Выберите интересующие вас тематики:"), options: ((__VLS_ctx.topicsOptions)), name: ("topics"), }));
    const __VLS_1 = __VLS_0({ modelValue: ((__VLS_ctx.authStore.topics)), title: ("Выберите интересующие вас тематики:"), options: ((__VLS_ctx.topicsOptions)), name: ("topics"), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ modelValue: ((__VLS_ctx.authStore.topics)), title: ("Выберите интересующие вас тематики:"), options: ((__VLS_ctx.topicsOptions)), name: ("topics"), }));
    // @ts-ignore
    [handleSave, authStore, topicsOptions,];
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(BaseCheckboxGroup, __VLS_1);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6") }, });
    // @ts-ignore
    [BaseButton, BaseButton,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ type: ("submit"), theme: ("success"), loading: ((__VLS_ctx.isLoading)), }));
    const __VLS_6 = __VLS_5({ type: ("submit"), theme: ("success"), loading: ((__VLS_ctx.isLoading)), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({ type: ("submit"), theme: ("success"), loading: ((__VLS_ctx.isLoading)), }));
    // @ts-ignore
    [isLoading,];
    (__VLS_9.slots).default;
    const __VLS_9 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_6);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full flex justify-end mt-8") }, });
    // @ts-ignore
    [BaseButton, BaseButton,];
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("destructive"), }));
    const __VLS_11 = __VLS_10({ ...{ 'onClick': {} }, theme: ("destructive"), }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    ({}({ ...{ 'onClick': {} }, theme: ("destructive"), }));
    let __VLS_15;
    const __VLS_16 = {
        onClick: (__VLS_ctx.handleLogout)
    };
    // @ts-ignore
    [handleLogout,];
    (__VLS_14.slots).default;
    const __VLS_14 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_11);
    let __VLS_12;
    let __VLS_13;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-3xl'];
        __VLS_styleScopedClasses['text-4xl'];
        __VLS_styleScopedClasses['text-primary-800'];
        __VLS_styleScopedClasses['uppercase'];
        __VLS_styleScopedClasses['font-mont'];
        __VLS_styleScopedClasses['mb-12'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['px-8'];
        __VLS_styleScopedClasses['py-8'];
        __VLS_styleScopedClasses['mt-6'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-end'];
        __VLS_styleScopedClasses['mt-8'];
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
                BaseCheckboxGroup: BaseCheckboxGroup,
                topicsOptions: topicsOptions,
                isLoading: isLoading,
                authStore: authStore,
                handleSave: handleSave,
                handleLogout: handleLogout,
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
