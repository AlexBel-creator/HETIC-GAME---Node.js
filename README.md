# HETIC-GAME---Node.js


## Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants :
- [Node.js](https://nodejs.org/en/download/) (version 16 ou plus récente)
- Un éditeur de texte comme [VSCode](https://code.visualstudio.com/)


## Installation / Configuration 

Pour configurer le bot localement, suivez ces étapes :

1. Clonez le dépôt :

    ```sh
    git clone https://github.com/AlexBel-creator/HETIC-GAME---Node.js.git
    cd HETIC-GAME---Node.js
    ```

2. Installez les dépendances du projet en exécutant :

    `npm install`

3. Créez un fichier config.json à la racine du projet avec la structure suivante :
    
    ```json
    {
        "token": "VOTRE_TOKEN_DISCORD_BOT_ICI",
    }
    ```

    **Important** : Ne partagez jamais votre config.json ou tout autre fichier contenant le token donné en privée ou les clés API sensibles.

4. Vous pouvez me contacter directement pour obtenir le lien OAuth2 pour inviter le bot sur un discord (fait depuis le portail Discord Developer)

## Démarrage du Bot 

    ```sh
    node main.js
    ```
