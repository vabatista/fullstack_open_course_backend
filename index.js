const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
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


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    

    next(error)
}
app.use(errorHandler)

/* let persons = [
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 },
    { name: 'Vitor A Batista', phone: '55-21-6423122', id: 5 }
]
 */


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    //res.json(persons)
    console.log(Person)
    Person.find({}).then(p => { response.json(p) })
})

app.get('/api/info', (request, response) => {
    
    Person.find({}).then(results => {
        const numEntries = results.length
        response.send(`<p>Phonebook has ${numEntries} entries.</p>
        <p>${new Date().toString()}</p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    /*     const id = Number(request.params.id)
        const p = persons.find(person => person.id === id)
        if (p) {
            response.json(p)
        } else {
            response.status(404).end()
        } */

    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))


})

/* const generateId = () => {
    return Math.floor(Math.random() * Math.floor(99999999))
} */

app.delete('/api/persons/:id', (request, response, next) => {
    console.log('Remove person', request.params.id)
    Person.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    console.log('Updating person', request.params.id, 'body', request.body)
    Person.findById(request.params.id).then(p => {
        p.phone = request.body.number
        p.save().then(savedPerson => {
            response.json(savedPerson)
        }).catch(error => next(error))        
    })

})

app.post('/api/persons', (request, response, next) => {
    console.log(request.body)
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or phone missing'
        })
    }

    /*     if (persons.find(p => p.name === body.name)) {
            return response.status(400).json({
                error: 'name alredy exists'
            })
        }
    
        const person = {
            name: body.name,
            phone: body.number,
            id: generateId(),
        }
    
        persons = persons.concat(person)
        response.json(person)
     */



    const p = new Person({
        name: body.name,
        phone: body.number
    })
        
    p.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))

})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})