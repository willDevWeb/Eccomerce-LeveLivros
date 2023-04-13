async function getSales(){
    const url = `${urlBase.api_purchases}/sales`;
    const option = {
        method:"GET",
        headers:{
            "Authorization":`Baerer ${token}`,
            "paginate":JSON.stringify(paginate),
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    let total = 0;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    let arr = [ ['mês', 'Vendas', 'Dispesas'], ];

    response.sales.forEach(element => {
        const data = new Date(Date.UTC(2000, element.mes, 1));
        const mesString = data.toLocaleString('pt-BR', { month: 'long' });
        
        total += Number(element.total_vendas);
        arr.push(
            [mesString, Number(element.total_vendas), 60]
        )
    })
    let total_price = document.querySelector('#total_price');
    total_price.innerHTML = `Valor total arecadado <strong>R$: ${total}</strong>`;

    function drawChart() {
        var data = google.visualization.arrayToDataTable(arr);
        var options = {
            title: 'Histórico de vendas do site',
            hAxis: {title: 'Meses',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0},
        };
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    };
};getSales();