var totaldemandainsatisfecha = 0;
var totalganancianeta = 0;
var totalcostototal = 0;
function cargarDatos(){
    document.getElementById('t01').innerHTML=`    
    <div class="table-responsive">
      <table class="table mb-0" id="t01">
        <thead>
          <tr>
            <th scope="col">NSIM</th>
            <th scope="col">GNETA(Bs)</th>
            <th scope="col">CTOT(Bs)</th>
            <th scope="col">DINST(Kg)</th>
          </tr>
       </thead>
       <tbody>
    </tbody>
    </table>
    </div>           
    `;
    var x0 = document.getElementById("id-nmsimul").value; // numero maximo de simulaciones
    var x1 = document.getElementById("id-nmd").value; //Numero de Dias (Dia)
    var x2 = document.getElementById("id-cbod").value; //Capacidad Bodega (Kg)
    var x3 = document.getElementById("id-cord").value; //Costo reorden (Bs/7 dia)
    var x4 = document.getElementById("id-cuinv").value; //Costo Unitario de inventario (Bs/Kg)
    var x5 = document.getElementById("id-pvu").value; //Costo Unitario de Venta (Bs/Kg)
    var x6 = document.getElementById("id-cuad").value; //Costo Unitario de Adquisicion (Bs/Kg)
    var x7 = document.getElementById("id-media").value; //Media (Kg/dia)
    var x8 = document.getElementById("id-min").value; //Minimo
    var x9 = document.getElementById("id-max").value; //maximo
    
    if(x0== "" || x1 =="" || x2 =="" || x3=="" || x4== "" || x5 =="" || x6 =="" || x7=="" || x8 =="" || x9==""){
        alert("Por favor llene los campos");
        return;
    }

    if(nmsimul <= 0 || nmd <= 0 || cbod<= 0 || cord<= 0 || cuinv <= 0 || pvu <= 0 || cuad<= 0 || media<= 0  || min<= 0 || max<= 0){
        alert("Ningun valor puede ser negativo o 0");
        return;
    }   

    var nmsimul =parseInt(x0); // numero maximo de simulaciones
    var nmd =parseInt(x1);//Numero de Dias (Dia) 
    var cbod =parseFloat(x2);//Capacidad Bodega (Kg)
    var cord = parseFloat(x3);//Costo reorden (Bs/7 dia)
    var cuinv =parseFloat(x4);//Costo Unitario de inventario (Bs/Kg)
    var pvu =parseFloat(x5);//Costo Unitario de Venta (Bs/Kg)
    var cuad =parseFloat(x6);//Costo Unitario de Adquisicion (Bs/Kg)
    var media = parseFloat(x7);//Media (Kg/dia)
    var min = parseInt(x8); //Minimo
    var max = parseInt(x9); //maximo

    var invazu=cbod;
     
    //inicializacion de variables
    var cnmd = 0;
    var cnmd2= 0;
    totaldemandainsatisfecha = 0;
    totalganancianeta = 0;
    totalcostototal = 0;
    
    while(cnmd2<nmsimul){
        carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,0,0,0,0,0,0,invazu,0,(cbod*cuad),cord,0);
        cnmd2++;      
    }
}

function carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord,pazu){
        if(cnmd==nmd){ 
            ibru=0;
            dins=0;
            return;      
        } 
        cnmd=cnmd+1;        
        var cinv = 0;
        var tent = tent;
        var gneta=0;
        var ctot=0;
        var dins=dins;
        var dazu=0;
        var ibru=ibru;
        var pazu=pazu;
        console.log(pazu);
        if((cnmd%7)==0){ // if si cnmdMOD7 == 0 INICIO
            pazu = cbod - invazu;
            cadq = cadq + (pazu * cuad);
            ctord = ctord + cord;
            //Generar randomico rtent
            var rtent = Math.random();
            tent = Math.round(min+max-min*rtent);         
        } // if si cnmdMOD7 == 0 FIN
        
        if(tent!=0){ // if  tent == 0 INICIO    YES
            tent=tent-1;
            if(tent==0){ // if  tent == 0 INICIO    YES
                invazu=invazu+pazu;                                              
             } // if  tent == 0 FIN    YES
        } // if  tent == 0 INICIO   YES 
        var rdazu = Math.random();
        dazu = Math.round(-100*Math.log(1-rdazu));         
        
        console.log("invazu"+invazu);
        console.log("dazu"+dazu);
        if(invazu >= dazu){  // if  invazu >= dazu INICIO    YES
            invazu = invazu - dazu;
            ibru = ibru + (dazu*pvu);
            cinv=cinv+(cuinv*invazu);              
        } // if  invazu >= dazu FIN    YES
        else{
            dins=dins+(dazu-invazu);
            ibru=ibru+(invazu*pvu);      
            invazu=0;                
        }          
        if(cnmd==nmd){         
            ctot=cinv+cadq+ctord;
            console.log("ibru"+ibru);
            console.log("ctot"+ctot);
            gneta=(ibru-ctot);
            if(gneta>2000){
                gneta=gneta-2000
            }
            totalcostototal = totalcostototal+ctot;
            totalganancianeta = totalganancianeta + gneta;
            totaldemandainsatisfecha = totaldemandainsatisfecha + dins;
            if(cnmd2!=(nmsimul)){
                cnmd2++;
                var fila = `
                <tr>
                    <td>${cnmd2}</td>
                    <td>${gneta.toFixed(2)}</td>
                    <td>${ctot.toFixed(2)}</td>
                    <td>${dins}</td>
                </tr>`;
                document.getElementById('t01').innerHTML+=fila;
            }
            if(cnmd2==(nmsimul)){    
                var objetivo = document.getElementById('texto_nav1');
                var objetivo2 = document.getElementById('texto_nav2');
                var objetivo3 = document.getElementById('texto_nav3');
    
                objetivo.innerHTML = (totalganancianeta/nmsimul).toFixed(2);
                objetivo2.innerHTML = (totalcostototal/nmsimul).toFixed(2);
                objetivo3.innerHTML = (totaldemandainsatisfecha/nmsimul).toFixed(0);
            }
            carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord,pazu);           
        }    
        carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord,pazu);
    }        

    function limpiarTabla(){
        var fila = `
        <thead>
          <tr>
            <th scope="col">NSIM</th>
            <th scope="col">GNETA(Bs)</th>
            <th scope="col">CTOT(Bs)</th>
            <th scope="col">DINST(Kg)</th>
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
