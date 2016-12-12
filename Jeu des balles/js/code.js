/* Jeu des balles
Pour modifier les paramètres le jeu : modifier nbNiveaux et listeNiveaux et listeBalles
Il faudra aussi adapter tempsLimite 
*/

window.onload = function() {
    init();
};

function init(){
    // CONSTANTES
    frequence = 30;         // frequence du setIntervalle (en ms)
    tempsLimite = 45000;    // duree limite sur un niveau
    nbNiveaux = 5;          // nb de niveaux du jeu
    
    // STRUCTURE
    creeAccueil();
    creeJeu();
    creeBilan();
    document.getElementsByTagName("footer")[0].innerHTML = 'Exercice MOOC';

    // DONNEES
    var listeNiveaux;
    var listeBalles;
    var listeCouleurs;
    var listeTailles;    
    
    // VARIABLES
    var tempsJeu;               // variables pour le jeu
    var niveauCourant;
    var ecranCourant;
    var nbPointsTotal;          // variables pour le score
    var nbPointsObtenus;
    var i;                      // variables du canvas
    var ctx;         
    
    // GESTIONNAIRES
    document.getElementById("boutonJeu").onclick = afficheJeu;
    document.getElementById("boutonQuitter").onclick = afficheAccueil;
    document.getElementById("boutonRejouer").onclick = afficheJeu;
    document.getElementById("boutonAccueil").onclick = afficheAccueil;
    monCanvas.addEventListener("click", clicCanvas, false);	
    
    // REGLES
    setInterval(regles, frequence);
    
    // LANCEMENT
    afficheAccueil();
}

function creeAccueil(){    
    // Initialisation de la variable ecran
    ecranCourant = "accueil";
    // Ecriture du titre
    document.getElementById("titre").innerHTML = 'Jeu des balles';
    // Infos image
    document.getElementById("image").innerHTML = '<img id="img" src="./images/balles.jpg" width="450" height="300" >';
    // Règles du jeu
    document.getElementById("texte").innerHTML = 'Pour chaque niveau de jeu, clique sur les balles correspondantes à la consigne affichée avant qu\'elles ne touchent le bas du cadre !';
    // Bouton JEU
    document.getElementById("boutonJeu").innerHTML = '<input type="submit" name="boutonJeu" id="boutonJeu" value="JOUER" />';        
}

function creeJeu(){    
    // Initialisations des donnees
    creeDonnees();
    // Initialisation des variables de jeu
    niveauCourant = 0;
    tempsJeu = 0;        
    // Consigne du niveau
    afficheConsigne();
    // Animation
    document.getElementById("animation").innerHTML = '<canvas id="dessin" width="400" height="500" >Texte pour les navigateurs qui ne supportent pas canvas</canvas>';    
    // Initialisation du canvas
    monCanvas = document.getElementById('dessin');
    if (monCanvas.getContext){
		ctx= monCanvas.getContext('2d');
		i = 0;
	} else {
		alert('canvas non supporté par ce navigateur');
	}	
	// Bouton Quitter
    document.getElementById("boutonQuitter").innerHTML = '<input type="submit" name="boutonQuitter" id="boutonQuitter" value="QUITTER" />';  
}

function creeBilan(){
    // Bouton REJOUER
    document.getElementById("boutonRejouer").innerHTML = '<input type="submit" name="boutonRejouer" id="boutonRejouer" value="REJOUER"/>';
    // Bouton ACCUEIL
    document.getElementById("boutonAccueil").innerHTML = '<input type="submit" name="boutonAccueil" id="boutonAccueil" value="ACCUEIL"/>';
}

function creeDonnees(){
    //definition des tableaux de données
    listeNiveaux = new Array();
    listeBalles = new Array();
    listeCouleurs = new Array();
    listeTailles = new Array();
    
    // Tableau des tailles
    listeTailles[0] = [5,"petite"];
    listeTailles[1] = [10,"moyenne"];
    listeTailles[2] = [20,"grande"];
    
    // Tableau des couleurs
    listeCouleurs[0] = ["rouge", "#FF0000"];
    listeCouleurs[1] = ["vert", "#008000"];
    listeCouleurs[2] = ["bleu", "#0000FF"];
    
    //liste des niveaux 
    listeNiveaux[0] = [1, 2];
    listeNiveaux[1] = [2, 1];
    listeNiveaux[2] = [0, 1];  
    listeNiveaux[3] = [1, 0];
    listeNiveaux[4] = [0, 0];   
    
    //tableux des balles : IdNiv, Couleur, Taille, posX, Vit, posY, visib
    listeBalles[0] = [0,1,2,100,1,0,1];
    listeBalles[1] = [0,0,1,350,1,0,1];
    listeBalles[2] = [1,2,1,300,2,0,1];
    listeBalles[3] = [1,1,0,200,2,0,1];
    listeBalles[4] = [1,2,1,50,2,0,1];   
    listeBalles[5] = [2,1,2,100,3,0,1];   
    listeBalles[6] = [2,2,1,275,2,0,1];
    listeBalles[7] = [2,0,1,350,1,0,1];
    listeBalles[8] = [2,0,1,40,2,0,1];
    listeBalles[9] = [3,1,2,200,3,0,1];
    listeBalles[10] = [3,1,0,300,3,0,1];
    listeBalles[11] = [3,1,1,50,4,0,1];   
    listeBalles[12] = [4,0,0,350,5,0,1];   
    listeBalles[13] = [4,0,1,175,4,0,1];
    listeBalles[14] = [4,1,0,40,5,0,1];   
    listeBalles[15] = [4,2,0,275,4,0,1];
}

function afficheAccueil() {
    reinitialisation();   
    ecranCourant = "accueil";
    document.getElementById("accueil").style.display = "block";
    document.getElementById("jeu").style.display = "none";
    document.getElementById("bilan").style.display = "none";
}

function afficheJeu() {
    reinitialisation(); 
    ecranCourant = "jeu";    
    document.getElementById("accueil").style.display = "none";
    document.getElementById("jeu").style.display = "block";
    document.getElementById("bilan").style.display = "none";
}

function afficheBilan() {
    ecranCourant = "bilan";    
    document.getElementById("accueil").style.display = "none";
    document.getElementById("jeu").style.display = "none";
    document.getElementById("bilan").style.display = "block";
    // Décompte des points
    nbPointsTotal = 0;
    nbPointsObtenus = 0;
    // Boucle sur les niveaux
    for (var i = 0; i < nbNiveaux; i++){
        idNiveauCourant = i;
        idCouleurNiveau = listeNiveaux[i][0];
        idTailleNiveau = listeNiveaux[i][1];
        // Boucle sur les balles du niveau
	    for (var idx = 0; idx < listeBalles.length; idx++) {
	        if (listeBalles[idx][0] == idNiveauCourant) {
                if (listeBalles[idx][1] == idCouleurNiveau && listeBalles[idx][2] == idTailleNiveau){
                    nbPointsTotal++;
                    if (listeBalles[idx][6] == 0){
                        nbPointsObtenus++;
                    }
                }else{
                    if (listeBalles[idx][6] == 0){
                        nbPointsObtenus--;
                    }                
                }
	        }
	    }        
    }
    // Récapitulatif de la partie
    document.getElementById("recap").innerHTML = 'Votre score est : ' + nbPointsObtenus + " sur " + nbPointsTotal + '.';
}

function afficheConsigne() {
        document.getElementById("consigne").innerHTML = 'Niveau ' + (niveauCourant + 1) + ' / '+ nbNiveaux + ' : il vous reste ' + Number(((tempsLimite - tempsJeu) / 1000).toFixed(0)) + ' secondes.<br />Cliquez sur les balles de couleur ' +  listeCouleurs[listeNiveaux[niveauCourant][0]][0] + ' et de taille ' + listeTailles[listeNiveaux[niveauCourant][1]][1] + '.';
}

// fonction lancée à chaque intervalle
function regles(){
    if (ecranCourant == "jeu"){
        animer();
        tempsJeu += frequence;
    }
}

// clic sur le canvas
function clicCanvas(e){
	// position de la souris / document
	var xSourisDocument = e.pageX; 
    var ySourisDocument = e.pageY;
	// position du canvas / document
	var xCanvas = monCanvas.offsetLeft;
	var yCanvas = monCanvas.offsetTop;
	// position du clic / canvas
	xSourisCanvas = xSourisDocument - xCanvas;
	ySourisCanvas = ySourisDocument - yCanvas;
	// test si un cercle est cliqué
	for (var idx = 0; idx < listeBalles.length; idx++) {
        var R = listeTailles[listeBalles[idx][2]][0];
        if(Math.abs(listeBalles[idx][3]-xSourisCanvas) < R && Math.abs(listeBalles[idx][5]-ySourisCanvas) < R){
			listeBalles[idx][6] = 0;
		}	
	}
}

// fonction de dessin
function animer() {
    // incrémentation (pour le deplacement des y)
    i++;	 
    // composition
    ctx.globalCompositeOperation = 'lighter';	
    // effaçage
    ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
    
    if (tempsJeu > tempsLimite) {
        afficheBilan();
    } else {
        afficheConsigne();
        nbBallesDessinees = 0;	
        // Boucle sur les balles du niveau
	    for (var idx = 0; idx < listeBalles.length; idx++) {
	        if (listeBalles[idx][0] == niveauCourant) {
	            if (listeBalles[idx][5] <=  monCanvas.height && listeBalles[idx][6] == 1){
		            dessineBalle(idx);
	                nbBallesDessinees++;            
	            }
	        }
	    }
	    // Condition pour passer au niveau suivant
	    if (nbBallesDessinees == 0) {
	        if (niveauCourant == nbNiveaux - 1){
	            afficheBilan();
            }else {
                i = 0;
                niveauCourant ++;
            }
	    }
	}
}

// dessin d'une balle
function dessineBalle(id){
	// sauvegarde de l'état du contexte
	ctx.save();
	// dessin
	var R = listeTailles[listeBalles[id][2]][0];    // rayon
	var posY = i * listeBalles[id][4];              // position / y : deplacement * vitesse
	listeBalles[id][5] = posY;                      // actualisation posY
	var posX = listeBalles[id][3];                  // position / x
	ctx.beginPath();
	ctx.arc(posX, posY, R, 0, 2 * Math.PI, false);
	ctx.fillStyle = listeCouleurs[listeBalles[id][1]][1];
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#003300';
	ctx.stroke();		
	// retour à l'état précédent du contexte
	ctx.restore();
}

// fonction permettant de réinitialiser les variables
function reinitialisation() {
    // Reinitialisation des variables
    niveauCourant = 0;
    tempsJeu = 0;
    i = 0;
    // Nettoyage du canvas
    ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
    // Reset des position y et de la visibilité
    for (var id = 0 ; id < listeBalles.length; id++){     
        listeBalles[id][5] = 0;   
        listeBalles[id][6] = 1;   
    }  
}

