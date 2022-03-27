const socket = io();

socket.on('Welcome', (data) => {
    const p = document.getElementById('msg');
    p.innerHTML = data.msg;
    prods = data.prods;
    socket.emit('notification', 'Message successfully received');
});

socket.on('serverMessage', (data) => {
    const msgs = document.getElementById('msgs');
    let html = '<table class="table table-condensed"><tr><th>Name</th><th>E-Mail</th><th>Sent</th><th>Message</th></tr>';
    const sMail = 'style="color: blue; font-weight: bold;"';
    const sFh = 'style="color: brown; font-weight: normal;"';
    const sMsg = 'style="color: green; font-weight: normal; font-style: italic"';
    data.map( m => {
        html += `<tr>
                    <td>${m.us}</td>
                    <td ${sMail}>${m.email}</td>
                    <td ${sFh}>${m.fh}</td>
                    <td ${sMsg}>${m.message}</td>
                </tr>`;
    })
    html += '</table>'
    msgs.innerHTML = html;
});

socket.on('sendProds', (data) => {
    const prods = data;
    let html = '';
    const prodDetails = document.getElementById('prodsTable')
    if (prodDetails != null) {
        prods.map( p => 
            html +=`
                <tr>
                    <td class="nombreProd"><input type="text" id="title${p.id}" value="${p.title}"></td>
                    <td class="prProd"><input type="number" id="price${p.id}" value="${p.price}"></td>
                    <td><img alt="Foto" style="width: 100px;" src=${p.thumbnail}><span id="foto${p.id}" style="display: none;">${p.thumbnail}</span></td>
                    <td>
                        <button class="btn btn-light" onclick="updateProds(${p.id})">Update</button>
                        <button class="btn btn-light" onclick="deleteProds(${p.id})">Delete</button>
                    </td>
                </tr>
            `
        );            
        prodDetails.innerHTML = html;
    }
});

const deleteProds = (id) => {    
    socket.emit('deleteProds', {id: id});
}

const updateProds = (id) => {    
    const title = document.getElementById(`title${id}`);
    const price = document.getElementById(`price${id}`);
    const thumbnail = document.getElementById(`foto${id}`);
    socket.emit('updateProds', {id: id, title: title.value, price: price.value, thumbnail: thumbnail.innerText});
}

const send = () => {
    const user = document.getElementById('user');    
    const email = document.getElementById('email');    
    const message = document.getElementById('message');
    const fh = formatDate(new Date());
    if (email.value.length<4) {
        alert('Your email in mandatory');
    } else {
        socket.emit('clientMessage', {us: user.value, email: email.value, message: message.value, fh: fh});   
        message.value = ''; 
    }
}

socket.emit('getProds');

const formatDate = (fh) => {
    let fhtxt = `${zfill(parseInt(fh.getDate()), 2)}/${zfill((parseInt(fh.getMonth())+1), 2)}/${parseInt(fh.getFullYear())}`;
    fhtxt +=  ` ${zfill(parseInt(fh.getHours()), 2)}:${zfill(parseInt(fh.getMinutes()), 2)}:${zfill(parseInt(fh.getSeconds()), 2)}`;
    return fhtxt;
}

const zfill = (number, width, deci) => {
    let numberOutput = Math.abs(number); /* Valor absoluto del n�mero */
    if (deci!=undefined|| deci>0) {
        numberOutput = Number.parseFloat(numberOutput).toFixed(deci).toString();
    }
    let length = numberOutput.toString().length; /* Largo del n�mero */
    let zero = "0"; /* String de cero */
    if (width <= length) {
        if (number < 0) {			
            return ("-" + numberOutput.toString());
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length - 1)) + numberOutput.toString());
        } else {
            return zero.repeat(width - length) + numberOutput.toString();
        }
    }
}