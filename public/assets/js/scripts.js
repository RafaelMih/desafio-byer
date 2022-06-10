$(document).ready(function () {
  $("#tabela").DataTable({
    paging: false,
    searching: false,
    showing: false,
    data: getJson().mananciais,
    columns: [
      { title: "Nome" },
      { title: "Volume %" },
      { title: "Variação %" },
      { title: "Volume Operacional (hm)" },
      { title: "Mês (mm)" },
      { title: "Max. Histórica (mm)" },
    ],
  });
  $("#tabela_info").addClass("d-none");
  $("#minimo").val(50);
  verificar();
});

function notificar() {
  var perc = parseInt($("#minimo").val());

  if (perc > 50) {
    alert(
      "Os contatos só podem ser notificados com percentual menor ou igual a 50%"
    );
  } else {
    alert("Contatos notificados");
    $("#form-notificacao").trigger("reset");
  }
}

function verificar() {
  var perc = parseInt($("#minimo").val());
  if (!perc) alert("Informe um percentual");
  else if (perc < 0 || perc > 100)
    alert("O percentual deve estar entre 0 e 100");
  else {
    var nomes = [];
    $("#tabela > tbody  > tr").each(function (index, tr) {
      var value = parseInt($(tr).find("td:eq(1)").html());
      var nome = $(tr).find("td:eq(0)").html();
      if (value < perc) {
        $(tr).addClass("colorRed");
        nomes.push(nome);
      } else {
        $(tr).removeClass("colorRed");
      }
    });

    var mensagem =
      `Olá! Gostaria de informar que ` +
      (nomes.length == 1 ? "o manancial " : "os mananciais ") +
      `<b>` +
      nomes.join(", ").replace(/, ([^,]*)$/, " e $1") +
      `</b> ` +
      (nomes.length == 1 ? "está " : "estão ") +
      `abaixo de <b>` +
      perc +
      `%</b>. `;
    mensagem =
      perc <= 50
        ? mensagem +
          "<br/><span class='color-red'><b>Precisamos racionar água!</b></span>"
        : mensagem;
    $("#mensagem").html(mensagem);

    console.log(perc);
    if (perc > 50 || nomes.length == 0) {
      $("#div-notificacao").addClass("d-none");
      $("#div-notificacao").removeClass("d-inline");
    } else {
      $("#div-notificacao").removeClass("d-none");
      $("#div-notificacao").addClass("d-inline");
    }
  }
}

function getJson() {
  return {
    mananciais: [
      ["Cantareira", "41,5", "-0,1", 407.62618, "12,1", "59,1"],
      ["Alto Tietê", "62,1", "-0,1", 347.85839, "2,9", "55,9"],
      ["Guarapiranga", "78,8", "-0,3", 134.88414, "2,8", "54,0"],
      ["Cotia", "84,4", "-0,2", 13.93045, "7,2", "59,0"],
      ["Rio Grande", "99,8", "-0,2", 111.99162, "9,8", "61,6"],
      ["Rio Claro", "47,0", "-0,1", 6.42293, "20,0", "98,5"],
      ["São Lourenço", "94,6", "0,1", 84.01226, "23,6", "76,3"],
    ],
    total: {
      SistemaId: "-1",
      Nome: "Volume total armazenado RMSP (*)",
      VolumePorcentagemAR: "56,9",
      VolumePorcentagem: 56.9092,
      VolumeVariacaoStr: "-0,1",
      VolumeVariacaoNum: -0.1,
      VolumeOperacional: 1107.29915,
      ImagePrecDia: "prec_icon.png",
      PrecDia: "",
      PrecMensal: "",
      PrecHist: "",
      IndicadorVolumeDia: 0,
      IndicadorVolume: 2,
      ISH: 0,
    },
  };
}
