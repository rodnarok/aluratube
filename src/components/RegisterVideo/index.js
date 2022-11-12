import { createClient } from "@supabase/supabase-js";
import React, { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
  const [values, setValues] = useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}
// function handleSubmit(titulo, url) {
//   console.log("handle titulo " + titulo);
//   console.log("handle url " + url);
// }

const PROJECT_URL = "https://spkualsbpbefdkszrwae.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwa3VhbHNicGJlZmRrc3pyd2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDU1MDgsImV4cCI6MTk4Mzc4MTUwOH0.-DWv0yvPzl8nsJlXNXGiBeEm_YMohUYycV5etwMJ5AY";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "GOW Ragnarok",
      url: "https://www.youtube.com/watch?v=yzhwOS_SzZg",
    },
  });

  const [formVisivel, setFormVisivel] = useState(true);

  // Falta o botão para adicionar
  // Modal
  // -> Precisamos controlar o state
  // -> Formulário em si
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {/* Ternário */}
      {/* Operadores de Curto-circuito */}
      {formVisivel ? (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();

            // Contrato entre o nosso Front e o BackEnd
            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "jogos",
              })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              x
            </button>
            <input
              placeholder="Titulo do video"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="titulo"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
