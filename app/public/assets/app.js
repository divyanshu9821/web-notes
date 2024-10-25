var url = 'http://localhost:10000/note';

function $(selector) {
    return document.querySelector(selector);
}








async function fetch_notes() {

    $('.notes-container').innerHTML = '';

    let data = await fetch(url);
    let json_data = await data.json();

    for (let row in json_data) {

        let id = json_data[row].id;
        let title = json_data[row].title;
        let body = json_data[row].body;

        let note = generate_note(id, title, body); // function defined in render_note.js

        $('.notes-container').appendChild(note);

    }
}

async function delete_note(note_id) {
    await fetch(url, {
        method: 'delete',
        body: JSON.stringify({ "id": note_id }),
        headers: {
            'content-type': 'application/json'
        }
    });
}

async function edit_note(id, title, body) {
    await fetch(url, {
        method: 'put',
        body: JSON.stringify({ "id": id, 'title': title, 'body': body }),
        headers: {
            'content-type': 'application/json'
        }
    });
}

async function add_note(title, body) {

    let api_response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ 'title': title, 'body': body }),
        headers: {
            'content-type': 'application/json'
        }
    });

    let insert_id = await api_response.json();
    return insert_id;
}








function close_view() {
    $('.notes-container').style.display = 'flex';
    $('#view-edit').style.display = 'none';
    $('#button-new-note').style.display = 'block';
    $('#button-delete-note').style.display = 'none';
    $('#button-view-close').style.display = 'none';
    $('#button-save-note').style.display = 'none';

}

function handle_delete() {
    let note_id = $('#note-id').value;
    if(!note_id) return;
    if (!confirm('Are you surely want to delete this Note?')) return false;
    delete_note(note_id);
    $(`#note-${note_id}`).remove();
    close_view();
}

async function handle_add_edit() {

    let id = $('#note-id').value;
    let title = $('#note-title').value;
    let body = $('#note-body').value;

    if(body.length < 1) return;

    if (id) {
        edit_note(id, title, body);
        $(`#note-${id} .note-title`).innerHTML = title;
        $(`#note-${id} .note-body`).innerHTML = body;
    } else {
        let insert_id = await add_note(title, body);
        let note = generate_note(insert_id, title, body);
        $('.notes-container').appendChild(note);
    }
}




$('#button-view-close').addEventListener('click', close_view);

$('#button-delete-note').addEventListener('click', handle_delete);

$('#button-save-note').addEventListener('click', handle_add_edit);

fetch_notes();