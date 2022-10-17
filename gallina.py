import random
from tkinter import ttk
import tkinter as tk
import View.PrincipalView as pv
import tkinter.font as tkFont
from tkinter import messagebox

class Page3(tk.Frame):

    def __init__(self, parent, controller):

        tk.Frame.__init__(self, parent)
        self.configure(background="white")
        fontStyle = tkFont.Font(family="Lucida Grande", size=35)
        fontStylebt = tkFont.Font(family="Cooper Black", size=20)
        labelTitle = ttk.Label(self, text="Gallina pone huevos",background='white', font=fontStyle)
        labelTitle.place(anchor="center", relx=.5, rely=.1)

        labelnummax = ttk.Label(self, text="Número maximo de dias:", background='white')
        labelnummax.place(relx=.05, rely=.2)
        nunmax = tk.IntVar()
        etnunmax = ttk.Entry(self, textvariable=nunmax)
        etnunmax.place(relx=.23, rely=.2, relwidth=0.15)

        labelingjue = ttk.Label(self, text="Precio Huevo:", background='white')
        labelingjue.place(relx=.50, rely=.2)
        preciohuevos = tk.IntVar()
        etingjue = ttk.Entry(self, textvariable=preciohuevos)
        etingjue.place(relx=.65, rely=.2, relwidth=0.15)

        labelper = ttk.Label(self, text="Precio Pollo:", background='white')
        labelper.place(relx=.05, rely=.3)
        preciopollos = tk.IntVar()
        etper = ttk.Entry(self, textvariable=preciopollos)
        etper.place(relx=0.23, rely=.3, relwidth=0.15)


        columns = ('No de dia', 'Cantidad pollos vivos', 'Cantidad huevos', 'Ganancia neta del dia')
        tree = ttk.Treeview(self, columns=columns, show='headings')
        tree.heading('No de dia', text='No de dia')
        tree.heading('Cantidad pollos vivos', text='Cantidad pollos vivos')
        tree.heading('Cantidad huevos', text='Cantidad huevos')
        tree.heading('Ganancia neta del dia', text='Ganancia neta del dia')
        tree.place(relx=.05, rely=.4, relwidth=.9, relheight=.4)
        scrollbar = ttk.Scrollbar(self,orient=tk.VERTICAL, command=tree.yview)
        tree.configure(yscroll=scrollbar.set)
        scrollbar.place(relx=.95, rely=.4, relwidth=.02, relheight=.4)

        labelpromgan = ttk.Label(self, text="Ganancia Prom. NetaxDia:", background='white')
        labelpromgan.place(relx=.05, rely=.85)
        showpromgan = ttk.Label(self, text="0000", background='white')
        showpromgan.place(relx=.2, rely=.85)

        labelprobgan = ttk.Label(self, text="Promedio pollos vivos:", background='white')
        labelprobgan.place(relx=.4, rely=.85)
        showprobgan = ttk.Label(self, text="0000", background='white')
        showprobgan.place(relx=.6, rely=.85)

        labelpromgan = ttk.Label(self, text="Promedio pollos muertos:", background='white')
        labelpromgan.place(relx=.05, rely=.9)
        showpromgan1 = ttk.Label(self, text="0000", background='white')
        showpromgan1.place(relx=.2, rely=.9)

        labelprobgan = ttk.Label(self, text="Promedio huevos rotos:", background='white')
        labelprobgan.place(relx=.4, rely=.9)
        showprobgan2 = ttk.Label(self, text="0000", background='white')
        showprobgan2.place(relx=.6, rely=.9)

        btstart = ttk.Button(self, text='Empezar', command = lambda : Simular(nunmax, preciohuevos, preciopollos))
        btstart.place(relx=.82, rely=.2, relwidth=.15, relheight=.15)

        btatras = ttk.Button(self, text='Volver', command = lambda : controller.show_frame(pv.PrincipalV))
        btatras.place(relx=.82, rely=.82, relwidth=.15, relheight=.15)

        def Simular(nmd, preH, preP):
            listaps = []
            tree.delete(*tree.get_children())
            try:
                nmd=nmd.get()
                preH=preH.get()
                preP=preP.get()
                chr=0
                cpnac=0
                cpm=0
                tcpv=0
                tcth=0
                tganprom=0
                for i in range(nmd):
                    rpgh = random.random()
                    print(rpgh)
                    nhp=0
                    cpv=0
                    cth=0
                    if rpgh<=0.13:
                        nhp=0
                    elif 0.1353<rpgh and rpgh<=0.4060:
                        nhp=1
                    elif 0.4060<rpgh and rpgh<=0.6767:
                        nhp=2
                    elif 0.6767<rpgh and rpgh<=0.8571:
                        nhp=3
                    elif 0.8571<rpgh and rpgh<=0.9473:
                        nhp=4
                    elif 0.9473<rpgh and rpgh<=0.9834:
                        nhp=5
                    else:
                        nhp=6

                    if nhp==0:
                        pass
                    else:
                        for j in range(nhp):
                            reh = random.random()
                            if reh<=0.2:
                                chr=chr+1
                            elif 0.2<reh and reh <=0.5:
                                cpnac=cpnac+1
                                rv=random.random()
                                if rv<=0.2:
                                    cpm=cpm+1
                                else:
                                    cpv=cpv+1
                            else:
                                cth=cth+1
                    tcth=tcth+cth
                    tcpv=tcpv+cpv
                    ganneta=(cth*preH)+(cpv*preP)
                    tganprom=tganprom+ganneta
                    listaps.append((i, cpv, cth, ganneta))

                for listap in listaps:
                    tree.insert('', tk.END, values=listap)

                ganpromneta=tganprom/nmd
                prompv=tcpv/nmd
                prompm=cpm/nmd
                promhr=chr/nmd
                showpromgan.configure(text="{:.4}".format(ganpromneta))
                showprobgan.configure(text="{:.4}".format(prompv))
                showpromgan1.configure(text="{:.4}".format(prompm))
                showprobgan2.configure(text="{:.4}".format(promhr))

            except:
                messagebox.showinfo(message="Verifique las variables ingresadas")




