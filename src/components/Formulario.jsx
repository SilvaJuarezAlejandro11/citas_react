import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del Formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }

    // Objeto de Paciente

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id: generarId(),
    };

    if (paciente.id) {
      // Editando el Registro

      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([objetoPaciente, ...pacientes]);
    }

    // Reiniciar formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  };

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade pacientes y{' '}
        <span className='text-indigo-600 font-bold '>Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5'
      >
        {error && (
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
        )}
        <div className='mb-5'>
          <label
            className='block text-gray-700 uppercase font-bold'
            htmlFor='mascota'
          >
            Nombre Mascota
          </label>
          <input
            type='text'
            placeholder='Nombre de la mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='mascota'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            className='block text-gray-700 uppercase font-bold'
            htmlFor='propietario'
          >
            Nombre Propiertario
          </label>
          <input
            type='text'
            placeholder='Nombre del propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='propietario'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            className='block text-gray-700 uppercase font-bold'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            placeholder='Email Contacto Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            className='block text-gray-700 uppercase font-bold'
            htmlFor='alta'
          >
            Alta
          </label>
          <input
            type='date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='alta'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            className='block text-gray-700 uppercase font-bold'
            htmlFor='sintomas'
          >
            Sintomas
          </label>
          <textarea
            placeholder='Describe los sintomas'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='sintomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:shadow-lg hover:bg-indigo-700 cursor-pointer transition-shadow'
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
  );
};

export default Formulario;
