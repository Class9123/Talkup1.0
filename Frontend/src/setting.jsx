function Setting() {
  const themes = [
    "custom",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ]
  const toggleTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("data-theme",theme)
  };

  return (
    <div className="bg-base-100 text-primary max-h-screen m-auto pb-[20vh] overflow-y-scroll">
      <div className="text-2xl font-bold p-5">Themes</div>
      {themes.map((item, index)=>(
        <button key={index} className="btn m-1 hover:bg-slate-100" onClick={()=>toggleTheme(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default Setting;