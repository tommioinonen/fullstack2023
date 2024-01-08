sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: The browser submits the form as an HTTP POST request to the address new_note.
    Note left of server: The server creates a new note object, and adds it to an array called notes.
    Note left of server: 302 is a URL redirect to load the page /notes again
    server-->>browser: HTTP status code 302
    deactivate server

    Note right of browser: The page reloads with the updated notes array.
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "häh", "date": "2024-1-8" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes