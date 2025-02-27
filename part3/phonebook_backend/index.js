const express = require('express');
var morgan = require('morgan');
const app = express();
const cors = require('cors');
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json());
app.use(express.static('dist'))

app.use(cors());

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
    const howManyPersons = persons.length;
    const Time = new Date();
    res.send(`<p>Phonebook has info for ${howManyPersons} people</p><p>${Time}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
  
    if (person) {
      res.json(person);
    } else {
      res.status(404).send({ error: 'Person not found' });
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ 
          error: 'name or number missing' 
        });
      }
    
    if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        });
    }
    
    const person = {
      id: Math.floor(Math.random() * 10000),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);
    res.json(person);
});   

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
