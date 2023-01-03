import { Modal, Select } from "antd";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export const Header = ({ selectOptions, onSelectChange }) => {
  const onFilterOption = (input, option) =>
    (option?.label ?? "").includes(input.toUpperCase());

  const onFilterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toUpperCase()
      .localeCompare((optionB?.label ?? "").toUpperCase());

  const info = () => {
    Modal.info({
      title: "Dicas rápidas",
      content: (
        <div>
          <strong>Sobre</strong>
          <p>
            A aplicação foi idealizada no intuito de ajudar alunos
            desperiodizados que tem dificuldade em saber quais disciplinas estão
            restando para finalizar a carga horária total
          </p>
          <br />
          <strong>Como usar</strong>
          <p>- Cadastrar todas as disciplinas concluídas através do select</p>
          <p>
            - Na aba 'Carga horária restante' é possível verificar as
            informações referentes aos eixos curriculares, tanto a carga horária
            restante quanto a sugestão de disciplinas disponíveis para concluir
            cada eixo
          </p>
          <br />
          <strong>Informações extras</strong>
          <p>
            A aplicação é um PWA então é possível instalá-lo no seu dispositivo
            e salvar os dados localmente
          </p>
        </div>
      ),
      closable: true,
      centered: true,
      maskClosable: true
    });
  };

  return (
    <header className="w-full p-4 bg-green-600 h-28 flex flex-col items-center justify-between">
      <h1 className="lg:mt-4 text-xl text-center lg:text-3xl font-bold text-white">
        Carga horária - Sistemas de Informação / IFAL Maceió
      </h1>
      <button
        className="absolute z-50 flex items-center justify-center bg-transparent h-16 w-16 right-4 lg:right-10 bottom-10 rounded-full"
        onClick={info}
      >
        <InformationCircleIcon className="text-green-500 h-12 w-12 hover:text-green-600"/>
      </button>
      <Select
        autoClearSearchValue
        size="large"
        showSearch
        className="mb-[-2.3rem] w-full lg:w-[47.6rem]"
        placeholder="Selecione uma disciplina"
        optionFilterProp="children"
        filterOption={onFilterOption}
        filterSort={onFilterSort}
        options={selectOptions}
        onChange={onSelectChange}
      />
    </header>
  );
};
