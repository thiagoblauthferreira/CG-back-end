import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Coletivo Gloma - API</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
            }
            div {
              text-align: center;
            }
            .buttons {
              display: flex;
              flex-direction: row;
              gap: 20px;
              margin-top: 20px;
            }
            button {
              padding: 10px 20px;
              font-size: 1em;
              cursor: pointer;
              color: white;
              border: none;
              border-radius: 5px;
              width: 250px
            }
            button:hover {
              opacity: 0.8;
            }
          </style>
        </head>
        <body>
          <div>
            <img src="/assets/logo.png" alt="Coletivo Gloma" />
            <div class="buttons">
              <form action="/api/document" method="get">
                <button style="background-color: blue" type="submit">Documentação</button>
              </form>
              <a href="https://www.coletivogloma.com.br" target="_blank">
                <button style="background-color: green" type="button">Site</button>
              </a>
              <a href="https://github.com/thiagoblauthferreira/CG-back-end" target="_blank">
                <button style="background-color: black" type="button">GitHub - Backend</button>
              </a>
              <a href="https://github.com/thiagoblauthferreira/CG-Front-end" target="_blank">
                <button style="background-color: black" type="button">GitHub - Frontend</button>
              </a>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
