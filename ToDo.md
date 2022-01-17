Pour l'instant, je vais faire les choses de manière simple:
Je ne vais pas faire jouer d'ordinateur, juste deux joueurs.

Le joueur 1 aura les croix par défaut dans un premier temps, il sera le premier à jouer.

Le joueur 2 aura donc les ronds.

Le premier joueur va cliquer sur l'une des neuf cases, et y inscrire une croix qui sera enregistré dans l'objet game et faire quelque chose avec l'objet joueur_1.

La prochaine fois qu'un clic se produit sur l'une des cases, un rond y sera inscrit et sera encore une fois enregistré dans gameboard, ainsi que dans joueur_2.

Un test devra être fait à chaque nouveau clic, et donc à chaque tour, pour voir si trois mêmes signes sont alignés soit à l'horizontale, soit à la verticale, soit en diagonale.


Idées :
- Faire choisir les croix ou les ronds au joueur 1
- Mettre un input pour les noms (en fait je sais pas si ça vaut le coup)

- Faire apparaitre seulement le joueur 1 et le choix du joueur 2, puis faire apparaitre la grille après validation.

- Faire choisir entre next round ou restart:
    Restart recommence à 0, tous paramètres confondus, et next round met à jour le score (faire appaitre ce dernier, même dans le cas d'un seul match) et garde les paramètres choisis (human ou computer).



Idée : Faire choisir en tout début de partie si la personne veut être joueur 1 ou joueur 2.
Ensuite, faire choisir si l'adversaire est un humain ou ordinateur.