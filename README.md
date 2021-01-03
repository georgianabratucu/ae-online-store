# Demo farmacie online - proiect ae
Teste de performanta pe componenta lista de produse

1. Metoda http://3.137.204.251:8081/produse din backend

![alt_text](https://github.com/georgianabratucu/ae-online-store/blob/main/i1.png)


![alt_text](https://github.com/georgianabratucu/ae-online-store/blob/main/i2.png)


Testul a fost rulat cu succes si am obtinut urmatoarele rezultate:

- Requesturi in medie 46 vs 50 cat mi-am propus.

- Timpul de 95% pentru request este de 104 ms care este destul de ok.

- Timpul minim de raspuns este de 100 ms, cel maxim este de 173 ms.



2. Comportament atunci cand incarca toate resursele de pe pagina

![alt_text](https://github.com/georgianabratucu/ae-online-store/blob/main/i3.png)


![alt_text](https://github.com/georgianabratucu/ae-online-store/blob/main/i4.png)

Testul a fost rulat cu succes si am obtinut urmatoarele rezultate:

- Requestul http://3.137.204.251:8080/favicon.ico are cel mai mare timp de raspuns (pentru 95% din cazuri) : 224 ms

- Requestul http://3.137.204.251:8080/static/js/main.chunk.js are cel mai mic timp de raspuns (pentru 95% din cazuri) : 102 ms
