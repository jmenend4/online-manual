import ranger from "../assets/ranger.png";
import crewCabIcon from "../assets/crew-cab_feature.png";
import FourByFourIcon from "../assets/traction_feature.png";
import fuelIcon from "../assets/fuel_feature.png";
import snowyRanger from "../assets/snowy-ranger.jpg";
import sandyRanger from "../assets/sandy-ranger.jpg";
import car from "../assets/car.png";
import tractionSwitch from "../assets/traction_switch.png";
import gearStick from "../assets/gear_stick.png";
import snowDriving from "../assets/snowy.mp4";
import snowChains from "../assets/snow-chains.mp4";
import secureLoad from "../assets/secure-load.mp4";

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
    picture: ranger,
    features: [
      { feature: "crewCab", type: "Cabina Doble", icon: crewCabIcon },
      { feature: "traction", type: "4X4", icon: FourByFourIcon },
      { feature: "fuel", type: "Diesel", icon: fuelIcon }
    ]
  });
};

export const getTutorials = () => {
  return Promise.resolve([
    {
      id: 1,
      name: "¿Cómo manejar sobre nieve?",
      description:
        "Aprendé todo lo que tu RANGER puede hacer por vos en aventuras sobre nieve",
      picture: snowyRanger,
      steps: [
        {
          type: "intro",
          order: 0,
          sections: [
            {
              order: 1,
              type: "regular",
              title: "¿Qué aprenderás?",
              content: [
                {
                  text: "En este tutorial aprenderás a manejar sobre terrenos nevados con tu Ford Ranger de manera correcta."
                }
              ]
            },
            {
              order: 2,
              type: "regular",
              title: "Antes de empezar",
              content: [
                {
                  text: "Tené cuidado, no dañes el paragolpes con piedras y escombros del terreno.<br><br>Considerá tener protección inferior para el motor, ruedas para offroad con su la presión correcta.<br><br>Localizá los puntos de remolque de tu vehículo. Te serán de utilidad ante cualquier eventualidad."
                }
              ]
            },
            {
              order: 3,
              type: "related_features",
              title: "Componentes relacionados",
              content: [
                {
                  id: 1,
                  name: "Perilla de cambio de tracción",
                  system: "Sistema de transmisión",
                  detectionCode: 0,
                  icon: tractionSwitch
                },
                {
                  id: 2,
                  name: "Palanca de cambios",
                  system: "Sistema de transmisión",
                  detectionCode: 1,
                  icon: gearStick
                }
              ]
            }
          ]
        },
        {
          type: "step",
          order: 1,
          name: "Frená tu vehículo",
          description: "Para cambiar de 2h a 4L el vehículo debe estar quieto",
          image: car,
          sections: [
            {
              order: 1,
              type: "regular",
              title: "Consejos",
              content: [
                {
                  text: "Te recomendamos tener activado el modo indicado para el terreno en que te encuentres antes de afrontar una situación complicada.",
                  icon: "shield"
                }
              ]
            },
            {
              order: 2,
              type: "warning",
              title: "Advertencias",
              content: [
                {
                  text: "Recuerde detener completamente el vehículo y mantener el pedal de freno presionado antes de pasar la palanca a la posición P"
                }
              ]
            },
            {
              order: 3,
              type: "videos",
              title: "Videos que te sugerimos",
              content: [snowDriving, snowChains, secureLoad]
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
                  name: "Perilla de cambio de tracción",
                  system: "Sistema de transmisión",
                  detectionCode: 0,
                  icon: tractionSwitch
                },
                {
                  id: 2,
                  name: "Palanca de cambios",
                  system: "Sistema de transmisión",
                  detectionCode: 1,
                  icon: gearStick
                }
              ]
            }
          ]
        },
        {
          type: "step",
          order: 2,
          name: "Poné la palanca en P o N",
          description: "El vehículo cambiará la transmisión",
          image: "gear_stick.png",
          sections: [
            {
              order: 1,
              type: "regular",
              title: "Consejos",
              content: [
                {
                  text: "Te recomendamos tener activado este modo antes de comenzar a conducir sobre nieve suelta.",
                  icon: "gear"
                }
              ]
            },
            {
              order: 2,
              type: "warning",
              title: "Advertencias",
              content: [
                {
                  text: "Hacer esta maniobra con el vehículo en movimiento puede no activar el mecanismo correctamente"
                }
              ]
            },
            {
              order: 3,
              type: "videos",
              title: "Videos que te sugerimos",
              content: [snowDriving, snowChains, secureLoad]
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
                  icon: gearStick
                },
                {
                  id: 2,
                  name: "Perilla de cambio de tracción",
                  system: "Sistema de transmisión",
                  detectionCode: 0,
                  icon: tractionSwitch
                }
              ]
            }
          ]
        },
        {
          type: "step",
          order: 3,
          name: "Mové la perilla e tracción a 4L",
          description: "Verás luces indicadoras en el tablero",
          image: "traction_switch.png",
          sections: [
            {
              order: 1,
              type: "regular",
              title: "Consejos",
              content: [
                {
                  text: "El modo 4x4 - Baja, obliga al motor a enviar 50% del torque al diferencial delantero mejorando la tracción significativamente",
                  icon: "fourWheelDrive"
                }
              ]
            },
            {
              order: 2,
              type: "warning",
              title: "Advertencias",
              content: [
                {
                  text: "Hacer el cambio antes de estar manejando sobre la nieve.",
                  icon: "pickUp"
                },
                {
                  text: "Al vehículo le costará más realizar giros muy cerrados debido a que todas las ruedas giran a la misma velocidad en este modo.",
                  icon: "handleWarning"
                }
              ]
            },
            {
              order: 3,
              type: "videos",
              title: "Videos que te sugerimos",
              content: [snowDriving, snowChains, secureLoad]
            },
            {
              order: 4,
              type: "related_features",
              title: "Componentes relacionados",
              content: [
                {
                  id: 1,
                  name: "Perilla de cambio de tracción",
                  system: "Sistema de transmisión",
                  detectionCode: 0,
                  icon: tractionSwitch
                },
                {
                  id: 2,
                  name: "Palanca de cambios",
                  system: "Sistema de transmisión",
                  detectionCode: 1,
                  icon: gearStick
                }
              ]
            }
          ]
        },
        {
          type: "step",
          order: 4,
          name: "Estás listo para la aventura",
          description: "Disfrutá de tu paseo off road",
          image: "checkered_flag.png",
          sections: [
            {
              order: 1,
              type: "regular",
              title: "Consejos",
              content: [
                {
                  text: "Recordá estar siempre atento al camino y los alrededores.",
                  icon: "cow"
                },
                {
                  text: "Respetá siempre las velocidades máximas.",
                  icon: "speedometer"
                }
              ]
            },
            {
              order: 2,
              type: "videos",
              title: "Videos que te sugerimos",
              content: [snowDriving, snowChains, secureLoad]
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
      picture: sandyRanger
    }
  ]);
};
