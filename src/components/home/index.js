import { useWindowSize } from "@reach/window-size";
import {
  TrashIcon,
  ArrowLongRightIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Collapse } from "antd";

ChartJS.register(ArcElement, Tooltip);

const WHITE_COLOR = "#FFF";

const CARGA_HORARIA_NAMES = [
  "Formação básica (FB)",
  "Formação humanística e suplementar(FHS)",
  "Formação profissional geral (FPG)",
  "Formação profissional flexível (FPF)",
  "Formação complementar (FC)",
  "Atividades e componentes curriculares de extensão (EXT)",
];

export const Home = ({
  cargaHorariaRestante,
  selectedOptions,
  disciplinasRestantes,
  onDeleteDisciplina,
  onClear,
}) => {
  const { height } = useWindowSize();

  const data = {
    labels: CARGA_HORARIA_NAMES,
    datasets: [
      {
        label: " ",
        data: Object.values(cargaHorariaRestante),
        options: {
          legend: {
            display: false,
          },
        },
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          WHITE_COLOR,
          WHITE_COLOR,
          WHITE_COLOR,
          WHITE_COLOR,
          WHITE_COLOR,
          WHITE_COLOR,
        ],
        borderWidth: 6,
      },
    ],
  };

  return (
    <section
      className="pt-10 p-4 lg:p-10 w-full flex justify-center"
      style={{ height: height - 112 }}
    >
      <div className="flex-col max-w-[90rem] w-full flex h-full flex lg:flex-row lg:items-center lg:justify-center gap-10 overflow-y-auto">
        <div className="p-4 w-full lg:py-6 lg:pr-14 lg:pl-6 bg-slate-50 lg:w-[46%] lg:h-full rounded-lg  lg:overflow-y-auto">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-zinc-600 pb-4">
              Disciplinas
            </h2>
            <button
              className="text-red-400 pb-3 hover:text-red-800"
              onClick={onClear}
            >
              Limpar tudo
            </button>
          </div>
          {!selectedOptions.length && (
            <div className="pb-12 flex flex-col justify-center items-center text-slate-300 h-[90%]">
              <InboxIcon className="h-28 w-28 text-slate-200" />
              Nenhuma disciplina selecionada
            </div>
          )}
          {selectedOptions.map((item) => (
            <div
              key={`${item.id}`}
              className="flex justify-between items-center pb-4 mb-4 border-b-2 border-dashed"
            >
              <div>
                <p className="text-slate-400">‣ {item.id} ({item.eixo})</p>
                <p>{item.nome} ({item.carga_horaria}h)</p>
              </div>
              <button className="h-4 w-4" onClick={onDeleteDisciplina(item.id)}>
                <TrashIcon className="h-4 w-4 text-slate-700 hover:text-slate-600" />
              </button>
            </div>
          ))}
        </div>
        <div className="hidden absolute rounded-lg bg-[#F3F3F3] lg:block">
          <ArrowLongRightIcon className="text-green-600	h-20 w-28" />
        </div>
        <div className="p-4 pr-0 w-full lg:py-6 lg:pl-14 bg-slate-50 lg:w-[46%] h-auto lg:h-full rounded-lg lg:overflow-hidden">
          <h2 className="text-3xl font-bold text-zinc-600 pb-6">
            Carga horária restante
          </h2>
          <div className="w-full h-[92%] lg:overflow-auto pr-4">
            <div className="pb-6 lg:pr-10 h-[38%] items-center justify-center hidden lg:flex">
              <Pie data={data} />
            </div>

            <Collapse>
              {Object.values(cargaHorariaRestante).map((item, index) => (
                <Collapse.Panel
                  header={
                    <>
                      <h3>{CARGA_HORARIA_NAMES[index]}</h3>
                      <p>{item}h restantes</p>
                    </>
                  }
                  className="text-left	"
                  key={CARGA_HORARIA_NAMES[index]}
                >
                  <p className="font-bold pb-2">Disciplinas disponíveis</p>
                  {disciplinasRestantes
                    .filter(
                      (item) =>
                        item.eixo === Object.keys(cargaHorariaRestante)[index]
                    )
                    .map((item) => (
                      <p key={item?.value}>
                        • {item?.label} ({item?.cargaHoraria}h)
                      </p>
                    ))}
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
    </section>
  );
};
