import express from "express";
import cors from "cors";
import { JSONFile, Low } from "lowdb";
import path from "path";

const app = express();
const port = 5000;

const __dirname = path.resolve();
const reactApp = path.join(__dirname, "../item_list/build");
const dbFile = path.join(__dirname, "db.json");

const adapter = new JSONFile(dbFile);
const db = new Low(adapter);
(async () => {
  await db.read();
})();

const updDb = async () => {
  await db.write();
};

app.use(cors({ origin: "*" }));

app.use(express.static(reactApp));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(reactApp, "index.html"));
});

app.get("/db", (req, res) => {
  res.sendFile(dbFile);
});

app.post(
  "/add",
  (req, res, next) => {
    const data = req.body;
    db.data["items"].push({ ...data, id: db.data["currId"] });
    db.data["currId"] += 1;
    res.status(200).send(data);
    next();
  },
  updDb
);

app.post(
  "/upd",
  (req, res, next) => {
    let { id } = req.query;
    let i = db.data["items"].findIndex((item) => item["id"] == id);
    let checked = db.data["items"][i]["checked"];
    db.data["items"][i].checked = !checked;

    res.status(200).send(db.data["items"][i]);
    next();
  },
  updDb
);

app.delete(
  "/rmv",
  (req, res, next) => {
    let { id } = req.query;
    db.data["items"] = db.data["items"].filter((item) => item["id"] != id);
    res.status(200).send();
    next();
  },
  updDb
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
