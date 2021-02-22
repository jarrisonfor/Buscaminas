var cantidad = 20

var buscaminas = {
    "primer_movimiento": true,
    "tablero": Array(cantidad).fill().map(() => Array(cantidad).fill(0)),
    "tablero_click": Array(cantidad).fill().map(() => Array(cantidad).fill(false)),
    "handle_click": (e) => {
        let f = e.dataset.f
        let c = e.dataset.c
        buscaminas.generar_minas_numeros(f, c)
        buscaminas.tablero_click[f][c] = true
        if (buscaminas.tablero[f][c] == 'm') {
            for (let i = 0; i < buscaminas.tablero.length; i++) {
                for (let j = 0; j < buscaminas.tablero.length; j++) {
                    if (buscaminas.tablero[i][j] == 'm') {
                        buscaminas.tablero_click[i][j] = true
                    }
                }
            }
        }
        buscaminas.regenerar_html()
    },
    "generar_minas_numeros": (f, c) => {
        if (buscaminas.primer_movimiento) {
            let cantidad_minas = Math.round(cantidad * cantidad / 5)
            for (let i = 0; i < cantidad_minas; i++) {
                let fa = Math.floor(Math.random() * ((cantidad - 1) - 0)) + 0;
                let ca = Math.floor(Math.random() * ((cantidad - 1) - 0)) + 0;
                if (buscaminas.tablero[fa][ca] == 'm' || fa == f && ca == c) {
                    cantidad_minas++
                } else {
                    buscaminas.tablero[fa][ca] = 'm'
                    for (let i = -1; i <= 1; i++) {
                        if (fa + i >= 0) {
                            for (let j = -1; j <= 1; j++) {
                                if (ca + j >= 0) {
                                    if (buscaminas.tablero[fa + i][ca + j] != 'm') {
                                        buscaminas.tablero[fa + i][ca + j]++
                                    }
                                }
                            }
                        }
                    }
                }
            }
            buscaminas.primer_movimiento = false
        }
    },
    "regenerar_html": () => {
        let html = ''
        for (let i = 0; i < buscaminas.tablero.length; i++) {
            html += '<tr>'
            for (let j = 0; j < buscaminas.tablero.length; j++) {
                let clase = ''
                if (!isNaN(buscaminas.tablero[i][j]) && buscaminas.tablero_click[i][j]) {
                    clase = 'nada'
                } else if (buscaminas.tablero[i][j] == 'm' && buscaminas.tablero_click[i][j]) {
                    clase = 'mina'
                }
                html += '<td class="' + clase + '" data-f="' + i + '" data-c="' + j + '" onClick="buscaminas.handle_click(this)">'
                if (buscaminas.tablero_click[i][j]) {
                    if (buscaminas.tablero[i][j] !== 0 && buscaminas.tablero[i][j] != 'm') {
                        html += buscaminas.tablero[i][j]
                    }
                }
                html += '</td>'
            }
            html += '</tr>'
        }
        document.getElementById('tablero').innerHTML = html
    },


}

buscaminas.regenerar_html()