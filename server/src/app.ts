import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { PythonShell } from 'python-shell';

const FILE_NAME = 'tmdb_5000_movies.csv';
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
  const csvPath = path.join(__dirname, '../../recommend/data', FILE_NAME);
  // console.log(csvPath);
  const csv = fs.readFileSync(csvPath, 'utf-8');
  // console.log(csv);

  const rows = csv.split('\n');
  if (rows[rows.length - 1] === '') rows.pop();

  // console.log(rows)

  let results = [];
  let columnTitle: string[] = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      if(data ==='id'||data==='title')
      columnTitle = data;
      console.log(columnTitle);
    } else {
      let row_data: any = {};
      for (const y in columnTitle) {
        const title = columnTitle[y];
        row_data[title] = data[y];
      }
      results.push(row_data);
    }
  }

  // console.log(results);
  if (results.length > 0)
    res.status(200).send({
      success: true,
      data: results,
      msg: 'done',
    });
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
