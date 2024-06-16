import { ref } from 'vue';
import { useReportStore } from '@/stores/report';
import BaseButton from '@/components/base/button/BaseButton.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseIcon from '@/components/base/icon/BaseIcon.vue';
import MarkdownBlock from '@/components/MarkdownBlock.vue';
import { companiesOptions } from '@/models/companies';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import { RouterLink } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const companyName = ref('');
const report = ref('');
const error = ref('');
const loading = ref(false);
const isUseCompanySelect = ref(true);
const reportStore = useReportStore();
const getCompanyReport = async (isNew = false) => {
    if (!companyName.value) {
        error.value = 'Введите название компании для анализа.';
        return;
    }
    loading.value = true;
    error.value = '';
    report.value = '';
    try {
        const result = await reportStore.checkCompany(companyName.value, isNew);
        if (typeof result === 'string') {
            report.value = result;
        }
        else {
            throw new Error(result);
        }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ class: ("w-full mb-12 max-w-2xl") }, });
    if (__VLS_ctx.isUseCompanySelect) {
        // @ts-ignore
        [BaseSelect,];
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({ modelValue: ((__VLS_ctx.companyName)), label: ("Выберите компанию из списка"), description: ("Для этих компаний можно получить либо заранее заготовленный отчет, либо сгенерировать новый"), placeholder: ("Компания"), name: ("Компания"), options: ((__VLS_ctx.companiesOptions)), required: (true), }));
        const __VLS_17 = __VLS_16({ modelValue: ((__VLS_ctx.companyName)), label: ("Выберите компанию из списка"), description: ("Для этих компаний можно получить либо заранее заготовленный отчет, либо сгенерировать новый"), placeholder: ("Компания"), name: ("Компания"), options: ((__VLS_ctx.companiesOptions)), required: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        ({}({ modelValue: ((__VLS_ctx.companyName)), label: ("Выберите компанию из списка"), description: ("Для этих компаний можно получить либо заранее заготовленный отчет, либо сгенерировать новый"), placeholder: ("Компания"), name: ("Компания"), options: ((__VLS_ctx.companiesOptions)), required: (true), }));
        // @ts-ignore
        [isUseCompanySelect, companyName, companiesOptions,];
        const __VLS_20 = __VLS_pickFunctionalComponentCtx(BaseSelect, __VLS_17);
    }
    else {
        // @ts-ignore
        [BaseInput,];
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({ modelValue: ((__VLS_ctx.companyName)), label: ("Введите название компании для анализа"), name: ("Компания"), inputBackgroundClass: ("bg-white"), placeholder: ("Компания"), required: (true), }));
        const __VLS_22 = __VLS_21({ modelValue: ((__VLS_ctx.companyName)), label: ("Введите название компании для анализа"), name: ("Компания"), inputBackgroundClass: ("bg-white"), placeholder: ("Компания"), required: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        ({}({ modelValue: ((__VLS_ctx.companyName)), label: ("Введите название компании для анализа"), name: ("Компания"), inputBackgroundClass: ("bg-white"), placeholder: ("Компания"), required: (true), }));
        // @ts-ignore
        [companyName,];
        const __VLS_25 = __VLS_pickFunctionalComponentCtx(BaseInput, __VLS_22);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-sm mt-2") }, });
    if (__VLS_ctx.isUseCompanySelect) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        // @ts-ignore
        [isUseCompanySelect,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.isUseCompanySelect)))
                        return;
                    __VLS_ctx.isUseCompanySelect = false;
                    // @ts-ignore
                    [isUseCompanySelect,];
                } }, ...{ class: ("text-accent-500 hover:text-accent-400 cursor-pointer flex items-center gap-2 w-max") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        [BaseIcon,];
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(BaseIcon, new BaseIcon({ name: ("outline_arrow_right"), size: ("xs"), }));
        const __VLS_27 = __VLS_26({ name: ("outline_arrow_right"), size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        ({}({ name: ("outline_arrow_right"), size: ("xs"), }));
        const __VLS_30 = __VLS_pickFunctionalComponentCtx(BaseIcon, __VLS_27);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    if (!(!((__VLS_ctx.isUseCompanySelect))))
                        return;
                    __VLS_ctx.isUseCompanySelect = true;
                    // @ts-ignore
                    [isUseCompanySelect,];
                } }, ...{ class: ("text-accent-500 hover:text-accent-400 cursor-pointer flex items-center gap-2 w-max") }, });
        // @ts-ignore
        [BaseIcon,];
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(BaseIcon, new BaseIcon({ name: ("outline_arrow_left"), size: ("xs"), }));
        const __VLS_32 = __VLS_31({ name: ("outline_arrow_left"), size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        ({}({ name: ("outline_arrow_left"), size: ("xs"), }));
        const __VLS_35 = __VLS_pickFunctionalComponentCtx(BaseIcon, __VLS_32);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-12 flex gap-4") }, });
    if (__VLS_ctx.isUseCompanySelect) {
        // @ts-ignore
        [BaseButton, BaseButton,];
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("primary"), }));
        const __VLS_37 = __VLS_36({ ...{ 'onClick': {} }, theme: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        ({}({ ...{ 'onClick': {} }, theme: ("primary"), }));
        let __VLS_41;
        const __VLS_42 = {
            onClick: (() => __VLS_ctx.getCompanyReport(true))
        };
        // @ts-ignore
        [isUseCompanySelect, getCompanyReport,];
        (__VLS_40.slots).default;
        const __VLS_40 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_37);
        let __VLS_38;
        let __VLS_39;
        // @ts-ignore
        [BaseButton, BaseButton,];
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("secondary"), }));
        const __VLS_44 = __VLS_43({ ...{ 'onClick': {} }, theme: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        ({}({ ...{ 'onClick': {} }, theme: ("secondary"), }));
        let __VLS_48;
        const __VLS_49 = {
            onClick: (() => __VLS_ctx.getCompanyReport(false))
        };
        // @ts-ignore
        [getCompanyReport,];
        (__VLS_47.slots).default;
        const __VLS_47 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_44);
        let __VLS_45;
        let __VLS_46;
    }
    else {
        // @ts-ignore
        [BaseButton, BaseButton,];
        // @ts-ignore
        const __VLS_50 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("secondary"), }));
        const __VLS_51 = __VLS_50({ ...{ 'onClick': {} }, theme: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_50));
        ({}({ ...{ 'onClick': {} }, theme: ("secondary"), }));
        let __VLS_55;
        const __VLS_56 = {
            onClick: (() => __VLS_ctx.getCompanyReport(true))
        };
        // @ts-ignore
        [getCompanyReport,];
        (__VLS_54.slots).default;
        const __VLS_54 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_51);
        let __VLS_52;
        let __VLS_53;
    }
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center py-12") }, });
        // @ts-ignore
        [BaseSpinner,];
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(BaseSpinner, new BaseSpinner({}));
        const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
        ({}({}));
        // @ts-ignore
        [loading,];
        const __VLS_61 = __VLS_pickFunctionalComponentCtx(BaseSpinner, __VLS_58);
    }
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        (__VLS_ctx.error);
        // @ts-ignore
        [error, error,];
    }
    if (__VLS_ctx.report) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("px-10 py-5 bg-white shadow-sm rounded-xl") }, });
        // @ts-ignore
        [MarkdownBlock,];
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent(MarkdownBlock, new MarkdownBlock({ content: ((__VLS_ctx.report)), }));
        const __VLS_63 = __VLS_62({ content: ((__VLS_ctx.report)), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        ({}({ content: ((__VLS_ctx.report)), }));
        // @ts-ignore
        [report, report,];
        const __VLS_66 = __VLS_pickFunctionalComponentCtx(MarkdownBlock, __VLS_63);
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
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mb-12'];
        __VLS_styleScopedClasses['max-w-2xl'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['text-accent-500'];
        __VLS_styleScopedClasses['hover:text-accent-400'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-2'];
        __VLS_styleScopedClasses['w-max'];
        __VLS_styleScopedClasses['text-accent-500'];
        __VLS_styleScopedClasses['hover:text-accent-400'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-2'];
        __VLS_styleScopedClasses['w-max'];
        __VLS_styleScopedClasses['mt-12'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['px-10'];
        __VLS_styleScopedClasses['py-5'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['rounded-xl'];
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
                BaseSelect: BaseSelect,
                BaseInput: BaseInput,
                BaseIcon: BaseIcon,
                MarkdownBlock: MarkdownBlock,
                companiesOptions: companiesOptions,
                BaseSpinner: BaseSpinner,
                RouterLink: RouterLink,
                companyName: companyName,
                report: report,
                error: error,
                loading: loading,
                isUseCompanySelect: isUseCompanySelect,
                getCompanyReport: getCompanyReport,
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
