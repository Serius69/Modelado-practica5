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
     document.getElementById('t02').innerHTML2=`    
    <div class="table-responsive" >
                                        <table class="table mb-0" id="t02">
                                            <thead>
                                                <tr>
                                                    <th scope="col">GNETA - Ganancia Neta (Casa)</th>
                                                    <th scope="col">NJUEC - Numero de Juegos Ganados (Casa)</th>
                                                    <th scope="col">PJUEC(%)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </table>
                                    </div>
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
    var contador = 1;
    var contador2= 1;
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

function carga2(totaljuegosganados,ganancianetatotal,nmsimul){
    
        pgnetatotal= ganancianetatotal/nmsimul;
        var fila2 = `
        <tr>
            <td>prueba</td>
            <td>${totaljuegosganados}</td>
            <td>${pgnetatotal}</td>
        </tr>`;
        console.log(fila2);
        document.getElementById('t02').innerHTML2+=fila2;
        console.log('Ganancia neta simulacion '+pgnetatotal);
        console.log('Juegos Ganados '+totaljuegosganados);
        console.log('Porcentaje Juegos Ganados '+pgnetatotal);
        console.log('termina el ciclo');
}

function carga(nmsimul,nmj, cjue, contador, contador2, gjug,gcasa,gneta,njcasa){
    if(contador==(nmj+1)){  
        console.log('termina el ciclo del contador '+contador2);       
        var totaljuegosganados=totaljuegosganados+njcasa;
        var ganancianetatotal=ganancianetatotal+gneta;
        carga2(totaljuegosganados,ganancianetatotal,nmsimul);
        // if(contador2==(nmsimul+1)){ 
            return;
        // }        
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
        gneta=(gcasa);         
        pjcasa=(njcasa/nmj)*100 
        
        if(contador==(nmj+1)){                  
            console.log('cargar fila1');
            if(contador2!=(nmsimul+1)){
                var fila = `
                <tr>
                    <td>${contador2}</td>
                    <td>${gneta}</td>
                    <td>${njcasa}</td>
                    <td>${pjcasa}</td>
                </tr>`;
                document.getElementById('t01').innerHTML+=fila;
            } 
            carga(nmsimul,nmj, cjue, contador, contador2, gjug,gcasa,gneta,njcasa);           
        }
        
        carga(nmsimul,nmj, cjue, contador, contador2, gjug,gcasa,gneta,njcasa);  
        
       
}