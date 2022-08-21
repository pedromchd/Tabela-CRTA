import { elementos } from './elementos.js';

$(document).ready(function(){

let lastFocus;

help.call($('.content'));

$(document).keydown((e) => {
  if (e.key === 'Escape' || e.code === 'Escape') {
    if (!$('.wall').is(':hidden')) {
      $('.wall').hide();
      if (lastFocus) {
        lastFocus.focus();
      }
    }
  }
  if (e.altKey) {
    if (e.key === 'h' || e.key === 'H' || e.code === 'KeyH') {
      help.call($('.content'));
    }
  }
})

$('.pop-up').on('keydown', '.content', (e) => {
  if (e.shiftKey) {
    if (e.key === 'Tab' || e.code === 'Tab') {
      e.preventDefault();
      $('.fechar').focus();
    }
  }
});

$('.pop-up').on('keydown', '.fechar', (e) => {
  if (e.key === 'Tab' || e.code === 'Tab') {
    e.preventDefault();
    $('.content').focus();
  }
});

$('.fechar').on({
  click: () => {
    $('.wall').hide();
  },
  keydown: (e) => {
    if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      $('.wall').hide();
    }
  },
  blur: () => {
    if (lastFocus && $('.wall').is(':hidden')) {
      lastFocus.focus();
    }
  }
});

$('.tabela').on('keydown', '.elemento', (e) => {
  if (e.ctrlKey && e.altKey) {
    if (e.key === 'ArrowRight' || e.code === 'ArrowRight') {
      e.preventDefault();
      $('.elemento').get($('.elemento').index($(':focus')) + 1).focus();
    }
    if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
      e.preventDefault();
      $('.elemento').get(Math.abs($('.elemento').index($(':focus')) - 1)).focus();
    }
    if (e.key === 'ArrowUp' || e.code === 'ArrowUp') {
      e.preventDefault();
      $('.tabela td').get(Math.abs($('.tabela td').index($(':focus')) - 18)).focus();
    }
    if (e.key === 'ArrowDown' || e.code === 'ArrowDown') {
      e.preventDefault();
      $('.tabela td').get($('.tabela td').index($(':focus')) + 18).focus();
    }
  }
});

$('.elemento').on({
  click: detalhar,
  keydown: (e) => {
    if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      detalhar.call($(':focus'));
    }
  },
});

function detalhar() {
  if ($(this).hasClass('atalho')) {
    $('.atalho').index($(':focus')) ? $('.actinidio')[1].focus() : $('.lantanideo')[1].focus();
    return;
  }
  lastFocus = $(this);
  const index = $(this).data('id');
  $('.display tr').html($(this).prop('outerHTML'));
  $('.content').html(`
    <ul>
      <li><b>Nome:</b> ${elementos[index].nome}</li>
      <li><b>Sigla:</b> ${elementos[index].sigla}</li>
      <li><b>Número atômico:</b> ${elementos[index].atomico}</li>
      <li><b>Massa atômica:</b> ${elementos[index].massa} g/mol</li>
      <li><b>Classificação:</b> ${elementos[index].class}</li>
      <li><b>Estado:</b> ${elementos[index].estado}</li>
      <li><b>Ponto de fusão:</b> ${elementos[index].fusao}</li>
      <li><b>Ponto de ebulição:</b> ${elementos[index].ebulicao}</li>
      <li><b>Distribuição:</b> ${elementos[index].distribuicao}</li>
      <li><b>Curiosidade:</b> ${elementos[index].curiosidade}</li>
    </ul>
  `);
  $('.wall').show();
  $('.content').focus();
}

function help() {
  $('.display tr').html('');
  $(this).html(`
    <b>Controles:</b>
    <ul>
      <li>Use os atalhos Tab e Shift + Tab para navegação padrão;</li>
      <li>Use o atalho Ctrl + Alt + Setas do teclado para navegar entre os elementos da tabela;</li>
      <li>Use a tecla Enter para acessar os elementos e a tecla ESC para fechar os pop-ups;</li>
      <li>Se precisar revisar esta informação, aperte Ctrl + Alt + H.</li>
    </ul>
  `);
  $('.wall').show();
  $('.content').focus();
}

});
