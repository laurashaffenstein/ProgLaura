$(function () {
  changePage('inicial');
  $('#link-listar').click(function () {
    $.ajax({
      url: 'http://localhost:5000/get-series',
      method: 'GET',
      dataType: 'json', 
      success: listSerie, 
      error: function () {
        alert('erro ao ler dados, verifique o backend');
      },
    });
  });

  $('#link-inicial').click(function () {
    changePage('inicial');
  });

  $('#nav-brand').click(function () {
    changePage('inicial');
  });

  $('#btn-incluir').click(function () {
    const nome = $('#campo-nome').val();
    const genero = $('#campo-genero').val();
    const numtemps = $('#campo-numtemps').val();
    const nota = $('#campo-nota').val();
    

    const serieData = JSON.stringify({
      nome: nome,
      genero: genero,
      numtemps: numtemps,
      nota: nota,
    
    });

    $.ajax({
      url: 'http://localhost:5000/create-series',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: serieData,
      success: createSerie,
      error: createSerieError,
    });
  });


  function createSerie(resposta) {
    if (resposta.result == 'ok') {
        alert('Serie adicionada com sucesso')
        $('#campo-nome').val('');
        $('#campo-genero').val('');
        $('#campo-numtemps').val('');
        $('#campo-nota').val('');
       
    } else {
        alert('Erro na adição da Serie!')
    }
  }

  function createSerieError(resposta){
    alert('Erro na chamada do back-end')
  }

  function listSerie(series) {
    var rows = '';

    for (serie of series) {
      console.log(serie)
      newRow = `<tr> 
                        <td>${serie.id}</td> 
                        <td>${serie.nome}</td> 
                        <td>${serie.genero}</td> 
                        <td>${serie.numtemps}</td> 
                        <td>${serie.nota}</td> 
                        
                      </tr>`;
      rows += newRow;
      $('#tableBody').html(rows);
    }
    changePage('listar');
  }

  function changePage(nextPage) {
    $('#container-inicial').addClass('invisible');
    $('#container-listar').addClass('invisible');
    $(`#container-${nextPage}`).removeClass('invisible');
  }
});
