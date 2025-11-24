
// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', function () {
  // Formulário de agendamento no modal (presente no index.html)
  const formAgendamento = document.getElementById('formAgendamento');

  if (formAgendamento) {
    formAgendamento.addEventListener('submit', function (e) {
      e.preventDefault();

      // validação simples usando Constraint Validation API
      if (!formAgendamento.checkValidity()) {
        formAgendamento.classList.add('was-validated');
        return;
      }

      // checar radio (modalidade) manualmente
      const modalidade = document.querySelector('input[name="modalidade"]:checked');
      if (!modalidade) {
        // mostra feedback (simples)
        const feedback = document.getElementById('modalidadeFeedback');
        if (feedback) feedback.textContent = 'Escolha a modalidade.';
        return;
      } else {
        const feedback = document.getElementById('modalidadeFeedback');
        if (feedback) feedback.textContent = '';
      }

      // coletar valores
      const ag = {
        nome: document.getElementById('agNome').value.trim(),
        servico: document.getElementById('agServico').value,
        modalidade: modalidade.value,
        data: document.getElementById('agData').value,
        hora: document.getElementById('agHora').value,
        observacoes: document.getElementById('agObserv').value.trim()
      };

      // validação de data: não permitir datas anteriores a hoje
      const hoje = new Date();
      const dataSelecionada = new Date(ag.data + 'T00:00:00');
      if (dataSelecionada.setHours(0,0,0,0) < hoje.setHours(0,0,0,0)) {
        alert('Escolha uma data válida (não anterior a hoje).');
        return;
      }

      // salvar no localStorage (simples, para demonstração)
      let agendamentos = JSON.parse(localStorage.getItem('petiscao_agendamentos') || '[]');
      agendamentos.push(ag);
      localStorage.setItem('petiscao_agendamentos', JSON.stringify(agendamentos));

      // feedback ao usuário
      alert('Agendamento confirmado!\nNome: ' + ag.nome + '\nData: ' + ag.data + ' às ' + ag.hora);

      // limpar formulário e fechar modal
      formAgendamento.reset();
      formAgendamento.classList.remove('was-validated');

      // fechar modal programaticamente usando Bootstrap API
      const modalEl = document.getElementById('agendamentoModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }

      // mostrar no console
      console.log('Agendamentos atuais:', agendamentos);
    });
  }

  // Formulário de cadastro (se existir) — apenas validação visual (Bootstrap)
  const formCadastro = document.getElementById('formCadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
      if (!formCadastro.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        formCadastro.classList.add('was-validated');
      } else {
        // deixa o envio seguir para formsubmit.co (não previne)
      }
    });
  }
});
