$( document ).ready(function() {
    
    // BASE DE DATOS DE LOS MÉDICOS

    const medico1 = {nombre: "José García", especialidad: "Clínica", img:"jose.png", toFilter:"clinica", toValue:"josegarcia"};
    const medico2 = {nombre: "Rosana González", especialidad: "Clínica", img:"rosana.png", toFilter:"clinica", toValue:"rosanagonzalez"};
    const medico3 = {nombre: "Pedro López", especialidad: "Otorrinolaringología", img:"pedro.png", toFilter:"otorrino", toValue:"pedrolopez"};
    const medico4 = {nombre: "Juan Ledesma", especialidad: "Otorrinolaringología", img:"juan.png", toFilter:"otorrino", toValue:"juanledesma"};
    const medico5 = {nombre: "Ernesto Martínez", especialidad: "Traumatología", img:"ernesto.png", toFilter:"traumato", toValue:"ernestomartinez"};
    const medico6 = {nombre: "Lucía Demarchi", especialidad: "Traumatología", img:"lucia.png", toFilter:"traumato", toValue:"luciademarchi"}
    const medico7 = {nombre: "Nicolás Demarchi", especialidad: "Neurología", img:"nicolas.png", toFilter:"neuro", toValue:"nicolasdemarchi"};
    const medico8 = {nombre: "Ana Peralta", especialidad: "Neurología", img:"ana.png", toFilter:"neuro", toValue:"anaperalta"};
    const medico9 = {nombre: "Laura Sartori", especialidad: "Pediatría", img:"laura.png", toFilter:"pediatria", toValue:"laurasartori"};
    const medico10 = {nombre: "Macarena Solari", especialidad: "Pediatría", img:"macarena.png", toFilter:"pediatria", toValue:"macarenasolari"};

    const todosLosMedicos = [medico1, medico2, medico3, medico4, medico5, medico6, medico7,medico8, medico9, medico10];

    // FICHA DE LOS MÉDICOS

    for (const medico of todosLosMedicos) {
        $("#staff").prepend(`<div class="ficha">    
                                <img src="imagenes/${medico.img}" style="height:90px">
                                <h3>Dr/a. ${medico.nombre}</h3>
                                <p>Especialidad: ${medico.especialidad}</p>
                            </div>`);
    }

    // PROCESAMIENTO DEL FORMULARIO

    // Variable auxiliar

    let opcionesMedicos = $("#opcionesMedicos");

    // Evento + función principal

    $("#rbClinica, #rbOtorrino, #rbTraumato, #rbNeuro, #rbPediatria").change(function() {

        $("#medicosParaElegir").removeClass("invisible").addClass("visible");

        let opcionSeleccionada = $("input[type=radio][name=especialidad]:checked").val()

        let medicosYaFiltrados = filtrarMedicos(todosLosMedicos,opcionSeleccionada);

        removerElementosPrevios(opcionesMedicos);

        crearFichaDeEspecialistas(medicosYaFiltrados);
    });


    // Funciones secundarias

    function filtrarMedicos(filtroArray, filtroParametro){
        let filtroMedicos = filtroArray.filter((aplicarFiltro) => {
            return aplicarFiltro.toFilter === filtroParametro;
        });
        return filtroMedicos;
    }

    function removerElementosPrevios(contenedorDom){
        $(contenedorDom[0]).empty();
    }

    function crearFichaDeEspecialistas (fichaArray) {
    for (const radioInput of fichaArray) {
        $("#opcionesMedicos").prepend(`<div>    
                                <label>Dr/a. ${radioInput.nombre}</label>
                                <input type="radio" name="seleccion" value=${radioInput.toValue} required> </input>
                            </div>`);
        }
    }

    // Almacenamiento de los datos en storage y respuesta al usuario

    $("#formulario").submit(function (e) {

        e.preventDefault();

        let infoUsuarios = {};

        infoUsuarios.usuario = $("#usuario").val();
        infoUsuarios.obraSocial = $("#obraSocial").val();
        infoUsuarios.celular = $("#celular").val();
        infoUsuarios.email = $("#email").val();
        infoUsuarios.especialidadElegida = $("input[type=radio][name=especialidad]:checked").val()
        infoUsuarios.medicoElegido = $("input[type=radio][name=seleccion]:checked").val()
        infoUsuarios.formaDeContacto = $("input[type=radio][name=contacto]:checked").val()

        localStorage.setItem("infoUsuariosLS", JSON.stringify(infoUsuarios));
        let infoUsuariosLocalStorage = localStorage.getItem("infoUsuariosLS");
        let infoUsuariosParseada = JSON.parse(infoUsuariosLocalStorage)
        console.log(infoUsuariosParseada);
    
        $("#mensajeDeExito").removeClass("invisible").fadeIn("slow");
        
    });

// NOTICIAS

    $.get("https://api.jornalia.net/api/v1/articles?apiKey=e30d51d54c304dfe803f57c674122da6&categories=SALUD", function (respuesta, estado) {
        if(estado === "success"){
            let noticias = respuesta.articles;
            let noticiasLimitadas = noticias.splice(0,8);
            for (const noticia of noticiasLimitadas) {
                $("#bloqueNoticias").append(`<div>
                                    <h5>${noticia.title}</h5>
                                    <p><a target="_blank" href="${noticia.sourceUrl}">Ir a la noticia</a></p>
                                    </div>`);
            }  
        }
    });
});