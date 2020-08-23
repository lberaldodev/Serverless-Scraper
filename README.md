### Features

- Monitoramento automatizado de preços.
- Desenvolvido para suportar Americanas, Kabum, Girafa, MagazineLuiza.
- Suporta qualquer produto dos sites acima.
- Suporta um preco customizado de alerta.
- Alerta com SMS para entrega rápida utilizando Twilio.
- Aplicação serverless, rodando em background com tempo customizavel.

# Serverless Framework Scheduler Scraper

**Contents**

- Renomear o arquivo para o ambiente escolhido, por default prod. 
(env.prod.example para env.prod.json)

- Definir as variaveis utilizadas lá. Todos atributos são obrigatorios e a aplicação não funcionará caso não defina. Para obter os tokens do twilio consulte a documentação da api.

- Para definir os sites, basta editar o arquivo sites.js, onde deverá ser inserido a tag do site com o link. A tag deve ser a mesma do arquivo tag.js.

- Após inserir um site, insira a tag no arquivo tag.js

- to e from são obtidos da api do twilio, onde o destinatario será o TO e o FROM o número comprado na api.

- Com tudo definido, basta invocar a funcão price-scraper.

**Execution**

- npm run local - ira rodar localmente.
- npm run production - ira rodar da aws.
