var __page = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module) => {
    __markAsModule(target);
    if (typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: __getOwnPropDesc(module, key).enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(__create(__getProtoOf(module)), "default", {value: module, enumerable: true}), module);
  };

  // src/web/pages/login.tsx
  var require_login = __commonJS((exports) => {
    __export(exports, {
      default: () => login_default
    });
    const react5 = __toModule(require("react"));
    const pageRoot = ({appParams}) => {
      const [invalid, setInvalid] = react5.useState(false);
      const [password, setPassword] = react5.useState("");
      const loginTask = async () => {
        const success = await tryLogin(password);
        if (success) {
          window.location.href = "/gallery";
        } else {
          setPassword("");
          setInvalid(true);
        }
      };
      return /* @__PURE__ */ react5.default.createElement(Flex, {
        className: "fullpage twobreak",
        alignItems: "center"
      }, appParams.logo && /* @__PURE__ */ react5.default.createElement(Flex.Child, {
        className: "gcenter"
      }, /* @__PURE__ */ react5.default.createElement("div", {
        style: {
          background: `url(${appParams.logo}) center/contain no-repeat`
        },
        className: "logo-image"
      })), /* @__PURE__ */ react5.default.createElement(Flex.Child, {
        style: {width: "100%"}
      }, /* @__PURE__ */ react5.default.createElement(Flex, {
        justifyContent: "center"
      }, /* @__PURE__ */ react5.default.createElement("div", {
        className: "login-container"
      }, /* @__PURE__ */ react5.default.createElement("h1", null, appParams.title), appParams.subtitle && /* @__PURE__ */ react5.default.createElement("h3", null, appParams.subtitle), /* @__PURE__ */ react5.default.createElement(TextField, {
        type: "password",
        placeholder: "password",
        error: invalid,
        value: password,
        onChange: (p) => setPassword(p),
        autofocus: true
      }), /* @__PURE__ */ react5.default.createElement(TaskButton, {
        className: "wide margin",
        task: loginTask
      }, "Login"), appParams.notice && /* @__PURE__ */ react5.default.createElement("aside", {
        className: "thick"
      }, appParams.notice)))));
    };
    var login_default = as({
      needsAuth: false,
      fileName: "login",
      pageTitle: (ctx) => ctx.title + " - Login",
      root: pageRoot
    });
  });

  // src/util/poly.ts
  const as = (value) => value;

  // src/web/components/input/text.tsx
  const react2 = __toModule(require("react"));

  // src/web/components/layout/utils.ts
  const react = __toModule(require("react"));
  function clazz(...classes) {
    return Array.from(new Set(classes.flat().filter((x) => x))).join(" ");
  }

  // src/web/components/input/text.tsx
  const TextField = (props) => {
    const controlProps = {
      autoFocus: props.autofocus,
      type: props.type ?? "text",
      placeholder: props.placeholder,
      onChange: (t) => props.onChange?.(t.target.value),
      value: props.value
    };
    return /* @__PURE__ */ react2.default.createElement("div", {
      className: clazz("textfield", props.error && "error")
    }, props.multiline ? /* @__PURE__ */ react2.default.createElement("textarea", {
      ...controlProps
    }) : /* @__PURE__ */ react2.default.createElement("input", {
      ...controlProps
    }));
  };

  // src/web/components/layout/flex.tsx
  const react3 = __toModule(require("react"));
  const Flex = (props) => /* @__PURE__ */ react3.default.createElement("div", {
    className: props.className,
    style: {
      display: "flex",
      flexDirection: props.direction,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems
    }
  }, props.children);
  Flex.Child = function Child(props) {
    return /* @__PURE__ */ react3.default.createElement("div", {
      style: Object.assign({
        flex: props.flex ?? 1,
        flexDirection: props.direction,
        display: props.nest ? "flex" : void 0
      }, props.style),
      className: props.className
    }, props.children);
  };

  // src/web/components/input/taskbutton.tsx
  const react4 = __toModule(require("react"));
  const TaskButton = (props) => {
    const [loading, setLoading] = react4.useState(false);
    const [hideLoading, setHideLoading] = react4.useState(true);
    const handleClick = async () => {
      const longTimer = setTimeout(() => setHideLoading(false), 300);
      setLoading(true);
      await props.task();
      setLoading(false);
      clearTimeout(longTimer);
      setHideLoading(true);
    };
    return /* @__PURE__ */ react4.default.createElement("button", {
      className: clazz("button", loading && "loading", hideLoading && "hide-load", props.className),
      disabled: props.disabled || loading,
      onClick: handleClick
    }, props.children);
  };

  // src/web/services/api.ts
  const API_ROOT = "/api";
  function apiPath(endpoint) {
    return API_ROOT + "/" + endpoint;
  }

  // src/web/services/auth.ts
  const LOGIN_URL = apiPath("login");
  async function tryLogin(password) {
    try {
      const access = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({password}),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (access.ok) {
        const rjson = await access.json();
        if (rjson.accessToken) {
          localStorage.setItem("accessToken", rjson.accessToken);
          return true;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }
  const LOGOUT_URL = apiPath("logout");
  return require_login();
})();
