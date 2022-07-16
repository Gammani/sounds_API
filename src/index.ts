import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000


const sounds = [
    {id: 1, title: 'hey hey'},
    {id: 2, title: 'yo yo'},
    {id: 3, title: 'hey yo'},
    {id: 4, title: 'hey yo hey'},
    {id: 5, title: 'hop hey'},
    {id: 6, title: 'hey hey hey'},
    {id: 7, title: 'yo yo yo'}
]


app.get('/', (req: Request, res: Response) => {
    res.send('Hey World!')
})

app.get('/sounds', (req: Request, res: Response) => {
    const queryTitle = req.query.title
    if(queryTitle) {
        const filteredTitle = sounds.filter(s => s.title.indexOf(queryTitle.toString()) > -1)
        res.send(filteredTitle)
    } else {
        res.send(sounds)
    }
})
app.get('/sounds/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if(id) {
        const sound = sounds.find(s => s.id === id)
        res.send(sound)
    }  else {
        res.send(404)
    }
})
app.post('/sounds', (req: Request, res: Response) => {
    const newSound = {
        id: +new Date(),
        title: req.body.title
    }
    sounds.push(newSound)
    res.status(201).send(newSound)
})
app.put('/sounds/:id', (req: Request, res: Response) => {
    const sound = sounds.find(s => s.id === +req.params.id)
    if(sound) {
        sound.title = req.body.title
        res.send(204)
    } else {
        res.send(404)
    }
})
app.delete('/sounds/:id', (req: Request, res: Response) => {
    const indexOfSound = sounds.findIndex(s => s.id === +req.params.id)
    if(indexOfSound > -1) {
        sounds.splice(indexOfSound, 1)
        res.send(204)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`server run on port ${port}`)
})