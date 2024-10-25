import path from 'path';
import db from '../../core/database.mjs'

export function send_view(req, res){
    res.sendFile(process.cwd()+'/app/public/index.html');
}

export async function create_note(req, res){
    let title = req.body.title;
    let body = req.body.body;
    let [result_set] = await db.query('INSERT INTO notes(title, body) VALUES(?,?)', [title, body]);
    res.end((result_set.insertId).toString());
}

export async function read_note(req, res){
    let [rows, meta] = await db.execute('SELECT * FROM notes');
    res.end(JSON.stringify(rows));
}

export async function update_note(req, res){
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let [result_set] = await db.query('UPDATE notes SET title = ?, body = ? WHERE id = ?', [title, body, id]);
    res.end((result_set.affectedRows).toString());
}

export async function delete_note(req, res){
    let id = req.body.id;
    let [result_set] = await db.query('DELETE FROM notes WHERE id = ?', [id]);
    res.end((result_set.affectedRows).toString());
}