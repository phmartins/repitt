(() => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) scrollTo(0, 0);
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const toast = document.querySelector(".toast");

  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => { toast.hidden = true; }, 3200);
  };

  const closeMenus = except => {
    document.querySelectorAll("[data-menu-button]").forEach(button => {
      if (button === except) return;
      button.setAttribute("aria-expanded", "false");
      const panel = button.nextElementSibling;
      panel.classList.remove("is-open");
      clearTimeout(panel.closeTimer);
      panel.closeTimer = setTimeout(() => { panel.hidden = true; }, 180);
    });
  };

  document.querySelectorAll("[data-menu-button]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      const open = button.getAttribute("aria-expanded") === "true";
      closeMenus(button);
      button.setAttribute("aria-expanded", String(!open));
      const panel = button.nextElementSibling;
      clearTimeout(panel.closeTimer);
      if (!open) {
        panel.hidden = false;
        requestAnimationFrame(() => panel.classList.add("is-open"));
      } else {
        panel.classList.remove("is-open");
        panel.closeTimer = setTimeout(() => { panel.hidden = true; }, 180);
      }
    });
  });
  document.addEventListener("click", () => closeMenus());
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenus();
      if (mobileMenu && !mobileMenu.hidden) menuToggle.click();
    }
  });

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
    mobileMenu.hidden = open;
    body.classList.toggle("menu-open", !open);
  });

  let scrollTick = false;
  addEventListener("scroll", () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      header?.classList.toggle("scrolled", scrollY > 20);
      scrollTick = false;
    });
  }, { passive: true });

  const revealSelectors = [
    ".section-heading", ".editorial-grid > *", ".benefit-composition > *", ".steps > *",
    ".split > *", ".segment-grid > *", ".merchant-grid > *", ".mode-grid > *",
    ".timeline > *", ".feature-groups > *", ".faq-layout > *", ".contact-grid > *",
    ".human-card", ".receipt-demo", ".journey-demo", ".plan-pending", ".brand-signature .container",
    ".final-cta .container", ".inner-hero .container", ".hero-copy > *", ".product-stage"
  ];
  const revealItems = [...document.querySelectorAll(revealSelectors.join(","))];
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-order", String(index % 4));
  });

  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -9%", threshold: 0.08 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  const motionElements = [...document.querySelectorAll(".dashboard-shell, .phone-shell, .loyalty-ticket, .mini-phone, .dashboard-detail")];
  let motionTick = false;
  const updateMotion = () => {
    motionElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
      element.style.setProperty("--scroll-shift", `${(progress - .5) * (index % 2 ? -18 : 18)}px`);
    });
    motionTick = false;
  };
  addEventListener("scroll", () => {
    if (motionTick) return;
    motionTick = true;
    requestAnimationFrame(updateMotion);
  }, { passive: true });
  updateMotion();

  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.closest("article").querySelector(":scope > div").hidden = expanded;
    });
  });

  document.querySelectorAll("[data-tabs]").forEach(tabs => {
    const buttons = [...tabs.querySelectorAll("[data-tab]")];
    const panels = [...tabs.querySelectorAll("[data-panel]")];
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        buttons.forEach(b => b.setAttribute("aria-selected", String(b === button)));
        panels.forEach(panel => { panel.hidden = panel.dataset.panel !== button.dataset.tab; });
      });
      button.addEventListener("keydown", event => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "ArrowRight" ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
        buttons[next].focus(); buttons[next].click();
      });
    });
  });

  document.querySelectorAll("[data-journey]").forEach(demo => {
    const title = demo.querySelector("[data-journey-title]");
    const text = demo.querySelector("[data-journey-text]");
    const count = demo.querySelector("[data-journey-step]");
    const next = demo.querySelector("[data-journey-next]");
    const back = demo.querySelector("[data-journey-back]");
    const dots = [...demo.querySelectorAll(".journey-progress i")];
    const steps = [
      ["Participação registrada", "Uma ação fictícia foi vinculada ao programa demonstrativo."],
      ["Critérios conferidos", "O exemplo verifica elegibilidade, validade e possível duplicidade."],
      ["Progresso comunicado", "A pessoa visualiza o resultado e entende o próximo passo."]
    ];
    let index = 0;
    const render = () => {
      count.textContent = index + 1; title.textContent = steps[index][0]; text.textContent = steps[index][1];
      dots.forEach((dot, i) => dot.classList.toggle("active", i <= index));
      back.disabled = index === 0;
      next.textContent = index === steps.length - 1 ? "Recomeçar" : "Continuar";
    };
    next.addEventListener("click", () => { index = index === steps.length - 1 ? 0 : index + 1; render(); });
    back.addEventListener("click", () => { index = Math.max(0, index - 1); render(); });
    render();
  });

  document.querySelectorAll("[data-demo-toast]").forEach(button => button.addEventListener("click", () => showToast("Exemplo demonstrativo: regras completas apareceriam aqui.")));

  const form = document.querySelector("[data-contact]");
  const endpoint = window.REPITT_CONFIG?.contactEndpoint;
  if (form && endpoint) {
    const submit = form.querySelector("button[type=submit]");
    submit.disabled = false;
    form.querySelector(".form-note").textContent = "Responderemos pelo canal informado após o recebimento.";
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      submit.disabled = true; submit.textContent = "Enviando…";
      try {
        const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
        if (!response.ok) throw new Error();
        form.reset(); showToast("Solicitação enviada com sucesso.");
      } catch { showToast("Não foi possível enviar agora. Tente novamente."); }
      finally { submit.disabled = false; submit.textContent = "Enviar solicitação"; }
    });
  }

  const banner = document.querySelector("[data-cookie-banner]");
  const savedChoice = localStorage.getItem("repitt-cookie-choice");
  if (banner && !savedChoice) banner.hidden = false;
  const saveChoice = value => { localStorage.setItem("repitt-cookie-choice", value); banner.hidden = true; showToast("Preferência de cookies salva."); };
  document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => saveChoice("accepted"));
  document.querySelector("[data-cookie-reject]")?.addEventListener("click", () => saveChoice("essential"));
  document.querySelector("[data-cookie-settings]")?.addEventListener("click", () => { banner.hidden = false; banner.querySelector("button")?.focus(); });
})();
