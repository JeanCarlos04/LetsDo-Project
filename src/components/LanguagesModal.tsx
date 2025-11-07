import i18n from "../config/i18next.config";

export function LanguagesModal() {
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <section className="bg-gray-50 rounded-lg py-3 px-2 flex flex-col gap-3">
        <button
          onClick={() => handleChangeLanguage("es")}
          className="justify-between font-semibold flex gap-2 items-center text-gray-600 p-2 hover:bg-white duration-200 rounded-md cursor-pointer"
        >
          Spain <img className="w-[40px] rounded" src="/imgs/SpainFlag.webp" />{" "}
        </button>
        <button
          onClick={() => handleChangeLanguage("en")}
          className="justify-between  font-semibold flex gap-2 items-center text-gray-600 p-2 hover:bg-white duration-200 rounded-md cursor-pointer"
        >
          English <img className="w-[40px] rounded" src="/imgs/USA_flag.webp" />
        </button>
      </section>
    </>
  );
}
