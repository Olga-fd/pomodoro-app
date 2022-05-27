import express from 'express';
import ReactDOM from 'react-dom/server';
import {App} from '../App';
import { indexHTMLTemplate } from './indexHTMLTemplate';

const PORT = process.env.PORT || 3000;
const app = express();
app.use('/static', express.static('./dist/client'));

app.get('*', (req, res) => {
  res.send(
    indexHTMLTemplate(ReactDOM.renderToString(App())),
  );
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});