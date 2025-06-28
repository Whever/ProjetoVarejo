//Funçao para corrigir a data vinda do banco de dados (no formato 'YYYY-MM-DD)

const parseDateBd = (dataString) => { 
    let [ano,mes, dia] = dataString.split("-");
    dia = parseInt(dia);
    mes = parseInt(mes);
    ano = parseInt(ano);

    return new Date(ano,mes - 1, dia + 1);
}

const parseTimeBd = (time) =>{

    let horas = parseInt(time.getHours()) + 3;
    let minutos = parseInt(time.getHours());
    let segundos = parseInt(time.getseconds());

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    return `${horas}:${minutos}:${segundos}`;
}

module.exports = {parseDateBd, parseTimeBd};