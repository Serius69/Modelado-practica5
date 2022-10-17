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
    console.log('extraccion de variables');
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
    
    if(nmsimul <= 0 || nmd <= 0 || cbod<= 0 || cord<= 0 || cuinv <= 0 || pvu <= 0 || cuad<= 0 || media<= 0  || min<= 0 || max<= 0){
        alert("Ningun valor puede ser negativo o 0");
        return;
    }    
    // alert("comenzamos");

    //inicializacion de variables
    console.log('inicializacion de variables')
    var cnmd = 1;
    var cnmd2= 1;
    var cinv = 0;
    var tent = 0;
    var gneta=0;
    var ctot=0;
    var dins=0;
    var dazu=0;
    var ibru=0;
    var invazu=cbod;
    var cadq = 2450;
    var ctord = 100;
    while(cnmd2<nmsimul){
        carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
        cnmd2++;      
    }
}

function carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord){
        
        if(cnmd==(nmd+1)){   // if si cnmd==(nmd+1) INICIO
            console.log('termina el ciclo del cnmd '+cnmd2);       
            var costototal=costototal+ctot;
            var ganancianetatotal=ganancianetatotal+gneta;
            // sale de la funcion
            return;      
        }   // if si cnmd==(nmd+1) FIN
        // console.log('nmd'+nmd);
        console.log('cnmd'+cnmd);
        cnmd=cnmd+1;
        
        if((cnmd%7)==0){ // if si cnmdMOD7 == 0 INICIO
            pazu = cbod - invazu;
            cadq = cadq + (pazu * cuad);
            ctord = ctord + cord;
            //Generar randomico rtent
            var rtent = Math.random();
            tent = Math.round(min+max-min*rtent);
            //Generar randomico rdazu
            var rdazu = Math.random();
            console.log('cambio y reinicio de cnmd por reorden');
            dazu = Math.round(-100*Math.log(1-rdazu));
            if(invazu >= dazu){
                invazu = invazu - dazu;
                ibru = ibru + (dazu*pvu);
                cinv=cinv+(cuinv*invazu);
                if(cnmd==(nmd+1)){
                    ctot=cinv+cadq+ctord;
                    gneta=ibru-ctot;    

                    //finalizacion del diagrama
                    // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord); 
                }              
            }

            cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);

        } // if si cnmdMOD7 == 0 FIN
        else{
            if(tent==0){ // if  tent == 0 INICIO    YES
                var rdazu = Math.random();
                dazu = Math.round(-100*Math.log(1-rdazu));
                if(invazu >= dazu){  // if  invazu >= dazu INICIO    YES
                    invazu = invazu - dazu;
                    ibru = ibru + (dazu*pvu);
                    cinv=cinv+(cuinv*invazu);
                        if(cnmd==(nmd+1)){ // if  cnmd==(nmd+1) FIN    YES
                            ctot=cinv+cadq+ctord;
                            gneta=ibru-ctot;      
                            
                            // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord); 
                        } // if  cnmd==(nmd+1) FIN    YES
                    } // if  invazu >= dazu FIN    YES
                    else{  // if  invazu >= dazu INICIO    NO
                        dins=dins+dazu-invazu;
                        ibru=ibru+(invazu*pvu);
                        invazu=0;
                        if(cnmd==(nmd+1)){ // if  cnmd==(nmd+1) FIN    YES
                            ctot=cinv+cadq+ctord;
                            gneta=ibru-ctot;  
                            // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
                                        
                        } // if  cnmd==(nmd+1) FIN    YES
                        // else{
                            // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
                        // }
                    } // if  invazu >= dazu FIN  NO
                // carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);            
                } // if  tent == 0 INICIO   YES
                else{   // if  tent == 0 INICIO   NO
                    tent=tent-1;
                    if(tent==0){ // if  tent == 0 INICIO    YES
                        invazu=invazu+pazu;
                        var rdazu = Math.random();
                        dazu = Math.round(-100*Math.log(1-rdazu));
                        if(invazu >= dazu){  // if  invazu >= dazu INICIO    YES
                            invazu = invazu - dazu;
                            ibru = ibru + (dazu*pvu);
                            cinv=cinv+(cuinv*invazu);
                                if(cnmd==(nmd+1)){ // if  cnmd==(nmd+1) FIN    YES
                                    ctot=cinv+cadq+ctord;
                                    gneta=ibru-ctot;  
                                    // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
                                }
                                // else{// if  invazu >= dazu INICIO  NO
                                    // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord); 
                                // } // if  invazu >= dazu IFIN NO
                                // if  cnmd==(nmd+1) FIN    YES
                            } // if  invazu >= dazu FIN    YES
                            else{  // if  invazu >= dazu INICIO    NO
                                dins=dins+dazu-invazu;
                                ibru=ibru+(invazu*pvu);
                                invazu=0;
                                if(cnmd==(nmd+1)){ // if  cnmd==(nmd+1) FIN    YES
                                    ctot=cinv+cadq+ctord;
                                    gneta=ibru-ctot;    
                                    // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);    
                                } // if  cnmd==(nmd+1) FIN    YES
                                // else{ // if  cnmd==(nmd+1) INICIO    NO
                                    // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
                                // } // if  cnmd==(nmd+1) FIN    NO
                            } // if  invazu >= dazu FIN  NO
                            // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd++,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);                    
                    } // if  tent == 0 FIN    YES
                    else{ // if  tent == 0 INICIO    NO
                        var rdazu = Math.random();
                        dazu = Math.round(-100*Math.log(1-rdazu));
                        if(invazu >= dazu){ // if  invazu >= dazu INICIO  YES
                            invazu = invazu - dazu;
                            ibru = ibru + (dazu*pvu);
                            cinv=cinv+(cuinv*invazu);
                            if(cnmd==(nmd+1)){ // if  cnmd==(nmd+1) INICIO    YES
                                ctot=cinv+cadq+ctord;
                                gneta=ibru-ctot;     
                                  
                                // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
                            }// if  cnmd==(nmd+1) FIN    YES   
                            // else{ // if  invazu >= dazu INICIO  YES
                                // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
                            // }   // if  invazu >= dazu FIN  NO
                                    
                        } // if  invazu >= dazu FIN YES
                        else{ // if  invazu >= dazu INICIO NO
                            dins=dins+dazu-invazu;
                            ibru=ibru+(invazu*pvu);
                            invazu=0;
                            if(cnmd==(nmd+1)){ // if  cnmd==(nmd+1) FIN    YES
                                ctot=cinv+cadq+ctord;
                                gneta=ibru-ctot;       
                                // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);          
                            } // if  cnmd==(nmd+1) FIN    YES
                            // else{ // if  cnmd==(nmd+1) FIN    NO
                                // cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
                            // } // if  cnmd==(nmd+1) FIN    NO
                        } // if  invazu >= dazu FIN NO
                    } // if  tent == 0 FIN   NO
                }
                        cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);

        }  

        // carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
    }        


    function cargartabla(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord){
        if(cnmd==(nmd+1)){
            if(cnmd2!=(nmsimul+1)){
                var fila = `
                <tr>
                    <td>${cnmd2}</td>
                    <td>${gneta}</td>
                    <td>${ctot}</td>
                    <td>${dins}</td>
                </tr>`;
                document.getElementById('t01').innerHTML+=fila;            
                return;
            }
        }   
        cnmd=cnmd+1;
        carga(nmsimul,nmd, cbod, cord, cuinv, pvu ,cuad ,media ,min,max,cnmd++,cnmd2,gneta,ctot,dins,cinv,tent,dazu,invazu,ibru,cadq,ctord);
    }