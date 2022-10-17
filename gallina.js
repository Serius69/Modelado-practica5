  
    Simular = (nmd, preH, preP) => {
      var chr, cpm, cpnac, cpv, cth, ganneta, ganpromneta, listaps, nhp, promhr, prompm, prompv, reh, rpgh, rv, tcpv, tcth, tganprom;
      listaps = [];
      tree.delete(...tree.get_children());

      try {
        nmd = nmd.get();
        preH = preH.get();
        preP = preP.get();
        chr = 0;
        cpnac = 0;
        cpm = 0;
        tcpv = 0;
        tcth = 0;
        tganprom = 0;

        for (var i = 0, _pj_a = nmd; i < _pj_a; i += 1) {
          rpgh = random.random();
          console.log(rpgh);
          nhp = 0;
          cpv = 0;
          cth = 0;

          if (rpgh <= 0.13) {
            nhp = 0;
          } else {
            if (0.1353 < rpgh && rpgh <= 0.406) {
              nhp = 1;
            } else {
              if (0.406 < rpgh && rpgh <= 0.6767) {
                nhp = 2;
              } else {
                if (0.6767 < rpgh && rpgh <= 0.8571) {
                  nhp = 3;
                } else {
                  if (0.8571 < rpgh && rpgh <= 0.9473) {
                    nhp = 4;
                  } else {
                    if (0.9473 < rpgh && rpgh <= 0.9834) {
                      nhp = 5;
                    } else {
                      nhp = 6;
                    }
                  }
                }
              }
            }
          }

          if (nhp === 0) {} else {
            for (var j = 0, _pj_b = nhp; j < _pj_b; j += 1) {
              reh = random.random();

              if (reh <= 0.2) {
                chr = chr + 1;
              } else {
                if (0.2 < reh && reh <= 0.5) {
                  cpnac = cpnac + 1;
                  rv = random.random();

                  if (rv <= 0.2) {
                    cpm = cpm + 1;
                  } else {
                    cpv = cpv + 1;
                  }
                } else {
                  cth = cth + 1;
                }
              }
            }
          }

          tcth = tcth + cth;
          tcpv = tcpv + cpv;
          ganneta = cth * preH + cpv * preP;
          tganprom = tganprom + ganneta;
          listaps.append([i, cpv, cth, ganneta]);
        }

        for (var listap, _pj_c = 0, _pj_a = listaps, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
          listap = _pj_a[_pj_c];
          tree.insert("", tk.END, {
            "values": listap
          });
        }

        ganpromneta = tganprom / nmd;
        prompv = tcpv / nmd;
        prompm = cpm / nmd;
        promhr = chr / nmd;
        showpromgan.configure({
          "text": "{:.4}".format(ganpromneta)
        });
        showprobgan.configure({
          "text": "{:.4}".format(prompv)
        });
        showpromgan1.configure({
          "text": "{:.4}".format(prompm)
        });
        showprobgan2.configure({
          "text": "{:.4}".format(promhr)
        });
      } catch (e) {
        messagebox.showinfo({
          "message": "Verifique las variables ingresadas"
        });
      }
    };
