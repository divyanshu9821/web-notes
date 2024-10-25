function generate_title(title) {
    let note_title = document.createElement('div');
    note_title.classList.add('note-title');
    note_title.innerHTML = title;
    return note_title;
}

function generate_body(body) {
    let note_body = document.createElement('div');
    note_body.classList.add('note-body');
    note_body.innerHTML = body;
    return note_body;
}

function generate_note(id, title, body) {
    let note = document.createElement('div');
    note.id = `note-${id}`;
    note.classList.add('note');
    note.appendChild(generate_title(title));
    note.appendChild(generate_body(body));
    note.addEventListener('click', ()=>{
        open_view(id, title, body);
    });
    return note;
}

function open_view(id, title, body){
    $('#button-new-note').style.display = 'none';
    $('.notes-container').style.display = 'none';
    $('#button-save-note').style.display = 'block';
    $('#view-edit').style.display='block';
    $('#button-view-close').style.display = 'block';
    $('#note-title').value = title;
    $('#note-body').value = body;
    $('#note-id').value = id;

    if(!id){
        $('#button-delete-note').style.display = 'none';
    }
    else{
        $('#button-delete-note').style.display = 'inline-block';
    }

    document.querySelectorAll('textarea').forEach(element => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    });
}

document.querySelectorAll('textarea').forEach(element => {
    element.addEventListener('input',function(){
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});