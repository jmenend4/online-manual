import ranger from "../assets/ranger.png";
import crewCabIcon from "../assets/crew-cab_feature.png";
import FourByFourIcon from "../assets/traction_feature.png";
import fuelIcon from "../assets/fuel_feature.png";
import snowyRanger from "../assets/snowy-ranger.jpg";
import sandyRanger from "../assets/sandy-ranger.jpg";
import car from "../assets/car.png";
import tractionSwitch from "../assets/traction_switch.png";
import gearStick from "../assets/gear_stick.png";
import flag from "../assets/checkered_flag.png";
import snowDriving from "../assets/snowy.mp4";
import snowChains from "../assets/snow-chains.mp4";
import secureLoad from "../assets/secure-load.mp4";
import hillDescent from "../assets/hill-descent.mp4";
import riverCrossing from "../assets/river-crossing.mp4";

export const getAllFeatures = () => {
  return Promise.resolve([
    {
      id: 0,
      class: 0,
      name: "Selector de tracción",
      sections: [
        {
          order: 1,
          type: "regular",
          title: "¿Qué es?",
          content: [
            {
              text: "El selector de tracción te permite configurar la manera en que se distribuye la potencia del motor a las ruedas para hacer frente a diversas situaciones.",
              icon: "tractionSwitch"
            }
          ]
        },
        {
          order: 2,
          type: "regular",
          title: "Aprendé más",
          content: [
            {
              text: "2H: utiliza esta opción en lo cotidiano.<br><br>4H: esta opción distribuye el torque a las 4 ruedas y es recomendada para conducción en superficies de baja adherencia como barro, nieve o arena.<br><br>4L: este modo aplica una reducción a las relaciones de marcha permitiendo un mejor aprovechamiento del par motor a bajas velocidades. Utiliza este modo en conjunto con el bloqueo de diferencial para sortear los obstáculos más difíciles cómo trepadas sobre terrenos resbaladizos o cruzar un vado, etc."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "warning",
          title: "Advertencia",
          content: [
            {
              text: "El cambio de 2H a 4H puede ser realizado con el vehículo en movimiento hasta 100K/h.<br><br>El cambio de 4H a 4L sólo se efectúa con el vehículo detenido."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "videos",
          title: "Videos que te sugerimos",
          content: [snowDriving, snowChains, riverCrossing, secureLoad]
        }
      ]
    },
    {
      id: 1,
      class: 1,
      name: "Teclas del sistema de control de tracción",
      sections: []
    },
    {
      id: 2,
      class: 2,
      name: "Control de tracción",
      sections: [
        {
          order: 1,
          type: "regular",
          title: "¿Qué es?",
          content: [
            {
              text: "El sistema de control de tracción previene la pérdida de adherencia de las ruedas.",
              icon: "tractionControl"
            }
          ]
        },
        {
          order: 2,
          type: "regular",
          title: "Aprendé más",
          content: [
            {
              text: "El sistema de control de tracción usa los mismos sensores que el ABS para saber si una reuda está patinando y baja su velocidad frenandola o reduciendo la potencia del motor."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "warning",
          title: "Advertencia",
          content: [
            {
              text: "No desconecte el sistema de control de tracción.<br><br>Sólo puede ser necesaria su desconexión para remover el vehículo de un atascamiento en barro, arena, o nieve."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "videos",
          title: "Videos que te sugerimos",
          content: [snowDriving, snowChains, secureLoad]
        }
      ]
    },
    {
      id: 3,
      class: 3,
      name: "Bloqueo de diferencial",
      sections: [
        {
          order: 1,
          type: "regular",
          title: "¿Qué es?",
          content: [
            {
              text: "El bloqueo de diferencial distribuye la potencia de manera uniforme a las ruedas, evitando así la pérdida de tracción.",
              icon: "differentialLock"
            }
          ]
        },
        {
          order: 2,
          type: "regular",
          title: "Aprendé más",
          content: [
            {
              text: "Bloquea el diferencial para atravesar los obstáculos más difíciles cómo los terrenos muy resbaladizos, caminos muy accidentados que hagan que alguna de las ruedas pierda tracción por momentos o salir de atascamientos en el barro, nieve o arena."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "warning",
          title: "Advertencia",
          content: [
            {
              text: "Andar con el diferencial bloqueado ocasiona que las ruedas internas a una curva giren a una velocidad mayor a la debida, lo que puede dañar los neumáticos en superficies de alta adherencia como el asfalto.<br><br>Utilizar solamente en superficies de baja adherencia y solamente para sortear el obstáculo pretendido, luego desconectarlo."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "videos",
          title: "Videos que te sugerimos",
          content: [riverCrossing, snowDriving, snowChains, secureLoad]
        }
      ]
    },
    {
      id: 4,
      class: 4,
      name: "Control de descenso",
      sections: [
        {
          order: 1,
          type: "regular",
          title: "¿Qué es?",
          content: [
            {
              text: "El control de descenso mantiene la velocidad del vehículo constante durante el descenso de pendientes pronunciadas sin necesidad que el conductor presione ningún pedal.",
              icon: "hillDescent"
            }
          ]
        },
        {
          order: 2,
          type: "regular",
          title: "Aprendé más",
          content: [
            {
              text: "El control de descenso aplica el freno de manera individual en cada rueda para mantener la velocidad y tracción durante el descenso de pendientes pronunciadas sobre terrenos resbalosos.<br><br>Para usarlo, presiona el botón con el de arriba y utiliza los controles de velocidad crucero para aumentar o disminuir la velocidad de descenso sin tocar ningún pedal."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "warning",
          title: "Advertencia",
          content: [
            {
              text: "El control de descenso solamente controla la velocidad del descenso, la dirección debe ser controlada por el conductor en todo momento.<br><br> Esté atento al camino en todo momento."
            }
          ],
          initClosed: true
        },
        {
          order: 3,
          type: "videos",
          title: "Videos que te sugerimos",
          content: [hillDescent, secureLoad]
        }
      ]
    }
  ]);
};

export const getVehicle = () => {
  //pendind add userId to make the fetch
  return Promise.resolve({
    id: "ABCD",
    description: "Ranger Raptor",
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
          image: gearStick,
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
          name: "Mové la perilla de tracción a 4L",
          description: "Verás luces indicadoras en el tablero",
          image: tractionSwitch,
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
          image: flag,
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
