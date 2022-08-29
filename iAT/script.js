


const table = document.querySelector("table");




const datos = "./datos.json";

//función de formatear hora a partir de UTC

const formatearHora = (offset) => {
    const d = new Date();

    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    const nd = new Date(utc + (3600000*offset));

    let hours = nd.getHours();
    let minutes = nd.getMinutes();


    //si la hora es menor de 10, le añade un 0 al inicio para que esté bien formateado
    if(hours < 10) {
        hours = `0${hours}`;
    }

    if(minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
} 


const fetchDatos = async () => {
    const fetchedDatos = await fetch(datos);
    const jsonDatos = await fetchedDatos.json();

    const people = jsonDatos.people;
    const cities = jsonDatos.cities;
    const countries = jsonDatos.countries;
    const studies = jsonDatos.studies;
    const genders = jsonDatos.gender;
    const bloodTypes = jsonDatos.bloodType;



    console.log(jsonDatos);
    people.forEach(person => {
    
        const fila = document.createElement("tr");
        const dataNombre = document.createElement("td")
        const dataApellido = document.createElement("td")
        const dataEdad = document.createElement("td")
        const dataAltura = document.createElement("td")
        const dataPeso = document.createElement("td")
        const dataCiudad= document.createElement("td")
        const dataPais = document.createElement("td")
        const dataEstudios= document.createElement("td")
        const dataGenero = document.createElement("td")
        const dataGrupo = document.createElement("td")
        const dataHora = document.createElement("td")

        const ciudad = cities.find(city => city.city_id === person.city_id)
        const pais = countries.find(country => country.country_id === ciudad.country_id)
        const estudios = person.study_id === null ? "Sin estudios" : studies.find(study => study.study_id === person.study_id).level;
        const genero = genders.find(gender => gender.gender_id === person.gender_id)
        const grupo = bloodTypes.find(bloodType => bloodType.bloodType_id === person.bloodtype_id)

        let hora = "";

    
//Selecciona la hora según el país

        switch(pais.countryName) {
            case "España":
                hora = formatearHora(2);
                break;
            case "Francia":
                hora = formatearHora(1);
                break;
            case "Colombia":
                hora = formatearHora(-5);
                break;
            case "Japón":
                hora = formatearHora(9);
                break;
            default: 
                break;   
        }

        console.log(hora);
        

        dataNombre.textContent = person.name;
        dataApellido.textContent = person.surname1;
        dataEdad.textContent = person.age;
        dataAltura.textContent = person.height;
        dataPeso.textContent = person.weight;
        dataCiudad.textContent = ciudad.cityName;
        dataPais.textContent = pais.countryName;
        dataEstudios.textContent = estudios;
        dataGenero.textContent = genero.type;
        dataGrupo.textContent = grupo.bloodName;
        dataHora.textContent = hora;

        fila.appendChild(dataNombre);
        fila.appendChild(dataApellido);
        fila.appendChild(dataEdad);
        fila.appendChild(dataAltura);
        fila.appendChild(dataPeso);
        fila.appendChild(dataCiudad);
        fila.appendChild(dataPais);
        fila.appendChild(dataEstudios);
        fila.appendChild(dataGenero);
        fila.appendChild(dataGrupo);
        fila.appendChild(dataHora);

        table.appendChild(fila);

    })

   
}

fetchDatos();