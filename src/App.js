import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Header } from "./components/header";
import { Home } from "./components/home";

import disciplinas from "./data/disciplinas.json";
import cargaHoraria from "./data/carga-horaria.json";

ChartJS.register(ArcElement, Tooltip);

const CARGA_HORARIA_TOTAL = cargaHoraria;

function App() {
  const [cargaHorariaRestante, setCargaHorariaRestante] = useState(
    JSON.parse(localStorage.getItem("cargaHoraria")) || CARGA_HORARIA_TOTAL
  );

  const [selectedOptions, setSelectedOptions] = useState(
    JSON.parse(localStorage.getItem("disciplinas")) || []
  );

  const obrigatorias = disciplinas.obrigatorias.map((item) => ({
    value: item.id,
    cargaHoraria: item.carga_horaria,
    eixo: item.eixo,
    label: item.nome,
  }));

  const optativas = disciplinas.optativas.map((item) => ({
    value: item.id,
    cargaHoraria: item.carga_horaria,
    eixo: item.eixo,
    label: item.nome,
  }));

  const mergedDisciplinas = [
    ...disciplinas.obrigatorias,
    ...disciplinas.optativas,
  ];
  const mergedOptions = [...obrigatorias, ...optativas];

  const filteredOptions = mergedOptions.filter(
    (item) => !selectedOptions.some((option) => option.id === item.value)
  );

  const handleCargaHoraria = (diciplina, action) => {
    setCargaHorariaRestante((prevState) => ({
      ...prevState,
      [diciplina.eixo]:
        action === "sum"
          ? prevState[diciplina.eixo] + diciplina.carga_horaria
          : prevState[diciplina.eixo] - diciplina.carga_horaria > 0
          ? prevState[diciplina.eixo] - diciplina.carga_horaria
          : 0,
    }));
  };

  const handleOnChange = (id) => {
    const diciplina = mergedDisciplinas.find((item) => item.id === id);

    handleCargaHoraria(diciplina, "sub");

    setSelectedOptions((prevState) => [...prevState, diciplina]);
  };

  const onDeleteDisciplina = (id) => () => {
    const diciplina = mergedDisciplinas.find((item) => item.id === id);

    setSelectedOptions((prevState) =>
      prevState.filter((item) => item.id !== id)
    );

    handleCargaHoraria(diciplina, "sum");
  };

  const onClear = () => setSelectedOptions([])

  useEffect(() => {
    window.localStorage.setItem(
      "cargaHoraria",
      JSON.stringify(cargaHorariaRestante)
    );
    window.localStorage.setItem("disciplinas", JSON.stringify(selectedOptions));
  }, [cargaHorariaRestante, selectedOptions]);

  return (
    <main className="w-screen h-screen overflow-hidden	">
      <Header selectOptions={filteredOptions} onSelectChange={handleOnChange} />
      <Home
        selectedOptions={selectedOptions}
        cargaHorariaRestante={cargaHorariaRestante}
        onDeleteDisciplina={onDeleteDisciplina}
        onClear={onClear}
        disciplinasRestantes={filteredOptions}
      />
    </main>
  );
}

export default App;
