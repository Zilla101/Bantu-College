// Bantu College Shared UI Layer
// On brand notification toasts, replacing native browser alert dialogs.

(function () {
  "use strict";

  var LAYER_ID = "bcToastLayer";
  var DEFAULT_DURATION = 4200;

  var LABELS = {
    success: "Done",
    error: "Attention",
    info: "Notice"
  };

  var GLYPHS = {
    success: "\u2713",
    error: "\u0021",
    info: "\u2022"
  };

  function getLayer() {
    var layer = document.getElementById(LAYER_ID);
    if (!layer) {
      layer = document.createElement("div");
      layer.id = LAYER_ID;
      layer.className = "bc-toast-layer";
      layer.setAttribute("role", "status");
      layer.setAttribute("aria-live", "polite");
      document.body.appendChild(layer);
    }
    return layer;
  }

  function removeToast(node) {
    if (!node || node.dataset.closing === "1") return;
    node.dataset.closing = "1";
    node.classList.remove("is-entering");
    node.classList.add("is-leaving");
    window.setTimeout(function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    }, 300);
  }

  function bcNotify(message, type, options) {
    var opts = options || {};
    var kind = (type === "success" || type === "error") ? type : "info";
    var text = message == null ? "" : String(message);
    var duration = typeof opts.duration === "number" ? opts.duration : DEFAULT_DURATION;

    var layer = getLayer();

    var toast = document.createElement("div");
    toast.className = "bc-toast bc-toast-" + kind + " is-entering";

    var icon = document.createElement("span");
    icon.className = "bc-toast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = GLYPHS[kind];

    var body = document.createElement("div");
    body.className = "bc-toast-body";

    var title = document.createElement("span");
    title.className = "bc-toast-title";
    title.textContent = opts.title || LABELS[kind];

    var copy = document.createElement("span");
    copy.textContent = text;

    body.appendChild(title);
    body.appendChild(copy);

    var close = document.createElement("button");
    close.className = "bc-toast-close";
    close.type = "button";
    close.setAttribute("aria-label", "Dismiss notification");
    close.innerHTML = "&times;";
    close.addEventListener("click", function () {
      removeToast(toast);
    });

    toast.appendChild(icon);
    toast.appendChild(body);
    toast.appendChild(close);
    layer.appendChild(toast);

    window.requestAnimationFrame(function () {
      toast.classList.remove("is-entering");
    });

    if (duration > 0) {
      var timer = window.setTimeout(function () {
        removeToast(toast);
      }, duration);
      toast.addEventListener("mouseenter", function () {
        window.clearTimeout(timer);
      });
      toast.addEventListener("mouseleave", function () {
        timer = window.setTimeout(function () {
          removeToast(toast);
        }, 1500);
      });
    }

    return toast;
  }

  window.bcNotify = bcNotify;

  window.bcSuccess = function (m, o) { return bcNotify(m, "success", o); };
  window.bcError = function (m, o) { return bcNotify(m, "error", o); };
  window.bcInfo = function (m, o) { return bcNotify(m, "info", o); };

  // ---------------------------------------------------------------------------
  // Blocking decisions, styled on brand instead of native confirm / prompt.
  // ---------------------------------------------------------------------------

  var DIALOG_ID = "bcDialogLayer";
  var activeDialog = null;

  function getDialogLayer() {
    var layer = document.getElementById(DIALOG_ID);
    if (!layer) {
      layer = document.createElement("div");
      layer.id = DIALOG_ID;
      layer.className = "bc-dialog-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }
    return layer;
  }

  function closeDialog(callback, value) {
    if (!activeDialog) return;
    var node = activeDialog.node;
    var onClose = activeDialog.onClose;
    activeDialog = null;

    node.classList.add("is-leaving");
    window.setTimeout(function () {
      if (node.parentNode) node.parentNode.removeChild(node);
      var layer = document.getElementById(DIALOG_ID);
      if (layer) layer.setAttribute("aria-hidden", "true");
    }, 220);

    if (typeof onClose === "function") onClose();
    if (typeof callback === "function") callback(value);
  }

  function buildDialog(config) {
    var opts = config || {};
    var layer = getDialogLayer();
    var returnFocus = document.activeElement;

    var wrapper = document.createElement("div");
    wrapper.className = "bc-dialog";
    wrapper.setAttribute("role", "dialog");
    wrapper.setAttribute("aria-modal", "true");

    var input = null;

    var title = document.createElement("h2");
    title.className = "bc-dialog-title";
    title.id = "bcDialogTitle" + new Date().getTime();
    wrapper.setAttribute("aria-labelledby", title.id);
    title.textContent = opts.title || "Please confirm";

    var copy = document.createElement("p");
    copy.className = "bc-dialog-copy";
    copy.textContent = opts.message == null ? "" : String(opts.message);

    wrapper.appendChild(title);
    wrapper.appendChild(copy);

    if (opts.prompt) {
      if (opts.inputLabel) {
        var label = document.createElement("label");
        label.className = "bc-dialog-label";
        label.textContent = opts.inputLabel;
        wrapper.appendChild(label);
      }
      input = document.createElement("input");
      input.className = "bc-dialog-input";
      input.type = opts.inputType || "text";
      if (opts.placeholder) input.placeholder = opts.placeholder;
      if (opts.value != null) input.value = opts.value;
      wrapper.appendChild(input);
    }

    var actions = document.createElement("div");
    actions.className = "bc-dialog-actions";

    var cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "bc-dialog-btn bc-dialog-btn-ghost";
    cancel.textContent = opts.cancelLabel || "Cancel";

    var confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "bc-dialog-btn bc-dialog-btn-solid" + (opts.danger ? " is-danger" : "");
    confirmBtn.textContent = opts.confirmLabel || "Confirm";

    actions.appendChild(cancel);
    actions.appendChild(confirmBtn);
    wrapper.appendChild(actions);

    function submit() {
      var out = input ? input.value : true;
      closeDialog(opts.onConfirm, out);
    }

    cancel.addEventListener("click", function () { closeDialog(opts.onCancel, null); });
    confirmBtn.addEventListener("click", submit);

    wrapper.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog(opts.onCancel, null);
      } else if (event.key === "Enter") {
        event.preventDefault();
        submit();
      } else if (event.key === "Tab") {
        var focusables = wrapper.querySelectorAll("button, input");
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    layer.appendChild(wrapper);
    layer.setAttribute("aria-hidden", "false");
    wrapper.classList.add("is-entering");

    activeDialog = {
      node: wrapper,
      onClose: function () {
        if (returnFocus && returnFocus.focus) {
          try { returnFocus.focus(); } catch (err) {}
        }
      }
    };

    window.requestAnimationFrame(function () {
      wrapper.classList.remove("is-entering");
    });

    window.setTimeout(function () {
      if (input) {
        input.focus();
        if (input.select) input.select();
      } else {
        confirmBtn.focus();
      }
    }, 60);

    return wrapper;
  }

  // bcConfirm(message, onConfirm[, options])
  window.bcConfirm = function (message, onConfirm, options) {
    var opts = options || {};
    opts.message = message;
    opts.onConfirm = onConfirm;
    return buildDialog(opts);
  };

  // bcPrompt(options) -- { message, value, inputLabel, onConfirm(value) }
  window.bcPrompt = function (options) {
    var opts = options || {};
    opts.prompt = true;
    return buildDialog(opts);
  };
})();
