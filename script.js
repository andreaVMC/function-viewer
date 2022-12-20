//this code is from Andrea Vaccaro GitHub:andreaVMC
//https://github.com/andreaVMC
/*inizializzo le varibili globali che mi serviranno per rappresentare graficamente le varie funzioni*/
var xmin,xmax,ymin,ymax,xintervallo,yintervallo;
var puntoZeroX;
var puntoZeroY;
var graficogiagenerato=0;
var pg=3.14; //pigreco
var color;
function grafico(){ //creo la funzione che generera il grafico
    graficogiagenerato=1; //porto il flag "graficogiagenerato" a True 
    document.getElementById("svg").innerHTML=""; //elimino tutto ciò che c'è all' inertno di svg cosi da pulire il grafico
    var i,j; //inizializzo le varibile che usero per i vari cicli
    /*prendo i dati dalla pagina e li memorizzo nelle appostie varibili*/
    xmin=document.getElementById('xmin').value;
    xmax=document.getElementById('xmax').value;
    ymin=document.getElementById('ymin').value;
    ymax=document.getElementById('ymax').value;
    /*calcolo gli intervalloi di spazio tra un unita di x/y e l' altra*/
    xintervallo=900/(-(xmin-xmax));
    yintervallo=900/(-(ymin-ymax));
    /*genero gli assi orizzontali delle y positive*/
    for(i=0;i<Math.abs(ymax);i++){
       document.getElementById("svg").innerHTML+="<line x1=\"0\" y1=\""+(yintervallo*i)+"\" x2=\"900\" y2=\""+(yintervallo*i)+"\" style=\"stroke:gray; stroke-width:1\"/>";
       document.getElementById("svg").innerHTML+="<text y=\""+((yintervallo*i)-10)+"\" x=\"5\" fill=\"black\">"+(ymax-i)+"</text>"; 
    }
    /*genero l' asse dell' y 0*/
    document.getElementById("svg").innerHTML+="<line x1=\"0\" y1=\""+(yintervallo*i)+"\" x2=\"900\" y2=\""+(yintervallo*i)+"\" style=\"stroke:black; stroke-width:1.5\"/>";
    document.getElementById("svg").innerHTML+="<text y=\""+((yintervallo*i)-10)+"\" x=\"5\" fill=\"black\">0</text>";
    i++;
    /*genero gli assi orizzontali delle y negative*/
    for(j=0;j<Math.abs(ymin);j++){
        document.getElementById("svg").innerHTML+="<line x1=\"0\" y1=\""+(yintervallo*i)+"\" x2=\"900\" y2=\""+(yintervallo*i)+"\" style=\"stroke:gray; stroke-width:1\"/>";
        document.getElementById("svg").innerHTML+="<text y=\""+((yintervallo*i)-10)+"\" x=\"5\" fill=\"black\">"+(-1-j)+"</text>"; 
        i++;
    }
    i=j=0;//azzero i contatori
    /*genero gli assi orizzontali delle x positive*/
    for(i=0;i<Math.abs(xmax);i++){
        document.getElementById("svg").innerHTML+="<line x1=\""+(xintervallo*i)+"\" y1=\"0\" x2=\""+(xintervallo*i)+"\" y2=\"900\" style=\"stroke:gray; stroke-width:1\"/>";
        document.getElementById("svg").innerHTML+="<text x=\""+((xintervallo*i)-15)+"\" y=\"15\" fill=\"black\">"+(xmax-i)+"</text>"; 
    }
    /*genero l' asse dell' x 0*/
    document.getElementById("svg").innerHTML+="<line x1=\""+(xintervallo*i)+"\" y1=\"0\" x2=\""+(xintervallo*i)+"\" y2=\"900\" style=\"stroke:black; stroke-width:1.5\"/>";
    document.getElementById("svg").innerHTML+="<text x=\""+((xintervallo*i)-15)+"\" y=\"15\" fill=\"black\">0</text>";
    i++;
    /*genero gli assi orizzontali delle x negative*/
    for(j=0;j<Math.abs(xmin);j++){
        document.getElementById("svg").innerHTML+="<line x1=\""+(xintervallo*i)+"\" y1=\"0\" x2=\""+(xintervallo*i)+"\" y2=\"900\" style=\"stroke:gray; stroke-width:1\"/>";
        document.getElementById("svg").innerHTML+="<text x=\""+((xintervallo*i)-15)+"\" y=\"15\" fill=\"black\">"+(-j-1)+"</text>"; 
        i++;
    }
    /*calcolo dove sta il punto 0 relativamente allo spazio della box svg*/
    puntoZeroX=xintervallo*xmax;
    puntoZeroY=yintervallo*ymax;
    /*disegno nelle coordinate appena trovate del punto 0 una pallina rossa cosi da identificarlo meglio nel grafico*/
    document.getElementById("svg").innerHTML+="<circle cx=\""+puntoZeroX+"\" cy=\""+puntoZeroY+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"red\" />";
}

function retta(){ //creo la funzione che generera la retta
    if(graficogiagenerato==0 || controllaGrafico()){ //se il grafico non è ancora stato generato chiamero la funzione che lo genera prima di disegnare la retta
        grafico();
    }
    color=document.getElementById('colore').value;
    var equazione=document.getElementById('equazione-retta').value; //prendo il valore dell' equazione della retta e lo memorizzo
    var x="",val="",i,op,j; //inizializzo le varbili che mi serviranno (x=temine x, val=termine noto, op=operatore,i/j=contatori)
    var origineRetta=0,startRettaX,endRettaX; //origine retta=punto in cui la retta incontra l' asse y, startrettax=punto x della retta con y minore, endrettax=punto x della retta con y massimo
    for(i=0;i<equazione.length;i++){
        if(equazione[i]=='x' || equazione[i]=='X'){ //se troviamo il caratte ' x ' nella formula
            op=i+1; //memorizziamo il caratter dopo come l' operatore
            for(j=0;j<i;j++){
                x+=equazione[j]; //memorizziamo il numero prima della x
            }
            for(j=op;j<equazione.length;j++){
                val+=equazione[j]; //memorizziamo il numero dopo l' operatore
            }
        }
    }
    if(controllaSeFrazione(x)){ //controllo se la x è una frazione
        x=divisione(x); //in tal caso vado a calcolarne il valore
    }
    if(controllaSeFrazione(val)){ //controllo se la val è una frazione
        val=divisione(val); //in tal caso vado a calcolarne il valore
    }
    if(x==""){x=1;}else if(x=="-"){x=-1} //controllo se la x è positiva o negativa
    origineRetta=puntoZeroY-(val*yintervallo); //calcolo il punto y in cui la retta incontra il medesimo asse
    //segno questo punto di incontro con una pallina
    document.getElementById("svg").innerHTML+="<circle cx=\""+puntoZeroX+"\" cy=\""+origineRetta+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
    startRettaX=(-(((ymin-val)*(1/x))*xintervallo)+puntoZeroX); //calcolo il punto x in cui passa la retta quando la y assume il valore minimo 
    endRettaX=(-(((ymax-val)*(1/x))*xintervallo)+puntoZeroX); //calcolo il punto x in cui passa la retta quando la y assume il valore massimo
    //traccio una retta passente per i punti startRettaX e endRettaX cosi da creare graficamente la nostra retta
    document.getElementById("svg").innerHTML+="<line x1=\""+startRettaX+"\" y1=\"900\" x2=\""+endRettaX+"\" y2=\"0\" style=\"stroke:"+color+"; stroke-width:4\"/>";
    aggiornaCronologia("f(y)="+equazione,color);
}

function circonferenza(){ //creo la funzione che andra a creare la circonferenza
    if(graficogiagenerato==0 || controllaGrafico()){ //controllo che il grafico non sia gia stato generato, in caso contrario lo genero
        grafico();
    }
    color=document.getElementById('colore').value; //prendo il colore in input selezionato per rappresentare la funzione
    var equazione=document.getElementById('equazione-circonferenza').value; //prendo la funzione dall' index
    var x="",y="",i,c="",op,j,xcentro,ycentro,r=0; //inizializzo le variabili che mi servirannno
    for(i=0;i<equazione.length;i++){
        if(equazione[i]=='x' || equazione[i]=='X'){ //recupero il valore di x
            for(j=0;j<i;j++){
                x+=equazione[j];
            }
            op=i+1;
        }
        if(equazione[i]=='y' || equazione[i]=='Y'){ //recupero il valore di y
            for(j=op;j<i;j++){
                y+=equazione[j];
            }
            i+=1;
            for(j=i;j<equazione.length;j++){ //recupero il valore noto
                c+=equazione[j];
            }
        }
    }
    if(controllaSeFrazione(x)){ //controllo se la x è una frazione
        x=divisione(x); //in tal caso vado a calcolarne il valore
    }
    if(controllaSeFrazione(y)){ //controllo se la y è una frazione
        y=divisione(y); //in tal caso vado a calcolarne il valore
    }
    xcentro=(-(x)/2); //calcolo la coordinata x del centro della circonferenza
    ycentro=(-(y)/2); //calcolo la coordinata y del centro della circonferenza
    r=Math.sqrt(Math.pow(xcentro,2)+Math.pow(ycentro,2)-c); //calcolo la lunghezza del raggio
    //rendo le variabili proporzionali al piano cartesiano
    xcentro*=xintervallo;
    ycentro*=yintervallo;
    r*=xintervallo;
    xcentro=puntoZeroX-xcentro;
    ycentro=puntoZeroY-ycentro;
    //rappresento(disegno) il punto centrale e la circonferenza sul piano cartesiano
    document.getElementById("svg").innerHTML+="<circle cx=\""+xcentro+"\" cy=\""+ycentro+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
    document.getElementById("svg").innerHTML+="<circle cx=\""+xcentro+"\" cy=\""+ycentro+"\" r=\""+r+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>";
    aggiornaCronologia("x2+y2+"+equazione,color);
}

function parabola(){
    var flagx=0; //flag per controllare se il parametro x è presente nell' eqauzione
    if(graficogiagenerato==0 || controllaGrafico()){ //controllo se il grafico è gia stato generto
        grafico(); //in caso non sia ancora stato generato lo genero
    }
    color=document.getElementById('colore').value; //prendo il colore della funzione in input e lo memorizzo
    var equazione=document.getElementById('equazione-parabola').value; //prendo l' equazione della parabola dal suo box di input
    var i,j,op,x2="",x="",val="",p; //inizializzo le varibili che mi serviranno
    for(i=0;i<equazione.length;i++){
        if((equazione[i]=='x' || equazione[i]=='X') && equazione[i+1]=='2'){ //recupero il valore di x2
            for(j=0;j<i;j++){
                x2+=equazione[j];
            }
            op=i+2;
        }
        if((equazione[i]=='x' || equazione[i]=='X') && equazione[i+1]!='2'){ //recupero il valore di x
            for(j=op;j<i;j++){
                x+=equazione[j];
            }
            i+=1;
            for(j=i;j<equazione.length;j++){ //recupero il valore noto
                val+=equazione[j];
            }
            flagx=1; //se questa condizione e vera vuold ire che il parametro x è presente nell' equazione quindi porto il suo flag ad 1
        }
    }
    if(controllaSeFrazione(x)){ //controllo se la x è una frazione
        x=divisione(x); //in tal caso vado a calcolarne il valore
    }
    if(controllaSeFrazione(val)){ //controllo se la val è una frazione
        val=divisione(val); //in tal caso vado a calcolarne il valore
    }
    if(flagx==0){ //se la x non è presente nel' equazione recupero il valore noto dopo x2
        i=0;
        while(equazione[i]!='x' && equazione[i+1]!='2'){
            i++;
        }
        i++;
        for(i=i+1;i<equazione.length;i++){
            val+=equazione[i]; //recupero x2
        }
    }
    if(x2=="" || x2=="+"){ //se non è stato assegnato alcun valore ad x2 allora le daro valore 1
        x2=1;
    }else if(x2=="-"){ //altrimenti se x ha un '-' vuol dire che varra -1
        x2=-1;
    }
    if(flagx==0){ //se il parametro x non è presento gli daro il valore 0
        x=0;
    }else if(x=="" || x=="+"){ //altrimetni se davanti ad x ce un '+' oppure e semplicemente presente gli daro valore 1
            x=1;
    }else if(x=="-"){ //altrimenti se x è preceduto da un - gli daro valore -1
        x=-1;
    }
    //porto tutte le varibili al valore corretto rispettivamente al grafico
    x2*=1;
    x*=1;
    val*=1;
    x/=2;
    x*=xintervallo;
    //attraverso un if coontrollo se la parabole e positiva(verso l' alto) o negativa(verso il basso)
    if(x2==1){
        //nel caso la parabola fosse positiva calcolo i punti in cui la parabola tocca l' asse delle ymax e poi la disegno
        p=Math.sqrt(Math.abs(ymax-val))*xintervallo;
        document.getElementById("svg").innerHTML+="<path d=\"M"+(puntoZeroX-x)+" "+(puntoZeroY-(val*yintervallo))+" S"+(puntoZeroX+p-x)+","+(puntoZeroY-(val*yintervallo))+" "+(puntoZeroX+p-x)+",0\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>";
        document.getElementById("svg").innerHTML+="<path d=\"M"+(puntoZeroX-x)+" "+(puntoZeroY-(val*yintervallo))+" S"+(puntoZeroX-p-x)+","+(puntoZeroY-(val*yintervallo))+" "+(puntoZeroX-p-x)+",0\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>";
        document.getElementById("svg").innerHTML+="<circle cx=\""+(puntoZeroX+p-x)+"\" cy=\""+0+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
        document.getElementById("svg").innerHTML+="<circle cx=\""+(puntoZeroX-p-x)+"\" cy=\""+0+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
    }else if(x2==-1){
        //nel caso la parabola fosse negativa calcolo i punti in cui la parabola tocca l' asse delle ymin e poi la disegno
        p=Math.sqrt(Math.abs(ymin-val))*xintervallo;
        document.getElementById("svg").innerHTML+="<path d=\"M"+(puntoZeroX-x)+" "+(puntoZeroY-(val*yintervallo))+" S"+(puntoZeroX+p-x)+","+(puntoZeroY-(val*yintervallo))+" "+(puntoZeroX+p-x)+",900\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>";
        document.getElementById("svg").innerHTML+="<path d=\"M"+(puntoZeroX-x)+" "+(puntoZeroY-(val*yintervallo))+" S"+(puntoZeroX-p-x)+","+(puntoZeroY-(val*yintervallo))+" "+(puntoZeroX-p-x)+",900\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>";
        document.getElementById("svg").innerHTML+="<circle cx=\""+(puntoZeroX+p-x)+"\" cy=\""+900+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
        document.getElementById("svg").innerHTML+="<circle cx=\""+(puntoZeroX-p-x)+"\" cy=\""+900+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
    }
    //rappresento il vertice della parabola sul grafico
    document.getElementById("svg").innerHTML+="<circle cx=\""+(puntoZeroX-x)+"\" cy=\""+(puntoZeroY-(val*yintervallo))+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
    aggiornaCronologia("f(y)="+equazione,color);
}

function cos(){ //creo la funzione del coseno(sinusoide)
    if(graficogiagenerato==0 || controllaGrafico()){ //controllo se il grafico e gia stato generato 
        grafico();
    }
    color=document.getElementById('colore').value; //prendo in input il colore della funzione
    pg=3.14; //assegno alla varibile pigreco(pg) il valore 3.14
    var x="",i; //inizializzo le due varibili che mi serviranno
    var equazione=document.getElementById('equazione-coseno').value; //prendo in input l' equazione 
    for(i=0;i<equazione.length;i++){ //memorizzo il valore di x
        if(equazione[i]=='x'){
            var j=0;
            for(j=0;j<i;j++){
                x+=equazione[j];
            }
        }
    }
    if(controllaSeFrazione(x)){ //controllo se la x è una frazione
        x=divisione(x); //in tal caso vado a calcolarne il valore
    }
    if(x=="" || x=='+'){ //se x non ha un valore noto lo porto a valore 1
        x=1;
    }else if(x=="-"){ //se invece x ha un meno davanti significa che è negativo e quindi vale -1
        x=-1;
    }
    x*=1;
    pg=pg/(2*x); //calcolo il pg in realzione al valore di x, ovvero diventera la varibile di intervallo tra un segmento della sinusoide e l' altro
    x=pg; //porto la x=pg
    px=x/2; //calcolo il punto x che mi servira per calcola il punto di curva della sinusoidde
    i=0; //inizializzo il contatore a 0
    //creo il primo segmento della sinusoide
    document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX)+" "+(puntoZeroY-(1*yintervallo))+" "+"Q"+" "+(puntoZeroX-(px*xintervallo))+" "+(puntoZeroY-(1*yintervallo))+" "+(puntoZeroX-(x*xintervallo))+" "+(puntoZeroY)+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
    //con questo primo while creo la parte della sinusoide positiva
    while((x*xintervallo)<=(xmax*xintervallo)){
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX-((x-pg)*xintervallo))+" "+(puntoZeroY-(0*yintervallo))+" "+"Q"+" "+(puntoZeroX-((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(-1*yintervallo))+" "+(puntoZeroX-(x*xintervallo))+" "+(puntoZeroY-(-1*yintervallo))+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX-((x-pg)*xintervallo))+" "+(puntoZeroY-(-1*yintervallo))+" "+"Q"+" "+(puntoZeroX-((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(-1*yintervallo))+" "+(puntoZeroX-(x*xintervallo))+" "+(puntoZeroY)+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX-((x-pg)*xintervallo))+" "+(puntoZeroY-(0*yintervallo))+" "+"Q"+" "+(puntoZeroX-((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(1*yintervallo))+" "+(puntoZeroX-(x*xintervallo))+" "+(puntoZeroY-(1*yintervallo))+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX-((x-pg)*xintervallo))+" "+(puntoZeroY-(1*yintervallo))+" "+"Q"+" "+(puntoZeroX-((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(1*yintervallo))+" "+(puntoZeroX-(x*xintervallo))+" "+(puntoZeroY)+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
    }
    //riporto la x al valore iniziale di pg calcolato all' inizio
    x=pg;
    //disegno il primo segmento di sinusoide negativa
    document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX)+" "+(puntoZeroY-(1*yintervallo))+" "+"Q"+" "+(puntoZeroX+(px*xintervallo))+" "+(puntoZeroY-(1*yintervallo))+" "+(puntoZeroX+(x*xintervallo))+" "+(puntoZeroY)+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
    //creo il resto della sinusoide negativa rispettivamente alla lunghezza del grafico
    while((x*xintervallo)<=(Math.abs(xmin)*xintervallo)){
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX+((x-pg)*xintervallo))+" "+(puntoZeroY-(0*yintervallo))+" "+"Q"+" "+(puntoZeroX+((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(-1*yintervallo))+" "+(puntoZeroX+(x*xintervallo))+" "+(puntoZeroY-(-1*yintervallo))+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX+((x-pg)*xintervallo))+" "+(puntoZeroY-(-1*yintervallo))+" "+"Q"+" "+(puntoZeroX+((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(-1*yintervallo))+" "+(puntoZeroX+(x*xintervallo))+" "+(puntoZeroY)+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX+((x-pg)*xintervallo))+" "+(puntoZeroY-(0*yintervallo))+" "+"Q"+" "+(puntoZeroX+((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(1*yintervallo))+" "+(puntoZeroX+(x*xintervallo))+" "+(puntoZeroY-(1*yintervallo))+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
        x+=pg;
        document.getElementById("svg").innerHTML+=("<path d=\"M"+(puntoZeroX+((x-pg)*xintervallo))+" "+(puntoZeroY-(1*yintervallo))+" "+"Q"+" "+(puntoZeroX+((x*xintervallo)-(px*xintervallo)))+" "+(puntoZeroY-(1*yintervallo))+" "+(puntoZeroX+(x*xintervallo))+" "+(puntoZeroY)+"\" stroke=\""+color+"\" stroke-width=\"4\" fill=\"transparent\"/>");
    }
    document.getElementById("svg").innerHTML+="<circle cx=\""+(puntoZeroX)+"\" cy=\""+(puntoZeroY-(1*yintervallo))+"\" r=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\""+color+"\" />";
    aggiornaCronologia("cos("+equazione+")",color);
}

//la funzione controllaGrafico restituisce true se il grafico e stato modificato alrimenti se è immutato restituisce false
function controllaGrafico(){
    var a,b,c,d;
    a=document.getElementById('xmin').value;
    b=document.getElementById('xmax').value;
    c=document.getElementById('ymin').value;
    d=document.getElementById('ymax').value;
    if(a!=xmin || b!=xmax || c!=ymin || d!= ymax){
        return true;
    }
    return false;   
}

function controllaSeFrazione(equazione){ //creo la funzione che controlla se la x è una frazione
    var i;
    for(i=0;i<equazione.length;i++){
        if(equazione[i]=='/'){
            return true; //se la x è una frazione ritornera vero
        }
    }
    return false; //altrimenti se non lo è ritornera falso
}

function divisione(equazione){ //funzione che calcola la frazione
    var i,result="",posfraz;
    var primo="",secondo="";
    for(i=0;i<equazione.length;i++){
        if(equazione[i]=='/'){
            posfraz=i; //trovo il punto in cui la avviane la frazione
        }
    }
    for(i=0;i<posfraz;i++){
        primo+=equazione[i]; //recupero il primo membro della frazione
    }
    for(i=posfraz+1;i<equazione.length;i++){
        secondo+=equazione[i]; //recupero il secondo memebro della frazione
    }
    result=primo/secondo; //creo il risultato che ritornero
    return result;
}
/*
<div class="cronologia">
    <div class="espressione">espressione: f(y)=x2+2</div>
    <div class="rappresentazione">colore: <div class="color" style="background-color: red;"></div></div>
</div>
*/

function aggiornaCronologia(espressione,color){
    document.getElementById('funzioni_box').innerHTML+="<div class=\"cronologia\">";
    document.getElementById("funzioni_box").innerHTML+="<div class=\"rappresentazione\">colore: <div class=\"color\" style=\"background-color:"+color+";\"></div></div>";
    document.getElementById("funzioni_box").innerHTML+="<div class=\"espressione\">espressione:"+espressione+"</div></div>";
}