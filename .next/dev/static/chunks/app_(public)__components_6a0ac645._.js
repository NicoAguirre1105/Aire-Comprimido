(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(public)/_components/slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Slider({ props, className, imgClass }) {
    _s();
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Slider.useEffect": ()=>{
            const timer = setInterval({
                "Slider.useEffect.timer": ()=>{
                    setCurrent({
                        "Slider.useEffect.timer": (prev)=>(prev + 1) % props.length
                    }["Slider.useEffect.timer"]);
                }
            }["Slider.useEffect.timer"], 3000);
            return ({
                "Slider.useEffect": ()=>clearInterval(timer)
            })["Slider.useEffect"];
        }
    }["Slider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            children: props.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `
            absolute inset-0 transition-all duration-700 ease-in-out
            ${index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
          `,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: slide.src,
                        alt: slide.alt,
                        fill: true,
                        className: `w-auto h-full object-contain self-center ${imgClass}`
                    }, void 0, false, {
                        fileName: "[project]/app/(public)/_components/slider.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this)
                }, slide.id, false, {
                    fileName: "[project]/app/(public)/_components/slider.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/(public)/_components/slider.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(public)/_components/slider.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(Slider, "Ce5S7Zpl2S4YgGoPn+G4m52qKq8=");
_c = Slider;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(public)/_components/contactButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_context$2f$ContactVisibilityContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/_context/ContactVisibilityContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ContactButton({ className }) {
    _s();
    const { toggleContact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_context$2f$ContactVisibilityContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContactVisibility"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleContact,
        className: className,
        children: "Solicita una Cotización"
    }, void 0, false, {
        fileName: "[project]/app/(public)/_components/contactButton.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(ContactButton, "ZWiIyysKJ+Pw7E+/H+J1BUW7KQM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_context$2f$ContactVisibilityContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContactVisibility"]
    ];
});
_c = ContactButton;
var _c;
__turbopack_context__.k.register(_c, "ContactButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28public%29__components_6a0ac645._.js.map