console.log("toto")

class Collecte {
    constructor() {
      this._type = "collecte";
    }
  }
  class Concours {
    constructor() {
      this._type = "concours";
    }
  }
  class Alerter {
    constructor() {
      this._type = "alerte";
    }
  }

class EvenementFactory{
    constructor (){
        this.createNew = function(type, events, image, lieu , date, detail){
            let newLetter;
            if (type== "collecte"){
                newLetter = new Collecte()  
        }
        if (type== "concours"){
            newLetter = new Concours()  
    }
    if (type== "alerte"){
        newLetter = new Alerter()  
}
        newLetter.events = events;
        newLetter.image = image;
        newLetter.lieu = lieu;
        newLetter.date = date;
        newLetter.detail = detail;
        
        newLetter.createComposantHtml = function () {
    var composant = 
` 
<div class="blocEV max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div class="px-4 py-2">
        <h1 class="text-3xl font-bold text-gray-800 uppercase dark:text-white">`+ newLetter.events+` </h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">`+ newLetter.lieu +`<br>  `+ newLetter.date + `</p>
    </div>
<div class="zoomEV rect">
    <img class=" imageEv object-cover w-full h-48 mt-2" src="../photos/`+newLetter.image +`" alt="NIKE AIR">
</div>
    <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 class="text-lg font-bold text-white">. </h1>
        
    </div>
</div> `



    return composant
}
return newLetter
    }  }}

    
async function recupereJsonMedia() {
        let url = "http://melaniemdm.github.io/animals-love/evenements.json";
        let rep = await fetch(url, { method: "GET" });
        let reponse = await rep.json();
         let tabloEvent = reponse["Event"];
    console.log(tabloEvent)
return tabloEvent}
    
async function afficheLesAnimaux(){
        var tabloRecuperjson = await recupereJsonMedia();
        console.log(tabloRecuperjson)
        for (let i = 0; i < tabloRecuperjson.length; i++) {
        var objetDuMedia = await recupereElementMedia(tabloRecuperjson[i])
        var noeud = document.querySelector("#listeDesNews") 
         noeud.innerHTML = noeud.innerHTML + objetDuMedia.createComposantHtml()
     }}
async function recupereElementMedia (med){
        let lesAnimaux = new EvenementFactory ();
        let choixMedia;
        //choixMedia = "collecte"
        if(med.events === "collecte"){
            console.log(med.image)
            choixMedia = "collecte";
        }
        if(med.events === "concours"){
            choixMedia = "concours";
        }
        if(med.events === "alerte"){
            choixMedia = "alerte";
        }
        
        return lesAnimaux.createNew(choixMedia,med.events, med.image, med.lieu, med.date,med.detail)
    }
    afficheLesAnimaux()