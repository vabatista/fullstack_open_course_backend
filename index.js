const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

var morgan = require('morgan')
morgan.token('json', function (req, res) { 
    if (req.body) {
        return JSON.stringify(req.body)
    } else {
        return ''
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :json'))


let persons = [
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 },
    { name: 'Vitor A Batista', phone: '55-21-6423122', id: 5 }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    const numEntries = persons.length
    res.send(`<p>Phonebook has ${numEntries} entries.</p>
        <p>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const p = persons.find(note => note.id === id)

    if (p) {
        response.json(p)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(99999999))
}

app.post('/api/persons', (request, response) => {
    console.log(request.body)
    const body = request.body

    if (!body.name || !body.phone) {
        return response.status(400).json({
            error: 'name or phone missing'
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name alredy exists'
        })        
    }

    const person = {
        name: body.name,
        phone: body.phone,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})