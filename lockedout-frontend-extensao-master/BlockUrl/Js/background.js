// função que realiza o bloqueio
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var tabId = details.tabId;

    chrome.storage.sync.get([tabId.toString()], async function (result) {
      var guiaAutenticada = result[tabId];

      if (!guiaAutenticada || !guiaAutenticada.autenticado) {
        // Verifica se a URL da solicitação corresponde a alguma URL a ser bloqueada
        if (urlsBloqueio.some(item => item.urlRegex.test(details.url))) {
          console.log(`URL da página atual: ${details.url}`); // Adicione este log
          console.log("Encontrado!");
          chrome.tabs.update(tabId, {
            url: `html/BloqueioPermanente.html?url=${details.url}`,
          });
        }
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);


// Função para capturar e armazenar histórico de navegação
var ultimo = {
  url: null,
  timestamp: null
};

function pegarUltimoHistorico() {
  chrome.history.search({ text: "", startTime: 0, maxResults: 1 }, function (historyItems) {

    if (historyItems.length > 0) {

      const item = historyItems[0];
      const visitTime = new Date(item.lastVisitTime);
      const localTime = new Date(visitTime.getTime() - (visitTime.getTimezoneOffset() * 60000));

      var historyData = {
        url: item.url,
        timestamp: localTime.toISOString()
      };

      if (ultimo == null || historyData.timestamp != ultimo.timestamp) {

        enviaHistorico(1, historyData.url, historyData.timestamp)

        console.log("Ultimo:", ultimo.url, "hora:", ultimo.timestamp)
        console.log("Atual:", historyData.url, "hora:", historyData.timestamp)
        console.log(historyData.timestamp)
        localStorage.setItem('lastHistory', JSON.stringify(historyData));
      } else {}

      ultimo = historyData;

    }
  });
  setTimeout(pegarUltimoHistorico, 1);
}

pegarUltimoHistorico()



