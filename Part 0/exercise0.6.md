sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The browser submits new note as JSON data containing both the content of the note (content) and the timestamp (date)
    Note left of server: The server acknowledges this and returns 201 created
    server-->>browser: HTTP status code 201
    deactivate server

    Note right of browser: This time the page does not reload. Instead it takes the 201 as a permission to create new note using spa.js
    Note right of  browser: The page rerenders, without further interaction between server and browser. 