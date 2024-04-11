# Chat API

## Om projektet

Skapa en backend tjänst för en chatt-app. Information om chattkanaler och meddelanden lagras i en databas.

Det ska finnas en specialkanal kallad **broadcast** som alltid existerar. Alla kan läsa den här kanalen och alla kan anonymt skicka meddelanden till denna kanal.

### Endpoints

Api:et ska innehålla minst följande endpoints:

|        |                  |                                                                                                                                             |
| ------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/broadcast   | hämta alla meddelanden som skickats till broadcast kanalen                                                                                  |
| POST   | /api/broadcast   | skapa ett nytt meddelande i broadcast kanalen                                                                                               |
| GET    | /api/channel/    | hämtar en lista över kanaler.                                                                                                               |
| GET    | /api/channel/:id | hämtar alla meddelanden i specifik kanal                                                                                                    |
| PUT    | /api/channel/    | skapar en ny kanal. Kanalens namn ska skickas med.                                                                                          |
| POST   | /api/channel/:id | skapa ett nytt meddelande i en specifik kanal som tidigare har skapats. Innehållet i ett meddelande bör vara minst anvsändare och innehåll. |
| DELETE | /api/channel/:id | tar bort en identiferad kanal som tidigare annonserats ut.                                                                                  |

### Built With

-   JavaScript
-   Node
-   Express
-   JWToken
-   MongoDb
-   Bcrypt

## Getting Started

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/BomanStatic/chat_API.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create .env file
    ```sh
    MONGODB_URL=YOUR_MONGODB_CONNECTION_STRING
    MY_SECRET=YOUR_JWT_SECRET
    ```
4. Run project
    ```sh
    node server
    ```

## Created by

-   Pontus Boman [Github](https://github.com/BomanStatic)
-   Eric Classon [Github](https://github.com/EricClasson)
-   Emily Wåhlin [Github](https://github.com/EmilyWahlin)
