var totaljuegosganados = 0;
var totalganancianeta = 0;
var pgnetatotal = 0;
var sumaporcentajes = 0;

function cargarDatos(){
    document.getElementById('t01').innerHTML=`    
    <table class="table mb-0" id="t01">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">NSIM</th>
                                                            <th scope="col">GNETA(Bs)</th>
                                                            <th scope="col">NJUEC(Juego)</th>
                                                            <th scope="col">PJUEC(%)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
            
    `;

    console.log('extraccion de variables');
    var x0 = document.getElementById("id-nmsimul").value; // numero maximo de simulaciones
    var x1 = document.getElementById("id-nmj").value; // numero maximo de juegos
    var x2 = document.getElementById("id-cjue").value; //Costo del Juego 
    var x3 = document.getElementById("id-gjug").value; //Ganancia del Jugador
    var nmsimul =parseInt(x0);//numero de simulaciones
    var nmj =parseInt(x1);//numero de juegos
    var cjue =parseFloat(x2);//Costo del Juego 1
    var gjug = parseFloat(x3);//Ganancia del Jugador
    var contador = 0;
    var contador2= 0;

     totaljuegosganados = 0;
     totalganancianeta = 0;
     pgnetatotal = 0;
     sumaporcentajes = 0;

    if(x0== "" || x1 =="" || x2 =="" || x3==""){
        alert("Por favor llene los campos");
        return;
    }
    if(nmsimul <= 0 || nmj <= 0 || cjue<= 0 || gjug<= 0){
        alert("Ningun valor puede ser negativo");
        return;
    }    
    // alert("comenzamos");
    while(contador2<nmsimul){
        carga(nmsimul,nmj, cjue, contador, contador2, gjug ,0 ,0 ,0);
        contador2++;      
    }
}
function limpiarTabla(){
    var fila = `
    <thead>
    <tr>
        <th scope="col">NSIM</th>
        <th scope="col">GNETA(Bs)</th>
        <th scope="col">NJUEC(Juego)</th>
        <th scope="col">PJUEC(%)</th>
    </tr>
    </thead>
    <tbody>
        
    </tbody>`;
                document.getElementById('t01').innerHTML=fila;
}
function limpiarPromedio(){
    var objetivo = document.getElementById('texto_nav1');
    var objetivo2 = document.getElementById('texto_nav2');
    var objetivo3 = document.getElementById('texto_nav3');

    objetivo.innerHTML = 0;
    objetivo2.innerHTML = 0;
    objetivo3.innerHTML = 0;
}

function carga(nmsimul,nmj, cjue, contador, contador2, gjug,gcasa,gneta,njcasa){
    if(contador==nmj){ 
        return;
    }       
    //inicializacion de variables
    console.log('inicializacion de variables')
    var gneta = gneta;
    var cjue = cjue;
    var gcasa = gcasa;
    var njcasa = njcasa;
    var pjcasa = 0;

    console.log('inicia el ciclo externo');
    
    contador=contador+1;
    console.log('inicia el ciclo interno');            
    var rd1 = Math.random();
    var rd2 = Math.random();

    // Calculo de los lados de los dados
    var dado1 = parseInt((1+(5)*rd1));
    var dado2 = parseInt((1+(5)*rd2));
            
    sumd1d2=dado1+dado2;
    console.log('sumatoria dados '+sumd1d2);
    //VERIFICA SI LA SUMA ES IGUAL A 7
        if(sumd1d2!=7){
            gcasa=gcasa+cjue;
            njcasa=njcasa+1;
            console.log('juegos que gana la casa '+njcasa);  
        }else{
            gcasa=gcasa+cjue-gjug;
        }    

        if(contador==nmj){         
            gneta=(gcasa);         
            pjcasa=(njcasa/nmj)*100
            totaljuegosganados = totaljuegosganados+njcasa;
            totalganancianeta = totalganancianeta + gneta;
            sumaporcentajes = sumaporcentajes + pjcasa;
            if(contador2!=(nmsimul)){
                contador2++;
                var fila = `
                <tr>
                    <td>${contador2}</td>
                    <td>${gneta}</td>
                    <td>${njcasa}</td>
                    <td>${pjcasa.toFixed(2)}</td>
                </tr>`;
                document.getElementById('t01').innerHTML+=fila;
            }
            if(contador2==(nmsimul)){
                pgnetatotal = sumaporcentajes/nmsimul; 
    
                var objetivo = document.getElementById('texto_nav1');
                var objetivo2 = document.getElementById('texto_nav2');
                var objetivo3 = document.getElementById('texto_nav3');
    
                objetivo.innerHTML = (totalganancianeta/nmsimul).toFixed(1);
                objetivo2.innerHTML = (totaljuegosganados/nmsimul).toFixed(0);
                objetivo3.innerHTML = ((pgnetatotal/nmsimul)*100).toFixed(2);
            }
            carga(nmsimul,nmj, cjue, contador, contador2, gjug,gcasa,gneta,njcasa);           
        }    
        carga(nmsimul,nmj, cjue, contador, contador2, gjug,gcasa,gneta,njcasa);
        // 
        
       
}