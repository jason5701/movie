import express from 'express';
import cors from 'cors';
import { PythonShell } from 'python-shell';

const app = express();
const port = 8080;

type modeEnum = 'binary' | 'text' | 'json' | undefined;
type optionsProps = {
  mode: modeEnum;
  pythonPath: string;
  pythonOptions: string[];
  scriptPath: string;
  args: string[];
};

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  // const result = spawn('python', ['../recommend/movies.py']);

  res.send('hello');
});

app.get('/python', (req, res) => {
  const name = req.query.name === undefined ? '' : req.query.name;

  // console.log(name);

  const options: optionsProps = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '', //'../recommend/.venv/Scripts',
    args: [name as string],
  };

  PythonShell.run('../recommend/movies.py', options, (err, results) => {
    if (err)
      res.status(500).send({
        success: false,
        data: '',
        msg: 'database has no movie',
      });
    // results is an array consisting of messages collected during execution
    // console.log('results: %j', results);
    else res.status(200).send({ success: true, data: results, msg: 'done' });
  });
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
