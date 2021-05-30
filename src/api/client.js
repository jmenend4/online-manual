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
      main: [
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
            "Ten cuidado de dañas el paragolpes con piedras y escombros del terreno.<br><br>Considerá tener protección inferior para el motor, ruedas para offroad con su la presión correcta.<br><br>Revisá y tené en cuenta dónde están los puntos de remolque de tu vehículo. Te serán de utilidad ante cualquier eventualidad."
        },
        {
          order: 3,
          type: "related_features",
          title: "Componentes relacionados",
          features: []
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
