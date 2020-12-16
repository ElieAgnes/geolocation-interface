# test_technique-charlie

Projet fait sous Laravel 8.18.1, pour faire fonctionner le projet, faire ces deux commande dans le dossier "/project" : 
> php artisan migrate --seed
> php artisan serve

- Journée 1 :
Pour commencer, j'ai préféré passer par une API plutôt que partir directement sur une view. Le plus difficile ici c'est de trouver une API qui me permettait d'afficher une map et y placer des markers, après quelques recherches, mon choix s'est porté sur Mapbox.
J'aurais passé la journée entière à configurer mon PC (fraichement formaté)* pour Laravel et MySQL, et installer Docker pour le projet du Samsung Campus, le test se superpose à ma semaine de formation, je gère mon temps comme je peux !
J'aurais espéré terminer l'API en une journée entière, erreur de ma part, le lendemain je compte m'attaquer à la partie front du projet.

*je travaille sous Windows en période de télétravail, je posséde un double écran et ça m'est bien plus agréable pour travailler, mais plus dur à configurer !

- Journée 2 :
Le router a changé et j'ai eu un soucis de seed et de update (toute bête pour cette dernière), tout est réglé et l'API est désormais terminée. En ce qui concerne le côté front, je vais utiliser une simple page html et utiliser du JQuery, bootstrap et évidemment, Mapbox. J'écris ces lignes à 2h du matin, je compte pas me reposer tant que le projet est pas terminé afin de rattrapper le retard sur mon planning.

A voir si je paufinerai demain en ce qui concerne les test de sécurité et j'en passe si le programme de ma formation me surcharge pas trop.