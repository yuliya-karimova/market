import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginModal from '@/components/LoginModal.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const isLoginModalOpen = ref(false);
const authStore = useAuthStore();
const route = useRoute();
const scrollHeight = ref(0);
const menu = [
    { title: 'Главная', to: '/' },
    { title: 'Аналитика', to: '/analytics' },
    { title: 'Новости', to: '/news' },
    { title: 'FAQ', to: '/faq' }
];
const isRouteActive = (path) => {
    return route.path === path || (route.path.startsWith(path) && path !== '/');
};
const updateScroll = () => {
    scrollHeight.value = window.scrollY || document.documentElement.scrollTop;
};
const scrollToTop = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
};
onMounted(() => {
    authStore.checkAuth();
    window.addEventListener('scroll', updateScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("sticky top-0 flex justify-center py-4 px-8 bg-white font-mont shadow-sm z-10") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("max-w-screen-xl flex gap-6 items-center justify-between w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-6 items-center text-md") }, });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menu))) {
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
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ key: ((item.to)), to: ((item.to)), }));
        const __VLS_2 = __VLS_1({ key: ((item.to)), to: ((item.to)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ key: ((item.to)), to: ((item.to)), }));
        {
            const [{ isActive }] = __VLS_getSlotParams((__VLS_5.slots).default);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("hover:text-orange-500 transition duration-150") }, ...{ class: (((isActive || __VLS_ctx.isRouteActive(item.to)) && 'text-orange-500')) }, });
            __VLS_styleScopedClasses = ((isActive || isRouteActive(item.to)) && 'text-orange-500');
            (item.title);
            // @ts-ignore
            [menu, isRouteActive,];
            __VLS_5.slots['' /* empty slot name completion */];
        }
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (!__VLS_ctx.authStore.user) {
        // @ts-ignore
        [BaseButton, BaseButton,];
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, }));
        const __VLS_7 = __VLS_6({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        ({}({ ...{ 'onClick': {} }, }));
        let __VLS_11;
        const __VLS_12 = {
            onClick: (...[$event]) => {
                if (!((!__VLS_ctx.authStore.user)))
                    return;
                __VLS_ctx.isLoginModalOpen = true;
                // @ts-ignore
                [authStore, isLoginModalOpen,];
            }
        };
        (__VLS_10.slots).default;
        const __VLS_10 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_7);
        let __VLS_8;
        let __VLS_9;
    }
    else {
        // @ts-ignore
        const __VLS_13 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.RouterLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ to: ("/profile"), }));
        const __VLS_15 = __VLS_14({ to: ("/profile"), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        ({}({ to: ("/profile"), }));
        {
            const [{ isActive }] = __VLS_getSlotParams((__VLS_18.slots).default);
            // @ts-ignore
            [BaseButton, BaseButton,];
            // @ts-ignore
            const __VLS_19 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ theme: ((isActive ? 'secondary' : 'primary')), }));
            const __VLS_20 = __VLS_19({ theme: ((isActive ? 'secondary' : 'primary')), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
            ({}({ theme: ((isActive ? 'secondary' : 'primary')), }));
            (__VLS_23.slots).default;
            const __VLS_23 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_20);
            __VLS_18.slots['' /* empty slot name completion */];
        }
        const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex justify-center flex-1 py-4 px-8 bg-gray-100") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-screen-xl w-full") }, });
    // @ts-ignore
    const __VLS_24 = {}
        .RouterView;
    ({}.RouterView);
    __VLS_components.RouterView;
    // @ts-ignore
    [RouterView,];
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    ({}({}));
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    // @ts-ignore
    [LoginModal,];
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(LoginModal, new LoginModal({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isLoginModalOpen)), }));
    const __VLS_31 = __VLS_30({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isLoginModalOpen)), }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    ({}({ ...{ 'onClose': {} }, isOpen: ((__VLS_ctx.isLoginModalOpen)), }));
    let __VLS_35;
    const __VLS_36 = {
        onClose: (...[$event]) => {
            __VLS_ctx.isLoginModalOpen = false;
            // @ts-ignore
            [isLoginModalOpen, isLoginModalOpen,];
        }
    };
    const __VLS_34 = __VLS_pickFunctionalComponentCtx(LoginModal, __VLS_31);
    let __VLS_32;
    let __VLS_33;
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: ("flex justify-center p-8 bg-gray-100") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-screen-xl w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ alt: ("AI Sisters"), ...{ class: ("w-28 h-auto mx-auto") }, src: ("/logo_dark.svg"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fixed bottom-10 right-10") }, });
    // @ts-ignore
    [BaseButton, BaseButton,];
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("secondary"), rounded: ("full"), ...{ class: ("h-14 w-14 !p-0") }, ...{ class: ((__VLS_ctx.scrollHeight > 10 ? 'opacity-100' : 'opacity-0')) }, }));
    const __VLS_38 = __VLS_37({ ...{ 'onClick': {} }, theme: ("secondary"), rounded: ("full"), ...{ class: ("h-14 w-14 !p-0") }, ...{ class: ((__VLS_ctx.scrollHeight > 10 ? 'opacity-100' : 'opacity-0')) }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    ({}({ ...{ 'onClick': {} }, theme: ("secondary"), rounded: ("full"), ...{ class: ("h-14 w-14 !p-0") }, ...{ class: ((__VLS_ctx.scrollHeight > 10 ? 'opacity-100' : 'opacity-0')) }, }));
    __VLS_styleScopedClasses = (scrollHeight > 10 ? 'opacity-100' : 'opacity-0');
    let __VLS_42;
    const __VLS_43 = {
        onClick: (__VLS_ctx.scrollToTop)
    };
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), fill: ("none"), viewBox: ("0 0 24 24"), "stroke-width": ("2"), stroke: ("currentColor"), ...{ class: ("w-6 h-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), d: ("M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"), });
    // @ts-ignore
    [scrollHeight, scrollToTop,];
    (__VLS_41.slots).default;
    const __VLS_41 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_38);
    let __VLS_39;
    let __VLS_40;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['sticky'];
        __VLS_styleScopedClasses['top-0'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['py-4'];
        __VLS_styleScopedClasses['px-8'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['font-mont'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['z-10'];
        __VLS_styleScopedClasses['max-w-screen-xl'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['text-md'];
        __VLS_styleScopedClasses['hover:text-orange-500'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-150'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['py-4'];
        __VLS_styleScopedClasses['px-8'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['max-w-screen-xl'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['p-8'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['max-w-screen-xl'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['w-28'];
        __VLS_styleScopedClasses['h-auto'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['fixed'];
        __VLS_styleScopedClasses['bottom-10'];
        __VLS_styleScopedClasses['right-10'];
        __VLS_styleScopedClasses['h-14'];
        __VLS_styleScopedClasses['w-14'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['w-6'];
        __VLS_styleScopedClasses['h-6'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                RouterLink: RouterLink,
                RouterView: RouterView,
                LoginModal: LoginModal,
                BaseButton: BaseButton,
                isLoginModalOpen: isLoginModalOpen,
                authStore: authStore,
                scrollHeight: scrollHeight,
                menu: menu,
                isRouteActive: isRouteActive,
                scrollToTop: scrollToTop,
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
