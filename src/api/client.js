export const getAllFeatures = () => {
  return Promise.resolve([
    { id: 1, name: "Component 1" },
    { id: 2, name: "Component 2" },
    { id: 3, name: "Component 3" },
    { id: 4, name: "Component 4" },
    { id: 5, name: "Component 5" },
    { id: 6, name: "Component 6" },
    { id: 7, name: "Component 7" },
    { id: 8, name: "Component 8" },
    { id: 9, name: "Component 9" },
    { id: 10, name: "Component 10" }
  ]);
};

export const getVehicle = () => {
  //pendind add userId to make the fetch
  return Promise.resolve({
    id: "ABCD",
    description: "Ranger LIMITED 3.2L",
    crewCab: true,
    traction: "4X4",
    fuel: "Diesel",
    picture: "Daco_4190901.png"
  });
};

export const getTutorials = () => {
  return Promise.resolve([
    {
      id: 1,
      name: "¿Cómo manejar sobre nieve?",
      description:
        "Aprendé todo lo que tu RANGER puede hacer por vos en aventuras sobre nieve",
      picture: "snowy-ranger.jpg",
      steps: [
        {
          type: "intro",
          order: 0,
          sections: [
            {
              order: 1,
              type: "regular",
              title: "¿Qué aprenderás?",
              content:
                "En este tutorial aprenderás a manejar sobre terrenos nevados con tu Ford Ranger de manera correcta."
            },
            {
              order: 2,
              type: "regular",
              title: "Antes de empezar",
              content:
                "Tené cuidado, no dañes el paragolpes con piedras y escombros del terreno.<br><br>Considerá tener protección inferior para el motor, ruedas para offroad con su la presión correcta.<br><br>Localizá los puntos de remolque de tu vehículo. Te serán de utilidad ante cualquier eventualidad."
            },
            {
              order: 3,
              type: "related_features",
              title: "Componentes relacionados",
              content: []
            }
          ]
        },
        {
          type: "step",
          order: 1,
          name: "Frená tu vehículo",
          description: "Para cambiar de 2h a 4L el vehículo debe estar quieto",
          image: "car.png",
          sections: [
            {
              order: 1,
              type: "with_icon",
              title: "Consejos",
              content:
                "Te recomendamos tener activado el modo indicado para el terreno en que te encuentres antes de afrontar una situación complicada.",
              icon: "shield"
            },
            {
              order: 2,
              type: "warning",
              title: "Advertencias",
              content: "Acá vá una advertencia"
            },
            {
              order: 3,
              type: "videos",
              title: "Videos que te sugerimos",
              content: ["snowy.mp4", "snowy.mp4", "snowy.mp4"]
              // content: [
              //   "https://www.youtube.com/watch?v=kXQ1Uo7Qhzk",
              //   "https://www.youtube.com/watch?v=CvsNHBVggBM",
              //   "https://www.youtube.com/watch?v=W9mGkcLyaiM&t=27s",
              //   "https://www.youtube.com/watch?v=6WaQUa6ZDBo&t=70s",
              //   "https://www.youtube.com/watch?v=A94wOxIUpLM&t=582s"
              // ]
            },
            {
              order: 4,
              type: "related_features",
              title: "Componentes relacionados",
              content: [
                {
                  id: 1,
                  name: "Palanca de cambios",
                  system: "Sistema de transmisión",
                  detectionCode: 1,
                  icon: "gear_stick.png"
                },
                {
                  id: 2,
                  name: "Perilla de cambio de tracción",
                  system: "Sistema de transmisión",
                  detectionCode: 0,
                  icon: "traction_switch.png"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "¿Cómo manejar sobre arena?",
      description:
        "Aprendé todo lo que tu RANGER puede hacer por vos en aventuras sobre arena",
      picture: "sandy-ranger.jpg"
    }
  ]);
};
