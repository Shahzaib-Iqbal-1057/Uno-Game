"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ page; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _webSocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webSocket */ \"(app-pages-browser)/./app/webSocket.ts\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);\n// import HomePage from './components/Home';\n// import Username from './components/username';\n// import Wait from './components/wait';\n// import { BrowserRouter as Router, Routes, Route } from \"react-router-dom\";\n// import {io} from \"socket.io-client\";\n// import \"./styles/index.css\";\n// const socket = io('https://uno-game-vtdp.onrender.com/',{ transports: [\"websocket\"] });\n// socket.connect()\n// function App() {\n//   return (\n//     <div>\n//       <Router>\n//       <Routes>\n//           <Route path = \"/\" element = {<Username socket = {socket}/>}/>\n//           <Route path = \"/wait\" element = {<Wait socket = {socket}/>}/>\n//           <Route path=\"/homepage\" element={<HomePage socket={socket} />} />\n//         </Routes>\n//       </Router>\n//     </div>\n//   );\n// }\n// export default App;\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction page() {\n    var _this = this;\n    _s();\n    var _React_useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__._)(react__WEBPACK_IMPORTED_MODULE_1___default().useState(\"\"), 2), user = _React_useState[0], setuser = _React_useState[1];\n    var _React_useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__._)(react__WEBPACK_IMPORTED_MODULE_1___default().useState(0), 2), players = _React_useState1[0], setPlayers = _React_useState1[1];\n    var GlowingBox = function(param) {\n        var option = param.option;\n        var glow = players === Number(option[0]) ? \"\" : \"hover:\";\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"relative inline-block p-6 m-4 border border-white-1px rounded-lg \".concat(glow, \"border-blue-600 2px shadow-md transition-all cursor-pointer\"),\n            onClick: function() {\n                setPlayers(Number(option[0]));\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"absolute inset-0 rounded-lg\"\n                }, void 0, false, {\n                    fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                    lineNumber: 49,\n                    columnNumber: 9\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative z-10 text-white \",\n                    children: option\n                }, void 0, false, {\n                    fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, _this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n            lineNumber: 46,\n            columnNumber: 7\n        }, _this);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"uno-image\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {\n                src: \"/uno.png\",\n                alt: \"Uno logo\",\n                width: 50,\n                height: 50,\n                className: \"brightness-100 w-1/6 m-10\",\n                unoptimized: true\n            }, void 0, false, {\n                fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                lineNumber: 57,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        placeholder: \"Enter Name\",\n                        value: user,\n                        onChange: function(event) {\n                            setuser(event.target.value);\n                        },\n                        className: \"px-4 py-2 rounded-md text-lg w-72 mb-4 focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-transparent message-input-container-homepage\"\n                    }, void 0, false, {\n                        fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GlowingBox, {\n                                option: \"2 Players\"\n                            }, void 0, false, {\n                                fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                                lineNumber: 73,\n                                columnNumber: 9\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GlowingBox, {\n                                option: \"3 players\"\n                            }, void 0, false, {\n                                fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                                lineNumber: 74,\n                                columnNumber: 9\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GlowingBox, {\n                                option: \"4 Players\"\n                            }, void 0, false, {\n                                fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 9\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                        lineNumber: 72,\n                        columnNumber: 7\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        href: \"/wait?players=\".concat(players),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: function() {\n                                _webSocket__WEBPACK_IMPORTED_MODULE_2__[\"default\"].emit(\"username\", {\n                                    user: user,\n                                    players: players\n                                });\n                            },\n                            className: \"bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-lg cursor-pointer w-36 mx-auto flex justify-center mt-5\",\n                            children: \"Join Game!\"\n                        }, void 0, false, {\n                            fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                            lineNumber: 79,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                        lineNumber: 78,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/shafiqaiqbal/Downloads/AssignmentThree 4/AssignmentThree/MyGame/frontend/app/page.tsx\",\n        lineNumber: 56,\n        columnNumber: 5\n    }, this);\n}\n_s(page, \"Aid4aj7jz7gw7VqwAbPhQ8tTLZw=\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLGdEQUFnRDtBQUNoRCx3Q0FBd0M7QUFDeEMsNkVBQTZFO0FBQzdFLHVDQUF1QztBQUN2QywrQkFBK0I7QUFFL0IsMEZBQTBGO0FBQzFGLG1CQUFtQjtBQUVuQixtQkFBbUI7QUFDbkIsYUFBYTtBQUNiLFlBQVk7QUFDWixpQkFBaUI7QUFFakIsaUJBQWlCO0FBQ2pCLDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsOEVBQThFO0FBQzlFLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsYUFBYTtBQUNiLE9BQU87QUFDUCxJQUFJO0FBRUosc0JBQXNCOzs7O0FBS0k7QUFDTztBQUNKO0FBQ0U7QUFHaEIsU0FBU0k7OztJQUN0QixJQUF3Qkosa0JBQUFBLCtEQUFBQSxDQUFBQSxxREFBYyxDQUFTLFNBQXhDTSxPQUFpQk4sb0JBQVhPLFVBQVdQO0lBQ3hCLElBQTZCQSxtQkFBQUEsK0RBQUFBLENBQUFBLHFEQUFjLENBQVMsUUFBN0NRLFVBQXNCUixxQkFBZFMsYUFBY1Q7SUFJN0IsSUFBTVUsYUFBYTtZQUFHQyxlQUFBQTtRQUNwQixJQUFJQyxPQUFnQkosWUFBWUssT0FBT0YsTUFBTSxDQUFDLEVBQUUsSUFBSSxLQUFLO1FBQ3pELHFCQUNFLDhEQUFDRztZQUFJQyxXQUFXLG9FQUF5RSxPQUFMSCxNQUFLO1lBQ3pGSSxTQUFTO2dCQUFLUCxXQUFXSSxPQUFPRixNQUFNLENBQUMsRUFBRTtZQUFFOzs4QkFFekMsOERBQUNHO29CQUFJQyxXQUFVOzs7Ozs7OEJBQ2YsOERBQUNEO29CQUFJQyxXQUFVOzhCQUE2Qko7Ozs7Ozs7Ozs7OztJQUdsRDtJQUVBLHFCQUNFLDhEQUFDRztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ1osbURBQUtBO2dCQUNKYyxLQUFLO2dCQUNMQyxLQUFJO2dCQUNKQyxPQUFPO2dCQUNQQyxRQUFRO2dCQUNSTCxXQUFVO2dCQUNWTSxhQUFhOzs7Ozs7MEJBRWYsOERBQUNQO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ087d0JBQ0NDLGFBQVk7d0JBQ1pDLE9BQU9sQjt3QkFDUG1CLFVBQVUsU0FBQ0M7NEJBQTZDbkIsUUFBUW1CLE1BQU1DLE1BQU0sQ0FBQ0gsS0FBSzt3QkFBQzt3QkFDbkZULFdBQVU7Ozs7OztrQ0FFZCw4REFBQ0Q7d0JBQUlDLFdBQVU7OzBDQUNiLDhEQUFDTDtnQ0FBV0MsUUFBTzs7Ozs7OzBDQUNuQiw4REFBQ0Q7Z0NBQVdDLFFBQU87Ozs7OzswQ0FDbkIsOERBQUNEO2dDQUFXQyxRQUFPOzs7Ozs7Ozs7Ozs7a0NBR25CLDhEQUFDVCxrREFBSUE7d0JBQUMwQixNQUFPLGlCQUF5QixPQUFScEI7a0NBQzVCLDRFQUFDcUI7NEJBQ0RiLFNBQVM7Z0NBQUtmLGtEQUFNQSxDQUFDNkIsSUFBSSxDQUFDLFlBQVk7b0NBQUN4QixNQUFPQTtvQ0FBS0UsU0FBVUE7Z0NBQU87NEJBQUc7NEJBQ3ZFTyxXQUFVO3NDQUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNYO0dBdER3QlgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL3BhZ2UudHN4Pzc2MDMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IEhvbWVQYWdlIGZyb20gJy4vY29tcG9uZW50cy9Ib21lJztcbi8vIGltcG9ydCBVc2VybmFtZSBmcm9tICcuL2NvbXBvbmVudHMvdXNlcm5hbWUnO1xuLy8gaW1wb3J0IFdhaXQgZnJvbSAnLi9jb21wb25lbnRzL3dhaXQnO1xuLy8gaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIsIFJvdXRlcywgUm91dGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuLy8gaW1wb3J0IHtpb30gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbi8vIGltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG4vLyBjb25zdCBzb2NrZXQgPSBpbygnaHR0cHM6Ly91bm8tZ2FtZS12dGRwLm9ucmVuZGVyLmNvbS8nLHsgdHJhbnNwb3J0czogW1wid2Vic29ja2V0XCJdIH0pO1xuLy8gc29ja2V0LmNvbm5lY3QoKVxuXG4vLyBmdW5jdGlvbiBBcHAoKSB7XG4vLyAgIHJldHVybiAoXG4vLyAgICAgPGRpdj5cbi8vICAgICAgIDxSb3V0ZXI+XG4gICAgICBcbi8vICAgICAgIDxSb3V0ZXM+XG4vLyAgICAgICAgICAgPFJvdXRlIHBhdGggPSBcIi9cIiBlbGVtZW50ID0gezxVc2VybmFtZSBzb2NrZXQgPSB7c29ja2V0fS8+fS8+XG4vLyAgICAgICAgICAgPFJvdXRlIHBhdGggPSBcIi93YWl0XCIgZWxlbWVudCA9IHs8V2FpdCBzb2NrZXQgPSB7c29ja2V0fS8+fS8+XG4vLyAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvaG9tZXBhZ2VcIiBlbGVtZW50PXs8SG9tZVBhZ2Ugc29ja2V0PXtzb2NrZXR9IC8+fSAvPlxuLy8gICAgICAgICA8L1JvdXRlcz5cbi8vICAgICAgIDwvUm91dGVyPlxuLy8gICAgIDwvZGl2PlxuLy8gICApO1xuLy8gfVxuXG4vLyBleHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4ndXNlIGNsaWVudCdcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBzb2NrZXQgZnJvbSBcIi4vd2ViU29ja2V0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWdlICgpIHtcbiAgY29uc3QgW3VzZXIsIHNldHVzZXJdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgY29uc3QgW3BsYXllcnMsc2V0UGxheWVyc10gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDApO1xuXG5cblxuICBjb25zdCBHbG93aW5nQm94ID0gKHsgb3B0aW9uIH0gOiB7b3B0aW9uIDogc3RyaW5nfSkgPT4geyBcbiAgICBsZXQgZ2xvdyA6IHN0cmluZyA9IHBsYXllcnMgPT09IE51bWJlcihvcHRpb25bMF0pID8gXCJcIiA6IFwiaG92ZXI6XCI7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgaW5saW5lLWJsb2NrIHAtNiBtLTQgYm9yZGVyIGJvcmRlci13aGl0ZS0xcHggcm91bmRlZC1sZyAke2dsb3d9Ym9yZGVyLWJsdWUtNjAwIDJweCBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJgfVxuICAgICAgb25DbGljaz17KCk9PntzZXRQbGF5ZXJzKE51bWJlcihvcHRpb25bMF0pKX19IFxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC1sZ1wiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCB0ZXh0LXdoaXRlIFwiPntvcHRpb259PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ1bm8taW1hZ2VcIj5cbiAgICAgIDxJbWFnZVxuICAgICAgICBzcmM9IFwiL3Vuby5wbmdcIlxuICAgICAgICBhbHQ9XCJVbm8gbG9nb1wiXG4gICAgICAgIHdpZHRoPXs1MH1cbiAgICAgICAgaGVpZ2h0PXs1MH1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnJpZ2h0bmVzcy0xMDAgdy0xLzYgbS0xMFwiXG4gICAgICAgIHVub3B0aW1pemVkPXt0cnVlfVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBOYW1lXCJcbiAgICAgICAgICB2YWx1ZT17dXNlcn1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OlJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KT0+e3NldHVzZXIoZXZlbnQudGFyZ2V0LnZhbHVlKX19XG4gICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQtbWQgdGV4dC1sZyB3LTcyIG1iLTQgZm9jdXM6Ym9yZGVyLWJsdWUtNTAwIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGJnLXRyYW5zcGFyZW50IG1lc3NhZ2UtaW5wdXQtY29udGFpbmVyLWhvbWVwYWdlXCIgXG4gICAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICA8R2xvd2luZ0JveCBvcHRpb249XCIyIFBsYXllcnNcIiAvPlxuICAgICAgICA8R2xvd2luZ0JveCBvcHRpb249XCIzIHBsYXllcnNcIiAvPlxuICAgICAgICA8R2xvd2luZ0JveCBvcHRpb249XCI0IFBsYXllcnNcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICAgXG4gICAgICAgIDxMaW5rIGhyZWY9IHtgL3dhaXQ/cGxheWVycz0ke3BsYXllcnN9YH0+ICAgXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpPT57c29ja2V0LmVtaXQoXCJ1c2VybmFtZVwiLCB7dXNlciA6IHVzZXIscGxheWVycyA6IHBsYXllcnN9KTt9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXJlZC03MDAgaG92ZXI6YmctcmVkLTgwMCB0ZXh0LXdoaXRlIHB4LTQgcHktMiByb3VuZGVkLW1kIHRleHQtbGcgY3Vyc29yLXBvaW50ZXIgdy0zNiBteC1hdXRvIGZsZXgganVzdGlmeS1jZW50ZXIgbXQtNVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIEpvaW4gR2FtZSFcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICA8L2Rpdj5cbiAgKTtcbiAgXG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJzb2NrZXQiLCJMaW5rIiwiSW1hZ2UiLCJwYWdlIiwidXNlU3RhdGUiLCJ1c2VyIiwic2V0dXNlciIsInBsYXllcnMiLCJzZXRQbGF5ZXJzIiwiR2xvd2luZ0JveCIsIm9wdGlvbiIsImdsb3ciLCJOdW1iZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJ1bm9wdGltaXplZCIsImlucHV0IiwicGxhY2Vob2xkZXIiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJocmVmIiwiYnV0dG9uIiwiZW1pdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.tsx\n"));

/***/ })

});