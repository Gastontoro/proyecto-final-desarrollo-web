import { useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

import { useForm } from 'react-hook-form';

import { addReceta, getRecetaById, updateReceta } from '../api/recetasApi';



const FormPage = ({ isEdit = false }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  

  // 1. Configuración de React Hook Form

  const { 

    register, 

    handleSubmit, 

    formState: { errors, isSubmitting },

    setValue

  } = useForm({

    defaultValues: {

        nombre: '',

        autor: '',

        ingredientes: '',

        instrucciones: ''

    }

  });



  // 2. Lógica para el modo Edición

  useEffect(() => {

    if (isEdit && id) {

      const fetchReceta = async () => {

        const data = await getRecetaById(id);

        if (data) {

            // Setea los valores del formulario con los datos de Firebase

            setValue('nombre', data.nombre);

            setValue('autor', data.autor);

            setValue('ingredientes', data.ingredientes);

            setValue('instrucciones', data.instrucciones);

        } else {

            alert('Receta no encontrada para editar.');

            navigate('/');

        }

      };

      fetchReceta();

    }

  }, [isEdit, id, setValue, navigate]);



  // 3. Manejo del Submit

  const onSubmit = async (data) => {

    let success = false;

    if (isEdit) {

      // Actualizar

      success = await updateReceta(id, data);

      if (success) alert('Receta actualizada con éxito!');

    } else {

      // Crear

      const newId = await addReceta(data);

      if (newId) success = true;

      if (success) alert('Receta creada con éxito!');

    }



    if (success) {

      navigate('/'); // Redirigir al listado

    } else {

      alert(`Error al ${isEdit ? 'actualizar' : 'crear'} la receta.`);

    }

  };



  const title = isEdit ? `✍️ Editar Receta: ${id}` : '✨ Crear Nueva Receta';



  return (

    <Container className="py-5">

      <Card className="shadow">

        <Card.Header as="h2" className="bg-primary text-white text-center">{title}</Card.Header>

        <Card.Body>

          <Form onSubmit={handleSubmit(onSubmit)}>



            {/* Campo: Nombre */}

            <Form.Group className="mb-3">

              <Form.Label>Nombre de la Receta</Form.Label>

              <Form.Control 

                type="text" 

                placeholder="Ej: Pasta Carbonara"

                {...register("nombre", { required: "El nombre es obligatorio." })} 

              />

              {errors.nombre && <Alert variant="danger" className="mt-2 p-2">{errors.nombre.message}</Alert>}

            </Form.Group>



            {/* Campo: Autor/Fuente */}

            <Form.Group className="mb-3">

              <Form.Label>Autor / Fuente</Form.Label>

              <Form.Control 

                type="text" 

                placeholder="Ej: Abuela Mery"

                {...register("autor", { required: "El autor/fuente es obligatorio." })} 

              />

              {errors.autor && <Alert variant="danger" className="mt-2 p-2">{errors.autor.message}</Alert>}

            </Form.Group>



            {/* Campo: Ingredientes */}

            <Form.Group className="mb-3">

              <Form.Label>Ingredientes (Separados por coma o línea)</Form.Label>

              <Form.Control 

                as="textarea" 

                rows={3}

                placeholder="Ej: 500g de pasta, 200g de panceta, 4 yemas de huevo..."

                {...register("ingredientes", { required: "Los ingredientes son obligatorios." })} 

              />

              {errors.ingredientes && <Alert variant="danger" className="mt-2 p-2">{errors.ingredientes.message}</Alert>}

            </Form.Group>



            {/* Campo: Instrucciones */}

            <Form.Group className="mb-3">

              <Form.Label>Instrucciones de Preparación</Form.Label>

              <Form.Control 

                as="textarea" 

                rows={5}

                placeholder="Escribe el paso a paso..."

                {...register("instrucciones", { required: "Las instrucciones son obligatorias." })} 

              />

              {errors.instrucciones && <Alert variant="danger" className="mt-2 p-2">{errors.instrucciones.message}</Alert>}

            </Form.Group>



            {/* Botón de Submit */}

            <Button 

              variant="primary" 

              type="submit" 

              className="w-100 mt-4" 

              disabled={isSubmitting}

            >

              {isSubmitting ? (

                <>

                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>

                  Guardando...

                </>

              ) : (

                isEdit ? 'Guardar Cambios' : 'Crear Receta'

              )}

            </Button>

            <Button variant="secondary" onClick={() => navigate(-1)} className="w-100 mt-2">

                Cancelar

            </Button>

          </Form>

        </Card.Body>

      </Card>

    </Container>

  );

};



export default FormPage;