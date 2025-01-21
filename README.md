# Agreefast for Docusign

> ### Docusign Hackathon:Unlocked
>
> #### Your guide to escape fine-print!

---

## About `Agreefast`

**Agreefast** integrates seamlessly with Docusign, providing users with AI-driven insights into agreements.

It automatically analyzes the terms of contracts, calculates a **Compliance Obligatory Score**, our custom-made metric, to gauge the number of obligations in the agreement and the level of importance it has on keeping the agreements compliant and in force, and provides a list of obligations for each party involved. This helps users manage their contracts more effectively, ensuring they stay on track.

Additionally, 'Agreefast' extracts key events and timelines from signed agreements and allows users to add them to their device calendar.

With the **Trello Power-Up**, users can track upcoming events, view completed events, and manage tasks directly from their Trello board using just the envelope ID from Docusign.

Visit "https://agreefast.knowyours.co/" to experience a demo.

---

## Technologies used

- **Docusign Connect** for seamlessly integrating the envelopes before and after signing into our platform.
- **Docusign Navigator** was also experimented with and 'Agreefast' is built to readily support **Docusign Navigator** when the **Upload Agreement API** is made publically available as mentioned in the Docusign Developer documentation.
- **NextJS** for the React based frontend web application
- **OpenAI API** for LLMs
- **Ollama API** for embedding models.
- **Langchain** for orchestrating the AI workflow
- **Socket.io** for the AI chat interface
- **Unstructured** for processing the documents to gather meaningful information
- **Trello power-up SDK** for building the UI and functionalities and the Trello REST API for populating the events and reminders onto the boards
- **Neo4j** for storing the knowledge graphs constructed from the envelopes.
- **amqplib** for consuming and producing to the message queues from the Node.js workers and **pika** for the Python workers in order to enable an asynchronous workflow for time consuming tasks via **RabbitMQ**.
- **Microsoft Azure** and **Cloudflare** for cloud deployment and application security.

### Microservices

| Microservice/Codebase | Description                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ai_service`          | Consumes from RabbitMQ upon detecting new Docusign envelope sent, to make AI inferences and prepare the knowledge graph for driving the Agreefast Envelope Chatbot                 |
| `backend`             | Hosts the **Docusign Connect** POST webhook and enables interaction with 'Agreefast Dashboard' and Trello Power-up                                                                 |
| `chat_service`        | Works on key inference phase when the chatbot is queried by the user on the frontend. Exposes API endpoints to be integrated to 3rd party services like WebEx or Slack if required |
| `chrome_extension`    | Helps new users leverage Docusign Connect to link to Agreefast and quickly open the relevant Agreefast Dashboard from the Docusign Agreement Signing Page                          |
| `frontend`            | Agreefast Dashboard and landing page built with NextJS for a seamless dashboard user experience                                                                                    |
| `trello-powerup-html` | Hosts Trello Power-up specific integration assests to populate details captured from envelope into Trello boards                                                                   |

### User Experience Sequence diagram

<img src="https://agreefastapi.knowyours.co/static/chrome.jpg" alt="drawing" width="200"/>
<hr>
<img src="https://agreefastapi.knowyours.co/static/agreefast.jpg" alt="drawing" width="250"/>

### Project timeline

The entire development lifecycle was undertaken during the **Docusign Hackathon: Unlocked** timeperiod as mentioned on the rules.

- The initial commit (_49ee9227cde484f71f11fe192aa727fad9068e23_) was done on **January 3rd, 2025**
- Chrome extension was published to the Chrome Web Store on **January 12th, 2025**

---

### Notes

- Use `docker-compose.yaml` to bring up all services
- Run `ollama` server separately on host machine and ensure to run `ollama pull nomic-embed-text`
