import { Select } from "antd";

export const Header = ({ selectOptions, onSelectChange }) => {
  const onFilterOption = (input, option) =>
    (option?.label ?? "").includes(input.toUpperCase());

  const onFilterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toUpperCase()
      .localeCompare((optionB?.label ?? "").toUpperCase());

  return (
    <header className="w-full p-4 bg-green-600 h-28 flex flex-col items-center justify-between">
      <h1 className="lg:mt-4 text-xl text-center lg:text-3xl font-bold text-white">
        Carga horaria - Sistemas de Informação / IFAL Maceió
      </h1>
      <Select
        autoClearSearchValue
        size="large"
        showSearch
        className="mb-[-2.3rem] w-full lg:w-[47.6rem]"
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={onFilterOption}
        filterSort={onFilterSort}
        options={selectOptions}
        onChange={onSelectChange}
      />
    </header>
  );
};
