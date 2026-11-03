(() => {
  if (document.body.dataset.route !== "/") return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const observed = document.querySelectorAll("[data-sequence], [data-progress-line]");
  if (!reduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }), { threshold: .16, rootMargin: "0px 0px -8%" });
    observed.forEach(item => observer.observe(item));
  } else observed.forEach(item => item.classList.add("is-visible"));

  const product = document.querySelector("[data-parallax]");
  if (product && !reduced) {
    product.addEventListener("pointermove", event => {
      const box = product.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      product.style.transform = `perspective(1000px) rotateX(${y * -2}deg) rotateY(${x * 3}deg)`;
    });
    product.addEventListener("pointerleave", () => { product.style.transform = ""; });
  }

  const businessText = {
    Cafeteria: "visitas frequentes, progresso claro e recompensas simples.",
    Restaurante: "recorrência, campanhas sazonais e benefícios compreensíveis.",
    Loja: "novas compras, vantagens configuráveis e histórico organizado.",
    Barbearia: "retornos recorrentes e reconhecimento de clientes fiéis.",
    Academia: "continuidade, desafios demonstrativos e progresso visível.",
    "Pet shop": "compras recorrentes e benefícios alinhados à rotina do tutor."
  };
  document.querySelectorAll("[data-business]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-business]").forEach(item => item.classList.toggle("active", item === button));
    const label = document.querySelector("[data-business-label]");
    label.textContent = button.dataset.business.toLowerCase();
    document.querySelector("[data-business-desc]").textContent = businessText[button.dataset.business];
  }));

  const benefitCopy = {
    return: ["Seu próximo café está mais perto.", "3 de 5 participações concluídas"],
    relation: ["A relação continua depois da compra.", "Uma nova oportunidade de retorno"],
    organize: ["Regras claras em um só lugar.", "Progresso e histórico organizados"]
  };
  document.querySelectorAll("[data-benefit]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-benefit]").forEach(item => item.classList.toggle("active", item === button));
    const [title, caption] = benefitCopy[button.dataset.benefit];
    document.querySelector("[data-benefit-title]").textContent = title;
    document.querySelector("[data-benefit-caption]").textContent = caption;
  }));

  const mobile = document.querySelector("[data-mobile-demo]");
  mobile?.querySelectorAll("[data-screen-button]").forEach(button => button.addEventListener("click", () => {
    const name = button.dataset.screenButton;
    mobile.querySelectorAll("[data-screen-button]").forEach(item => item.classList.toggle("active", item === button));
    mobile.querySelectorAll("[data-screen]").forEach(screen => {
      const active = screen.dataset.screen === name;
      screen.hidden = !active;
      screen.classList.toggle("active", active);
    });
  }));

  const roles = {
    merchant: ["PARA QUEM GERENCIA", "Configure campanhas, regras e benefícios.", "Organize o programa, acompanhe participações e tome decisões com uma visão clara da operação.", "Programa ativo", "284 participantes"],
    customer: ["PARA QUEM PARTICIPA", "Acompanhe pontos, recompensas e comprovantes.", "O consumidor entende seu progresso, consulta o histórico e encontra novos motivos para voltar.", "Saldo atualizado", "1.240 pontos"]
  };
  document.querySelectorAll("[data-role]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-role]").forEach(item => item.classList.toggle("active", item === button));
    const [overline, title, text, chip, metric] = roles[button.dataset.role];
    document.querySelector("[data-role-overline]").textContent = overline;
    document.querySelector("[data-role-title]").textContent = title;
    document.querySelector("[data-role-text]").textContent = text;
    document.querySelector("[data-role-chip]").textContent = chip;
    document.querySelector("[data-role-metric]").textContent = metric;
  }));

  const dashboards = {
    overview: ["VISÃO GERAL", "O relacionamento em movimento", [284, 3460, 87]],
    campaigns: ["CAMPANHAS", "Ações que criam novos motivos para voltar", [12, 8, 4]],
    rewards: ["RECOMPENSAS", "Benefícios escolhidos pelos clientes", [24, 87, 18]],
    validations: ["VALIDAÇÕES", "Compras elegíveis sob acompanhamento", [146, 131, 15]]
  };
  const renderCounts = values => document.querySelectorAll("[data-count]").forEach((node, index) => {
    const end = values[index];
    if (reduced) { node.textContent = end.toLocaleString("pt-BR"); return; }
    const start = performance.now();
    const tick = now => {
      const progress = Math.min(1, (now - start) / 600);
      node.textContent = Math.round(end * (1 - Math.pow(1 - progress, 3))).toLocaleString("pt-BR");
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  document.querySelectorAll("[data-dashboard]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-dashboard]").forEach(item => item.classList.toggle("active", item === button));
    const [label, title, values] = dashboards[button.dataset.dashboard];
    document.querySelector("[data-dashboard-label]").textContent = label;
    document.querySelector("[data-dashboard-title]").textContent = title;
    renderCounts(values);
  }));
  const dashboardDemo = document.querySelector("[data-dashboard-demo]");
  if (dashboardDemo && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      renderCounts(dashboards.overview[2]);
      counterObserver.disconnect();
    }), { threshold: .25 });
    counterObserver.observe(dashboardDemo);
  } else renderCounts(dashboards.overview[2]);

  const validator = document.querySelector("[data-validator]");
  let validatorMode = "fiscal", validatorStep = 0;
  const validatorSteps = {
    fiscal: [["Pronto para enviar", "Selecione um exemplo para iniciar a demonstração."], ["Arquivo selecionado", "O comprovante entra na fila de análise."], ["Em análise", "Critérios de elegibilidade e duplicidade são conferidos."], ["Aprovado", "Exemplo aprovado: +120 pontos demonstrativos."]],
    qr: [["Pronto para escanear", "A demonstração não acessa sua câmera."], ["Código lido", "O QR Code do estabelecimento foi reconhecido."], ["Validando regras", "Prazo, estabelecimento e limite de uso são conferidos."], ["Autorizado", "Exemplo autorizado: participação registrada."]]
  };
  const renderValidator = () => {
    const steps = validatorSteps[validatorMode], [title, text] = steps[validatorStep];
    validator.querySelector("[data-validator-step-label]").textContent = `ETAPA ${validatorStep + 1} DE 4`;
    validator.querySelector("[data-validator-title]").textContent = title;
    validator.querySelector("[data-validator-text]").textContent = text;
    validator.querySelectorAll(".rp-stage-dots i").forEach((dot, index) => dot.classList.toggle("active", index === validatorStep));
    validator.querySelector("[data-validator-back]").disabled = validatorStep === 0;
    validator.querySelector("[data-validator-next]").textContent = validatorStep === 3 ? "Recomeçar" : validatorStep === 0 ? "Iniciar análise" : "Continuar";
    validator.querySelector("[data-validator-visual]").style.transform = `rotate(${validatorStep % 2 ? 1.4 : -1.2}deg) scale(${1 + validatorStep * .012})`;
  };
  validator?.querySelectorAll("[data-validator-mode]").forEach(button => button.addEventListener("click", () => {
    validatorMode = button.dataset.validatorMode; validatorStep = 0;
    validator.querySelectorAll("[data-validator-mode]").forEach(item => item.classList.toggle("active", item === button));
    renderValidator();
  }));
  validator?.querySelector("[data-validator-next]").addEventListener("click", () => { validatorStep = validatorStep === 3 ? 0 : validatorStep + 1; renderValidator(); });
  validator?.querySelector("[data-validator-back]").addEventListener("click", () => { validatorStep = Math.max(0, validatorStep - 1); renderValidator(); });

  const calculator = document.querySelector("[data-points-calculator]");
  const range = calculator?.querySelector("input");
  let selectedCost = 600;
  const renderCalculator = () => {
    const points = Number(range.value);
    calculator.querySelector("[data-points-output]").textContent = points.toLocaleString("pt-BR");
    calculator.querySelector("[data-value-output]").textContent = (points / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const status = calculator.querySelector("[data-redeem-status]");
    const enough = points >= selectedCost;
    status.textContent = enough ? "Seu saldo permite resgatar esta recompensa." : `Faltam ${(selectedCost - points).toLocaleString("pt-BR")} pontos para esta recompensa.`;
    status.classList.toggle("insufficient", !enough);
  };
  range?.addEventListener("input", renderCalculator);
  calculator?.querySelectorAll("[data-reward-cost]").forEach(button => button.addEventListener("click", () => {
    selectedCost = Number(button.dataset.rewardCost);
    calculator.querySelectorAll("[data-reward-cost]").forEach(item => item.classList.toggle("active", item === button));
    calculator.querySelector("[data-reward-output]").textContent = button.querySelector("span").childNodes[0].textContent.trim();
    renderCalculator();
  }));
  if (calculator) renderCalculator();

  const simulator = document.querySelector("[data-simulator]");
  const simSteps = [
    ["Escolha um estabelecimento", ["Cafeteria", "Loja", "Barbearia"]],
    ["Selecione uma compra", ["R$ 28,00", "R$ 48,90", "R$ 79,00"]],
    ["Escolha a validação", ["Comprovante fiscal", "QR Code"]],
    ["Jornada concluída", ["Ver resultado"]]
  ];
  let simIndex = 0, selections = [];
  const renderSim = () => {
    const [title, options] = simSteps[simIndex];
    simulator.querySelector("[data-sim-step]").textContent = simIndex + 1;
    simulator.querySelector("[data-sim-title]").textContent = title;
    simulator.querySelector("[data-sim-options]").innerHTML = options.map(option => `<button data-value="${option}">${option}</button>`).join("");
    simulator.querySelectorAll(".rp-sim-progress i").forEach((dot, index) => dot.classList.toggle("active", index <= simIndex));
    simulator.querySelector("[data-sim-back]").disabled = simIndex === 0;
    simulator.querySelector("[data-sim-next]").disabled = true;
    simulator.querySelector("[data-sim-next]").textContent = simIndex === 3 ? "Recomeçar" : "Continuar";
    simulator.querySelector("[data-sim-summary]").textContent = simIndex === 3 ? `${selections[0]} · compra ${selections[1]} · ${selections[2]}. Resultado demonstrativo: +120 pontos.` : "Selecione uma opção para continuar.";
    simulator.querySelectorAll("[data-value]").forEach(button => button.addEventListener("click", () => {
      simulator.querySelectorAll("[data-value]").forEach(item => item.classList.toggle("active", item === button));
      selections[simIndex] = button.dataset.value;
      simulator.querySelector("[data-sim-next]").disabled = false;
    }));
    if (simIndex === 3) simulator.querySelector("[data-sim-next]").disabled = false;
  };
  simulator?.querySelector("[data-sim-next]").addEventListener("click", () => { simIndex = simIndex === 3 ? 0 : simIndex + 1; if (simIndex === 0) selections = []; renderSim(); });
  simulator?.querySelector("[data-sim-back]").addEventListener("click", () => { simIndex = Math.max(0, simIndex - 1); renderSim(); });
  if (simulator) renderSim();
})();
