import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseIcon from '@/components/base/icon/BaseIcon.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
import BaseModal from '@/components/base/BaseModal.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = withDefaults(defineProps(), {
    isOpen: false
});
const emit = defineEmits(['close']);
const close = () => {
    emit('close');
};
const username = ref('');
const password = ref('');
const showLogin = ref(true);
const registerUsername = ref('');
const registerPassword = ref('');
const authStore = useAuthStore();
const router = useRouter();
const handleSubmit = async () => {
    await authStore.login(username.value, password.value);
    if (!authStore.error) {
        close();
        router.push('/');
    }
};
const handleRegister = async () => {
    await authStore.register(registerUsername.value, registerPassword.value);
    if (!authStore.registerError) {
        showLogin.value = true;
        registerUsername.value = '';
        registerPassword.value = '';
        router.push('/profile');
    }
};
const __VLS_withDefaultsArg = (function (t) { return t; })({
    isOpen: false
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    emits: {},
});
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
    // @ts-ignore
    [BaseModal, BaseModal,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseModal, new BaseModal({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isOpen)), size: ("lg"), title: ((__VLS_ctx.showLogin ? 'Авторизация' : 'Регистрация')), }));
    const __VLS_1 = __VLS_0({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isOpen)), size: ("lg"), title: ((__VLS_ctx.showLogin ? 'Авторизация' : 'Регистрация')), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isOpen)), size: ("lg"), title: ((__VLS_ctx.showLogin ? 'Авторизация' : 'Регистрация')), }));
    let __VLS_5;
    const __VLS_6 = {
        onClose: (__VLS_ctx.close)
    };
    if (__VLS_ctx.showLogin) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleSubmit) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("username"), ...{ class: ("block text-gray-700") }, });
        // @ts-ignore
        [isOpen, showLogin, showLogin, close, handleSubmit,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.username)), type: ("text"), id: ("username"), name: ("username"), autocomplete: ("username"), required: (true), ...{ class: ("w-full px-3 py-2 border rounded-md") }, });
        // @ts-ignore
        [username,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("password"), ...{ class: ("block text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), id: ("password"), name: ("password"), autocomplete: ("current-password"), required: (true), ...{ class: ("w-full px-3 py-2 border rounded-md") }, });
        (__VLS_ctx.password);
        // @ts-ignore
        [password,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("w-full px-3 py-2 bg-blue-500 text-white rounded-md") }, });
        if (__VLS_ctx.authStore.error) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-red-500 mt-4") }, });
            (__VLS_ctx.authStore.error);
            // @ts-ignore
            [authStore, authStore,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-8") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.showLogin)))
                        return;
                    __VLS_ctx.showLogin = false;
                    // @ts-ignore
                    [showLogin,];
                } }, ...{ class: ("w-full px-3 py-2 bg-green-500 text-white rounded-md") }, });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-4") }, });
        // @ts-ignore
        [BaseButton, BaseButton,];
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, look: ("link"), theme: ("white"), ...{ class: ("!p-0 max-w-min") }, }));
        const __VLS_8 = __VLS_7({ ...{ 'onClick': {} }, look: ("link"), theme: ("white"), ...{ class: ("!p-0 max-w-min") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        ({}({ ...{ 'onClick': {} }, look: ("link"), theme: ("white"), ...{ class: ("!p-0 max-w-min") }, }));
        let __VLS_12;
        const __VLS_13 = {
            onClick: (...[$event]) => {
                if (!(!((__VLS_ctx.showLogin))))
                    return;
                __VLS_ctx.showLogin = true;
                // @ts-ignore
                [showLogin,];
            }
        };
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 items-center font-normal") }, });
        // @ts-ignore
        [BaseIcon,];
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(BaseIcon, new BaseIcon({ name: ("outline_arrow_left"), size: ("xs"), }));
        const __VLS_15 = __VLS_14({ name: ("outline_arrow_left"), size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        ({}({ name: ("outline_arrow_left"), size: ("xs"), }));
        const __VLS_18 = __VLS_pickFunctionalComponentCtx(BaseIcon, __VLS_15);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_8);
        let __VLS_9;
        let __VLS_10;
        __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleRegister) }, ...{ class: ("flex flex-col gap-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("register-username"), ...{ class: ("block text-gray-700") }, });
        // @ts-ignore
        [handleRegister,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.registerUsername)), type: ("text"), id: ("register-username"), name: ("register-username"), autocomplete: ("username"), required: (true), ...{ class: ("w-full px-3 py-2 border rounded-md") }, });
        // @ts-ignore
        [registerUsername,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("register-password"), ...{ class: ("block text-gray-700") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), id: ("register-password"), name: ("new-password"), autocomplete: ("new-password"), required: (true), ...{ class: ("w-full px-3 py-2 border rounded-md") }, });
        (__VLS_ctx.registerPassword);
        // @ts-ignore
        [registerPassword,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded-md") }, });
        if (__VLS_ctx.authStore.registerError) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-red-500 mt-4") }, });
            (__VLS_ctx.authStore.registerError);
            // @ts-ignore
            [authStore, authStore,];
        }
    }
    (__VLS_4.slots).default;
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(BaseModal, __VLS_1);
    let __VLS_2;
    let __VLS_3;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['bg-blue-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['text-red-500'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['mt-8'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['bg-green-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['max-w-min'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-2'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['font-normal'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['bg-blue-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['text-red-500'];
        __VLS_styleScopedClasses['mt-4'];
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
                BaseButton: BaseButton,
                BaseModal: BaseModal,
                close: close,
                username: username,
                password: password,
                showLogin: showLogin,
                registerUsername: registerUsername,
                registerPassword: registerPassword,
                authStore: authStore,
                handleSubmit: handleSubmit,
                handleRegister: handleRegister,
            };
        },
        props: {},
        emits: {},
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {},
    emits: {},
});
;
