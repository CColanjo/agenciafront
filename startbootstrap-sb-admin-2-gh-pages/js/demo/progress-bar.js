function onload (){
    carregarPorcetagemHomem();
    carregarPorcetagemFemino();
    carregarDadosPorEstado();
    carregarDadosIMCFaixa();
    carregarDadosTipoSanguineo();
    carregarQuantidadeDoadorTipoSanguineo();
}


function acessarServidor(caminho){
    try {
        let request = new XMLHttpRequest();
        request.open('GET','http://127.0.0.1:8080/'+caminho,false);
        request.send();
        
        if  (request.readyState==4){
            if (request.status==200){
                let  objeto = JSON.parse(request.responseText);
                return objeto;
            }else{
                console.log("deu erro");
            }
        }
    }catch (e) {
        console.log("deu erro", e);
    }
}


function carregarPorcetagemHomem(){
    let objeto = acessarServidor("pacientespercentmale"); 
    document.getElementById('percentualMasculino').innerHTML = objeto;

}

function carregarPorcetagemFemino(){
   let objeto = acessarServidor("pacientespercentfemale");
    document.getElementById('percentualFeminino').innerHTML = objeto;
}

function carregarDadosPorEstado(){
    let objeto = acessarServidor("pacientesstate"); 

    for (var key in objeto) {
        carregarProgress('qtdEstado', key, objeto[key], 'progress-bar bg-warning');
    }

}

function carregarDadosIMCFaixa(){
    let objeto = acessarServidor("pacienteageimc"); 

    for (var key in objeto) {
        carregarProgress('imc', key, objeto[key],'progress-bar bg-info');
    }
}

function carregarDadosTipoSanguineo(){
    let objeto = acessarServidor("pacientestiposangue"); 

    for (var key in objeto) {
        carregarProgress('mediaIdade', key, objeto[key],'progress-bar bg-success');
    }
}
function carregarQuantidadeDoadorTipoSanguineo(){
    let objeto = acessarServidor("pacientestiposangue"); 

    for (var key in objeto) {
        carregarProgress('qtdDoador', key, objeto[key],'progress-bar bg-danger');
    }
}




function carregarProgress(id, estado, valor, corProgress){

    var h4 = document.createElement("h4");
    h4.setAttribute('class','small font-weight-bold');
    h4.innerHTML = estado;

    var span = document.createElement("span");
    span.setAttribute('class','float-right');
    span.innerHTML= valor;

    h4.appendChild(span);
    document.getElementById(id).appendChild(h4);

    var div = document.createElement("div");
    div.setAttribute('class',"progress mb-4");

    var div2 = document.createElement('div');
    div2.setAttribute('class',corProgress);
    div2.setAttribute('role','progressbar');
    div2.setAttribute('style',`width: ${valor}%`);
    div2.setAttribute('aria-valuenow', valor);
    div2.setAttribute('valuemin','0');
    div2.setAttribute('valuemax','100');

    div.appendChild(div2);
    document.getElementById(id).appendChild(div);

}





    
