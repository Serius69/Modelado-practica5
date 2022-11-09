var totalganancianeta = 0;
var totalcanitadadventasdia = 0;

function cargarDatos(){
    document.getElementById('t01').innerHTML=`    
    <table class="table mb-0" id="t01">
    <thead>
        <tr>
        <th scope="col">Numero simulacion</th>
        <th scope="col">Ganancia Neta(Bs)</th>
        <th scope="col">Articulos vendidos (articulos)</th>
        </tr>
    </thead>
    <tbody>
        
    </tbody>
    </table>
    `;
    console.log('extraccion de variables');
    var x0 = document.getElementById("id-nmsimul").value; // numero maximo de simulaciones
    var x1 = document.getElementById("id-nmaxh").value; // Numero de horas (Horas)
    var x2 = document.getElementById("id-cdiario").value; //Costo Fijo diario (Bs/dia)
    var x3 = document.getElementById("id-cuc").value; //Costo Unitario de compra (Bs/articulo)
    var x4 = document.getElementById("id-cuv").value; //Costo Unitario de Venta (Bs/articulo)

    var nmsimul =parseInt(x0);//numero de simulaciones
    var nmaxh =parseInt(x1);//Numero de horas (Horas)
    var cdiario =parseFloat(x2);//Costo Fijo diario (Bs/dia)
    var cuc = parseFloat(x3);//Costo Unitario de compra (Bs/articulo)
    var cuv = parseFloat(x4);//Costo Unitario de Venta (Bs/articulo)

    var contador = 0;
    var contador2= 0;

    totalganancianeta = 0;
    totalcanitadadventasdia = 0;

    if(x0== "" || x1 =="" || x2 =="" || x3=="" || x4==""){
        alert("Por favor llene los campos");
        return;
    }
    if(nmsimul <= 0 || nmaxh <= 0 || cdiario<= 0 || cuc<= 0 || cuv<= 0){
        alert("Ningun valor puede ser negativo o 0");
        return;
    }    
    while(contador2<=nmsimul){
        carga(nmsimul, nmaxh, cdiario, contador, contador2, cuc,cuv ,0 ,0);
        contador2++;      
    }
}



function carga(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart){       
    if(contador==nmaxh){  
        return;
    }  

    contador=contador+1;       

    console.log('inicia el ciclo externo'+ contador);
    var rlleclie = Math.random();   
    var lleclie=Math.round(4*rlleclie);

    if(lleclie!=0){
        var cclie = 0; 
        console.log('inicia el ciclo interno'); 
        while(cclie<lleclie){            
            var rcart = Math.random();    
            //validacion del randomico
            if(0<rcart<=0.2){
                cart=0
                tcart=tcart+cart;
            }
            else if(0.2<rcart<=0.5){
                cart=1;
                tcart=tcart+cart;
            }
            if (0.5<rcart<=0.9){
                cart=2
                tcart=tcart+cart;
            }  else{
                cart=3
                tcart=tcart+cart;
            } 
            cclie++;
        }                
    } 

    if(contador==nmaxh){        
        gneta=tcart*(cuv-cuc)-cdiario;
        totalcanitadadventasdia = totalcanitadadventasdia+tcart;
        totalganancianeta = totalganancianeta + gneta;
        if(contador2!=(nmsimul)){
            contador2++;
            var fila = `
            <tr>
                <td>${contador2}</td>
                <td>${gneta}</td>
                <td>${tcart}</td>
            </tr>`;
            document.getElementById('t01').innerHTML+=fila;
        }
        if(contador2==(nmsimul)){

            var objetivo = document.getElementById('texto_nav1');
            var objetivo2 = document.getElementById('texto_nav2');

            objetivo.innerHTML = (totalganancianeta/nmsimul).toFixed(2);
            objetivo2.innerHTML = (totalcanitadadventasdia/nmsimul).toFixed(0);
        }
        carga(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart);           
    }    
    carga(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart);

}

function limpiarTabla(){
    var fila = `
    <thead>
        <tr>
        <th scope="col">Numero simulacion</th>
        <th scope="col">Ganancia Neta(Bs)</th>
        <th scope="col">Articulos vendidos (articulos)</th>
        </tr>
    </thead>
    <tbody>
        
    </tbody>`;
                document.getElementById('t01').innerHTML=fila;
}
function limpiarPromedio(){
    var objetivo = document.getElementById('texto_nav1');
    var objetivo2 = document.getElementById('texto_nav2');

    objetivo.innerHTML = 0;
    objetivo2.innerHTML = 0;
}