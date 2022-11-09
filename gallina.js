function cargarDatos(){
  document.getElementById('t01').innerHTML=`    
        <table class="table mb-0">
        <thead>
            <tr>
                <th scope="col">NSIM</th>
                <th scope="col">GNETA(Bs)</th>
                <th scope="col">CPViven(pollos)</th>
                <th scope="col">CHHHuevos(huevos)</th>
                <th scope="col">CHR(huevos)</th>
                <th scope="col">CPMueren(pollos)</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        </table>
  `;
  console.log('extraccion de variables');
  var x0 = document.getElementById("id-nmsimul").value; // numero maximo de simulaciones
  var x1 = document.getElementById("id-nmaxd").value; // Numero de dias (Dias)
  var x2 = document.getElementById("id-mdh").value; //Media de huevos por dia (huevos/dia)
  var x3 = document.getElementById("id-puvh").value; //Costo Unitario de compra (Bs/articulo)
  var x4 = document.getElementById("id-puvp").value; //Costo Unitario de Venta (Bs/articulo)

  var nmsimul =parseInt(x0);//numero de simulaciones
  var nmaxd =parseInt(x1);//Numero de dias (Dias)
  var mdh =parseInt(x2);//Media de huevos por dia (huevos/dia)
  var puvh = parseFloat(x3);//Costo Unitario de compra (Bs/articulo)
  var puvp = parseFloat(x4);//Costo Unitario de Venta (Bs/articulo)

  var cds = 0;
  var cds2= 0;

  if(x0== "" || x1 =="" || x2 =="" || x3=="" || x4==""){
      alert("Por favor llene los campos");
      return;
  }
  if(nmsimul <= 0 || nmaxd <= 0 || mdh<= 0 || puvh<= 0 || puvp<= 0){
      alert("Ningun valor puede ser negativo o 0");
      return;
  }    
  while(cds2<=nmsimul){
      carga(nmsimul, nmaxd, mdh, 0, cds, cds2,0,0,0,0);
      cds2++;      
  }
}
var totalpollosviven = 0;
var totalganancianeta = 0;
var totalhuevossiendohuevos = 0;
var totalhuevosrotos = 0;
var totalpollosmueren = 0;

    function carga(nmsimul, nmaxd, mdh, cpviven, cds, cds2,cpmueren,gneta,chhuevos,chr){
      if(cds==nmaxd){ 
          return;
      }       
      var gneta = gneta;
      var cpviven = 0;
      var cpmueren = 0;
      var chhuevos = 0;
      var chue = 0;
      var chr = 0;
      var chn = 0;
      cds=cds+1;       
      var rhp = Math.random();
      
      var chp=1-Gammacdf(1,0.5+1);

        while(chue<mdh){
          if(chp!=0){
            chue=chue+1;
            var rdh = Math.random();
            if(0<=rdh<=0.2){
              chr=chr+1;
            }else{
              if(0.2<rdh<=0.5){
                chn=chn+1;
                var rvpol = Math.random();
                if(0<=rvpol){
                  cpmueren=cpmueren+1;
                }else{
                  cpviven=cpviven+1;
                }
              }else{
                chhuevos=chhuevos+1;
              }
            }            
          }
          chue++;
        }
        //impresion
          
        if(cds==nmaxd){            
          totalpollosviven = totalpollosviven+cpviven;
          totalganancianeta = totalganancianeta + gneta;
          totalhuevossiendohuevos = totalhuevossiendohuevos + chhuevos;
          totalhuevosrotos = totalhuevosrotos + chr;
          totalpollosmueren = totalpollosmueren + cpmueren;

          if(cds2!=(nmsimul)){
              cds2++;
              var fila = `
              <tr>
                  <td>${cds2}</td>
                  <td>${gneta}</td>
                  <td>${cpviven}</td>
                  <td>${chhuevos}</td>
                  <td>${chr}</td>
                  <td>${cpmueren}</td>
              </tr>`;
              document.getElementById('t01').innerHTML+=fila;
          }
          if(cds2==(nmsimul)){      
              var objetivo = document.getElementById('texto_nav1');
              var objetivo2 = document.getElementById('texto_nav2');
              var objetivo3 = document.getElementById('texto_nav3');
              var objetivo4 = document.getElementById('texto_nav4');
              var objetivo5 = document.getElementById('texto_nav5');
  
              objetivo.innerHTML = totalganancianeta;
              objetivo2.innerHTML = totalpollosviven;
              objetivo3.innerHTML = totalhuevossiendohuevos;
              objetivo4.innerHTML = totalhuevosrotos;
              objetivo5.innerHTML = totalpollosmueren;
          }
          carga(nmsimul,nmaxd, cpviven, cds, cds2,cpmueren,gneta,chhuevos,chr);           
      }    
      carga(nmsimul,nmaxd, cpviven, cds, cds2,cpmueren,gneta,chhuevos,chr);
      // 
         
  }
  // POISSON

  function LogGamma(Z) {
    with (Math) {
      var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
      var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
    }
    return LG
  }
  
  function Gcf(X,A) {        // Good for X>A+1
    with (Math) {
      var A0=0;
      var B0=1;
      var A1=1;
      var B1=X;
      var AOLD=0;
      var N=0;
      while (abs((A1-AOLD)/A1)>.00001) {
        AOLD=A1;
        N=N+1;
        A0=A1+(N-A)*A0;
        B0=B1+(N-A)*B0;
        A1=X*A0+N*A1;
        B1=X*B0+N*B1;
        A0=A0/B1;
        B0=B0/B1;
        A1=A1/B1;
        B1=1;
      }
      var Prob=exp(A*log(X)-X-LogGamma(A))*A1;
    }
    return 1-Prob
  }
  
  function Gser(X,A) {        // Good for X<A+1.
      with (Math) {
      var T9=1/A;
      var G=T9;
      var I=1;
      while (T9>G*.00001) {
        T9=T9*X/(A+I);
        G=G+T9;
        I=I+1;
      }
      G=G*exp(A*log(X)-X-LogGamma(A));
      }
      return G
  }
  
  function Gammacdf(x,a) {
    var GI;
    if (x<=0) {
      GI=0
    } else if (x<a+1) {
      GI=Gser(x,a)
    } else {
      GI=Gcf(x,a)
    }
    return GI
  }
    

