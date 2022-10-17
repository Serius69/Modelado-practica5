function cargarDatos(){
    document.getElementById('tablita2').innerHTML=`    
    <table class="table mb-0" id="tablita2">
    <thead>
        <tr>
            <th scope="col">NSIM</th>
            <th scope="col">GNETA(Bs)</th>
            <th scope="col">TCART(articulos)</th>
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

    var contador = 1;
    var contador2= 1;

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

function carga2(totaljuegosganados,ganancianetatotal,nmsimul){
        pgnetatotal= ganancianetatotal/nmsimul;
        var fila2 = `
        <tr>
            <td>prueba</td>
            <td>${totaljuegosganados}</td>
            <td>${pgnetatotal}</td>
        </tr>`;
        console.log(fila2);
        // document.getElementById('t02').innerHTML2+=fila2;
}

function carga(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart){       
    if(contador==(nmaxh+1)){  
        console.log('termina el ciclo del contador '+contador2);       
        var totaljuegosganados=totaljuegosganados+tcart;
        var ganancianetatotal=ganancianetatotal+gneta;
        return;
    }  

    var gcasa = gcasa;
    var tcart = tcart;

    contador=contador+1;       

    console.log('inicia el ciclo externo'+ contador);
    var rlleclie = Math.random();   
    var lleclie=Math.round(4*rlleclie);
    if(lleclie==0){
        if(contador==(nmaxh+1)){
            gneta=tcart*(cuv-cuc)-cdiario;
            console.log('impresion1');
        }
        console.log('impresion2');
        cargartabla(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart);
        
    }else{
        var cclie = 0; 
        console.log('inicia el ciclo interno'); 
        while(cclie<lleclie){            
            var rcart = Math.random();    
            //validacion del randomico
            if(0<rcart<0.2){
                cart=0
                tcart=tcart+cart;
            }
            else if(0.2<rcart<0.5){
                cart=1;
                tcart=tcart+cart;
            }
            if (0.5<rcart<0.9){
                cart=2
                tcart=tcart+cart;
            }  else{
                cart=3
                tcart=tcart+cart;
            }    
            if(cclie==lleclie){                
                cclie=0;                
                if(contador==(nmaxh+1)){
                    gneta=tcart*(cuv-cuc)-cdiario;
                    console.log('impresion3');
                }
                console.log('impresion4');
                cargartabla(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart);
            }
            cclie++;
        }                  
    } 
    cargartabla(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart);

}
function cargartabla(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart){
    if(contador==(nmaxh+1)){
        if(contador2!=(nmsimul+1)){
            var fila = `
            <tr>
                <td>${contador2}</td>
                <td>${gneta}</td>
                <td>${tcart}</td>
            </tr>`;
            document.getElementById('tablita2').innerHTML+=fila;            
            carga(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart);
        }
    }   
    carga(nmsimul, nmaxh, cdiario, contador, contador2, cuc ,cuv,gneta,tcart);
}